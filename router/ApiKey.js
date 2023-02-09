import express from "express"
const router = express.Router()
import  {createApi, update}  from "../controller/ApiKeyController.js"




router.post('/',createApi)

router.put('/',update)
export default router