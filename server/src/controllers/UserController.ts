import { Request, Response } from "express";
import User from "../models/User";


class UserController{
   async create(req:Request, res:Response){
        const {email, senha} = req.body
        if(email == null || senha == null){
          return  res.status(404).json({msg:"Preencha todos os campos"})
        }
        const existUser = await User.find({email:email})
        if(existUser.length < 1){
            const newUser = new User({
                email, senha
            })
            await newUser.save()
            return res.status(201).json({msg:"Usuário cadastrado!"})
        }
        if(existUser.length >= 1){
            return res.status(404).json({msg:"Usuário existente!"})
        }

    }
}

export default new UserController()