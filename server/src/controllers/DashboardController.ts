import { Request, Response } from "express";
import TransactionModel from "../models/Transaction"; 



class DashboardController{
    async summary(req:Request,res:Response){
        const userId = req.userId
        const summary = await TransactionModel.find({user:userId}).sort({ createdAt: -1 })       
        if(summary.length == 0){
          return res.json({ totalIncome: 0, totalExpense: 0, balance: 0 });
        }
        const income = summary.filter(e=>e.type=="income")
        const expense = summary.filter(e=>e.type=="expense")
        let incomeValue:number = 0
        let expenseValue: number = 0
        for(let i = 0; i<income.length; i++){
            incomeValue+= income[i].amount
        }
        for(let i = 0; i<expense.length; i++){
            expenseValue+= expense[i].amount
        }
        const balance = incomeValue - expenseValue
      return res.json({totalIncome: incomeValue, totalExpense: expenseValue, balance:balance})
    }
  async summaryByCategory(req:Request, res:Response){
      const userId = req.userId
      const {category} = req.query
      const findTransaction = await TransactionModel.find({user:userId, category:category})

      const TransactionIncome = await findTransaction.filter(e => e.type == "income")
      const TransactionExpense = await findTransaction.filter(e => e.type == "expense")
      if(TransactionExpense.length === 0 && TransactionIncome.length === 0){
        return res.status(200).json({msg: "Nenhum valor atribuído as categorias!"})        
      }
      let incomeValue:number = 0
      let expenseValue:number = 0
      for(let i = 0; i<TransactionIncome.length; i++){
        incomeValue+=TransactionIncome[0].amount
      }
      for(let i = 0; i<TransactionExpense.length; i++){
        expenseValue+=TransactionExpense[0].amount
      }
      let totalAmount = incomeValue-expenseValue
      return res.status(200).json({category:category, total:totalAmount})
    }
}

export default new DashboardController