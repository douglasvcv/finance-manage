import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateRequiredFields } from "../middlewares/validateRequiredFields";

 const route = Router()

route.post("/register", validateRequiredFields(["email", "senha", "confirmSenha"]), async (req, res)=>{
    UserController.create(req,res)
})

route.post("/login",validateRequiredFields(["email", "senha"]), async (req, res)=>{
    
    UserController.login(req,res)
})


export default route