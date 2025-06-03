import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import TransactionModel from "../models/Transaction"; 
import User from "../models/User";

class TransactionController{
  async  create(req:Request, res:Response){
        const {type, description, amount} = req.body
        const {authorization} = req.headers
        const token = String(authorization?.split(" ")[1])
        const userDecoded:any = jwt.decode(token)
        if(userDecoded){
            const findUser = await User.findById(userDecoded.userId)
            if(findUser==null){
                return res.status(400).json({msg:"Erro na autenticação"})

            }
                const newTransition = new TransactionModel({
                    user:userDecoded.userId, type, description, amount
                })
            newTransition.save()
            return res.status(201).json({msg:"Transação cadastrada!"})
        }
    }
}

export default new TransactionController