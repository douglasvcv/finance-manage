import { Router } from "express";
import { validateRequiredFields } from "../middlewares/validateRequiredFields";
import CategoryController from "../controllers/CategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const route = Router()


route.post("/categories", validateRequiredFields(["name"]), authMiddleware, (req, res)=>{
    CategoryController.create(req,res)
})

route.get("/categories",authMiddleware, (req, res)=>{
    CategoryController.show(req,res)
})
route.put("/categories",authMiddleware, (req, res)=>{
    CategoryController.update(req,res)
})



export default route