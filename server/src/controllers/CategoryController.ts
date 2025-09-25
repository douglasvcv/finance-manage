import Category from "../models/Category";
import { Request, Response } from "express";


class CategoryController{
   async create(req:Request, res:Response){
        const {name} = req.body
        const userId = req.userId
        const verifyName = await Category.find({name:name, user:userId})
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
    async update(req:Request, res:Response){
        const {name, newName} = req.body
        const userId = req.userId
        const filter = {name:name, user:userId}
        const update = {name:newName}
        const findCategories = await Category.findOneAndUpdate(filter, update)
        if(findCategories == null){
            return res.status(404).json({msg:"Nenhuma categoria encontrada!"})
        }
        
        return res.status(201).json({msg:"Alterações realizadas!"})
    }
    async delete(req:Request, res:Response){
        const {name} = req.body
        const userId = req.userId
        const filter = {name: name, user:userId}
        const findId = await Category.find(filter)
        if(findId.length==0){
            return res.status(404).json({msg:"Nenhuma categoria encontrada!"})
        }
        const id = findId[0].id
        const findCategories = await Category.findByIdAndDelete(id)
        
        return res.status(200).json({msg:"Categoria excluída!"})
    }
}

export default new CategoryController