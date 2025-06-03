import { Router } from "express";
import { validateRequiredFields } from "../middlewares/validateRequiredFields";
import TransactionController from "../controllers/TransactionController";
import { Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const route = Router()

route.post("/transactions", validateRequiredFields(["amount", "description", "type"]),authMiddleware, (req, res)=>{
    TransactionController.create(req,res)
})

export default route