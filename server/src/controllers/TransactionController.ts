import { Request, Response } from "express";
import TransactionModel from "../models/Transaction";
import User from "../models/User";
import Category from "../models/Category";




class TransactionController {
    async create(req: Request, res: Response) {
        const { type, description, amount, category } = req.body
        const userId = req.userId
        if (userId) {
            const findUser = await User.findById(userId)
            if (findUser == null) {
                return res.status(400).json({ msg: "Erro na autenticação" })

            }
            if (!["income", "expense"].includes(type)) {
                return res.status(400).json({ msg: "Erro no tipo da transação!" })
            }

            const findCategories = await Category.find({ user: userId, name: category })
            if (!findCategories) {
                return res.status(400).json({ msg: "Selecione uma categoria correta!" })
            }
            const newTransition = new TransactionModel({
                user: userId, type: type, description: description, amount: amount, category: category
            })
            newTransition.save()
            return res.status(201).json({ msg: "Transação cadastrada!" })
        }
    }
    async show(req: Request, res: Response) {
        const { month, year, type, category } = req.query
        const userId = req.userId
        if (!month && !year && !type && category) {
            const findTransactionsByCategory = await TransactionModel.find({ category: category, user: userId })
            if (findTransactionsByCategory.length == 0) {
                return res.status(404).json({ msg: "Nenhuma transação cadastrada com essa categoria!" })
            }
            return res.status(200).json(findTransactionsByCategory)
        }

        if (!month && !year && type && category) {
            const findTransactionsByCategoryAndType = await TransactionModel.find({type:type, category: category, user: userId })
            if (findTransactionsByCategoryAndType.length == 0) {
                return res.status(404).json({ msg: "Nenhuma transação cadastrada com essa categoria e tipo!" })
            }
            return res.status(200).json(findTransactionsByCategoryAndType)

        }
        if (month && year && !type && category) {
            const findTransactionsByCategoryAndYearMonth = await TransactionModel.find({
                createdAt:{
                    $gte: new Date(`${year}-${month}-01`),
                    $lte: new Date(`${year}-${month}-31`)
                },
                user:userId,
                category:category
            })
            if (findTransactionsByCategoryAndYearMonth.length == 0) {
                return res.status(404).json({ msg: "Falha na listagem de transações" })
            }
            return res.status(200).json(findTransactionsByCategoryAndYearMonth)
        }
        if (month && year && type && category) {
            const findTransactionsByCategoryAndYearMonthAndType = await TransactionModel.find({
                user:userId,
                type:type,
                category:category,
                createdAt:{
                    $gte: new Date(`${year}-${month}-01`),
                    $lte: new Date(`${year}-${month}-31`)
                }
            })
            if(findTransactionsByCategoryAndYearMonthAndType.length == 0){
                return res.status(404).json({ msg: "Falha na listagem de transações" })
            }
            return res.status(200).json(findTransactionsByCategoryAndYearMonthAndType)
        }
        if (!month && !year && !type && !category) {
            const allTransactions = await TransactionModel.find({ user: userId }).sort({ createdAt: -1 })
            if (allTransactions.length == 0) {
                return res.status(404).json({ msg: "Falha na listagem de transações" })
            }
            return res.status(200).json(allTransactions)
        }
    }
}

export default new TransactionController