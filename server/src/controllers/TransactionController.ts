import { Request, RequestHandler, Response } from "express";
import  jwt  from "jsonwebtoken";
import TransactionModel from "../models/Transaction"; 
import User from "../models/User";




class TransactionController{
  async  create(req:Request, res:Response){
        const {type, description, amount} = req.body
        const userId = req.userId
        if(userId){
            const findUser = await User.findById(userId)
            if(findUser==null){
                return res.status(400).json({msg:"Erro na autenticação"})
                
            }
            if(!["income", "expense"].includes(type)){
                return res.status(400).json({msg:"Erro no tipo da transação!"})

            }
                const newTransition = new TransactionModel({
                    user:userId, type, description, amount
                })
            newTransition.save()
            return res.status(201).json({msg:"Transação cadastrada!"})
        }
    }
   async show(req:Request, res:Response){
        const userId = req.userId
        const allTransactions = await TransactionModel.find({user:userId}).sort({ createdAt: -1 })
        if(!allTransactions){
            return res.status(404).json({msg:"Falha na listagem de transações"})
        }
        return res.status(200).json(allTransactions)
    }
}

export default new TransactionController