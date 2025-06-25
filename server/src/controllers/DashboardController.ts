import { Request, Response } from "express";
import TransactionModel from "../models/Transaction";
import Category from "../models/Category";



class DashboardController {
  async summary(req: Request, res: Response) {
    const userId = req.userId
    const summary = await TransactionModel.find({ user: userId }).sort({ createdAt: -1 })
    if (summary.length == 0) {
      return res.json({ totalIncome: 0, totalExpense: 0, balance: 0 });
    }
    const income = summary.filter(e => e.type == "income")
    const expense = summary.filter(e => e.type == "expense")
    let incomeValue: number = 0
    let expenseValue: number = 0
    for (let i = 0; i < income.length; i++) {
      incomeValue += income[i].amount
    }
    for (let i = 0; i < expense.length; i++) {
      expenseValue += expense[i].amount
    }
    const balance = incomeValue - expenseValue
    return res.json({ totalIncome: incomeValue, totalExpense: expenseValue, balance: balance })
  }
  async summaryByCategory(req: Request, res: Response) {
    const userId = req.userId
    const findTransaction = await TransactionModel.find({ user: userId })
    const findCategories = await Category.find({ user: userId })
    
    let allCategoriesWithTotalAmount:object[] = []

    for (let j = 0; findCategories.length > j; j++) {
      const transactionForCategory = findTransaction.filter(e=>String(e.category)==String(findCategories[j].name))
      let incomeValue: number = 0
      let expenseValue: number = 0
      const TransactionIncome = transactionForCategory.filter(e => e.type == "income")
      const TransactionExpense = transactionForCategory.filter(e => e.type == "expense")
      for (let i = 0; i < TransactionIncome.length; i++) {
          incomeValue+=TransactionIncome[i].amount
      }
      for (let i = 0; i < TransactionExpense.length; i++) {
        expenseValue += TransactionExpense[i].amount
      }
      let calcAmount = incomeValue - expenseValue
      let categoryWithAmount = {category: findCategories[j].name, amount: calcAmount}
      allCategoriesWithTotalAmount.push(categoryWithAmount)
    }
   
    if(allCategoriesWithTotalAmount.length == 0){
      return res.status(404).json({msg:"Erro no calculo da quantia!"})

    }
    return res.status(200).json(allCategoriesWithTotalAmount)
  }
  
  async summaryByMonth(req:Request, res:Response){
    const userId = req.userId
    
    
    const findTransaction = await TransactionModel.find({user:userId})
    
    const month=[
      {
        month:"Janeiro",
        amount: 0
      },
      {
        month:"Fevereiro",
        amount: 0
      },
      {
        month:"Março",
        amount: 0
      },
      {
        month:"Abril",
        amount: 0
      },
      {
        month:"Maio",
        amount: 0
      },
      {
        month:"Junho",
        amount: 0
      },
      {
        month:"Julho",
        amount: 0
      },
      {
        month:"Agosto",
        amount: 0
      },
      {
        month:"Setembro",
        amount: 0
      },
      {
        month:"Outubro",
        amount: 0
      },
      {
        month:"Novembro",
        amount: 0
      },
      {
        month:"Dezembro",
        amount: 0
      }
    ]
    
    for(let i = 0; i < findTransaction.length; i++){
      const date = findTransaction[i].createdAt.getMonth()
      month[date].amount+=findTransaction[i].amount
    }
    let reduceMonth = month.filter(e=>e.amount>0)
    return res.status(200).json(reduceMonth)
    
  }
}

export default new DashboardController