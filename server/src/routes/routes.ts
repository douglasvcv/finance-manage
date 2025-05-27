import User from "../models/User";
import  connectDb  from "../config/db";
import { Router } from "express";
import UserController from "../controllers/UserController";

export const routes = Router()


routes.post("/api/auth/register", async (req, res)=>{
    UserController.create(req,res)
})
routes.post("/api/auth/login", async (req, res)=>{
    UserController.login(req,res)
})

