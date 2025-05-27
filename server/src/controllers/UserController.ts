import { Request, Response } from "express";
import User from "../models/User";
import {hash, compare} from 'bcrypt'
import {sign} from "jsonwebtoken"


class UserController{
    //Metodo para se registrar: Completo-Beta
   async create(req:Request, res:Response){
        const {email, senha, confirmSenha} = req.body
        if(email == null || senha == null){
          return  res.status(404).json({msg:"Preencha todos os campos"})
        }
        if(senha != confirmSenha){
            return  res.status(404).json({msg:"Senhas não conferem!"})

        }
        const existUser = await User.find({email:email})
        if(existUser.length < 1){
            
            const newSenha = await hash(senha, 10)
            const newUser = new User({
                email, senha:newSenha
            })
            await newUser.save()
            return res.status(201).json({msg:"Usuário cadastrado!"})
        }
        if(existUser.length >= 1){
            return res.status(409).json({msg:"Usuário existente!"})
        }

    }
    //Metodo para logar no site: Em construção
    async login(req:Request, res:Response){
        const {email, senha} = req.body
         if(email == null || senha == null){
          return  res.status(400).json({msg:"Preencha todos os campos"})
        }
        const findUser = await User.findOne({email:email})
        if(!findUser){
            return  res.status(404).json({msg:"Usuário não encontrado!"})

        }
        const password = String(findUser?.senha)
        const senhaCorreta = await compare(senha, password)
        if(senhaCorreta == false){
            return  res.status(400).json({msg:"Senha incorreta!"})
        }
        const secret = String(process.env.SECRET)
        if(!secret){
            return  res.status(500).json({msg:"Verifique se a varável de ambiente está definida"})

        }
        try {
            const token = sign({userId: findUser.id},  secret, {expiresIn:300})
            return res.status(200).json({token, user:{
                id:findUser.id,
                email: findUser.email
            }})
            
        } catch (error) {
            return res.status(500).json({msg:"Erro ao gerar o token", erro:error})
            
        }
    }
}

export default new UserController()