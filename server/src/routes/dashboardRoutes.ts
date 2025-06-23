import {Router} from "express"
import DashboardController from "../controllers/DashboardController"
import { authMiddleware } from "../middlewares/authMiddleware"


const route = Router()

route.get("/dashboard",authMiddleware, (req, res)=>{
    DashboardController.summary(req,res)
})
route.get("/dashboard/summary-by-category", authMiddleware, (req,res)=>{
    DashboardController.summaryByCategory(req,res)
})

export default route