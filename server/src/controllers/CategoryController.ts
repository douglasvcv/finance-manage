import Category from "../models/Category";
import { Request, Response } from "express";


class CategoryController{
   async create(req:Request, res:Response){
        const {name} = req.body
        const userId = req.userId
        const verifyName = await Category.find({name:name})
        if(verifyName.length >0){
            return res.status(404).json({msg:"Categoria existente, tente outro nome!"})
        }
        const newCategory = new Category({
            name:name, user:userId
        })
        newCategory.save()
        return res.status(201).json({msg:"Categoria criada"})
    }
    async show(req:Request, res:Response){
        const userId = req.userId
        const findCategories = await Category.find({user:userId})
        if(findCategories.length == 0){
            return res.status(404).json({msg:"Nenhuma categoria encontrada!"})
            
        }
        return res.status(200).json(findCategories)
    }
    update(req:Request, res:Response){
        
    }
}

export default new CategoryController