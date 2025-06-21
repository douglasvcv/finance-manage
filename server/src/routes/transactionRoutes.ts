import { RequestHandler, Router } from "express";
import { validateRequiredFields } from "../middlewares/validateRequiredFields";
import TransactionController from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/authMiddleware";



const route = Router()

route.post("/transactions", validateRequiredFields(["amount", "description", "type", "category"]),authMiddleware, (req, res)=>{
    TransactionController.create(req,res)
})

route.get("/transactions",authMiddleware, (req, res)=>{
    TransactionController.show(req,res)
})

export default route