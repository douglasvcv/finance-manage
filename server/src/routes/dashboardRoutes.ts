import {Router} from "express"
import DashboardController from "../controllers/DashboardController"
import { authMiddleware } from "../middlewares/authMiddleware"


const route = Router()

route.get("/dashboard",authMiddleware, (req, res)=>{
    DashboardController.summary(req,res)
})


export default route