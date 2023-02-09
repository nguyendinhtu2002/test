import ApiKey from "../modal/ApiKey.js";
import crypto from "crypto"
import asyncHandler from 'express-async-handler'
import got from 'got'
import { response } from "express";



// time 1 ngay
const oneDayTime = 1000 * 60 * 60 * 24


const createApi = asyncHandler(async (req, res, next) => {
    try {
        const {
            countDay,
            countMonth
        } = req.body
        const apiKey = crypto.randomBytes(8).toString('hex')
        const apiKeyCheck = await ApiKey.findOne({ apiKey })
        if (apiKeyCheck) {
            return res.status(400).json({ message: "ApiKey already exists" })
        }
        else {
            const apikey = await ApiKey.create({
                apiKey,
                countDay,
                countMonth
            })
            if (apikey) {
                return res.status(201).json({
                    apiKey,
                    countDay,
                    countMonth
                });
            } else {
                return res.status(400).json({ message: "Invalid ApiKey Data" })

            }
        }
    }
    catch (error) {
        next(error)
    }
})
const update = asyncHandler(async (req, res, next) => {
    try {
        const { apiKey,code } = req.body
        const key = await ApiKey.findOne({ apiKey })
        if (!key) {
            return res.status(400).json({ message: "Invalid key" })
        }
        else {
            console.log(key)
            if (Date.now() - key.checked >= oneDayTime) {
                if (key.countMonth === 0) {
                    return res.status(429).json({ message: "Limit req" })
                }
                key.countMonth = key.countMonth - key.countDay;
                key.countDay = 200;
                key.checked = Date.now();

            }
            else {
                const URL = 'https://fe-online-gateway.ghn.vn/order-tracking/public-api/client/tracking-logs'

                await got.post(URL, {
                    json: {
                        order_code: code
                    },
                    headers: {
                        authority: 'fe-online-gateway.ghn.vn',
                        origin: 'https://donhang.ghn.vn',
                        referer: 'https://donhang.ghn.vn/'
                    }
                }).json()
                    .then((response)=>res.status(200).json({response}))
                    .catch((err)=> console.log(err))
            }
            if (key.countDay === 0) {
                return res.status(429).json({ message: "Limit req" })
            }

        }
    } catch (error) {
        next(error)
    }
})
export { createApi, update }