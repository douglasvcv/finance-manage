import User from "../models/User";
import  connectDb  from "../config/db";
import { Router } from "express";

export const routes = Router()


routes.post("/api/auth/register", async (req, res)=>{
    connectDb()
    const user = new User({
        email:"maisumexemplo@gmail.com",
        senha:"2321231"
    })
    if(user){
        await user.save()
        console.log("cliente cadastrado")
        res.json({msg:"Usuário cadastrado!"})
    }else{
        res.json({msg:"Erro na requisição"})
        
    }
    
})

