import { Request, Response, NextFunction, RequestHandler } from "express"
import "dotenv/config"
import { verify } from "jsonwebtoken"

declare global{
namespace Express{
    interface Request{
        userId?:string
    }
}
}

export const authMiddleware = (async (req:Request, res: Response, next: NextFunction)=> {
    try { 
        const { authorization } = req.headers as Record<string, any>
        if (!authorization) {
            res.status(401).json({ msg: "Autorização falhou!" })
            return
        }
        const parts: string[] = authorization.split(' ')
        if (parts.length !== 2) {
            res.status(401).json({ msg: "Autorização falhou!" })
            return
        }
    const [schema, token] = parts
    if (schema !== "Bearer" || !token) {
        res.status(401).json({ msg: "Autorização falhou!" })
        return
    }
    
    const secret = String(process.env.SECRET)
    const tokenVerify = verify(token, secret) as {userId:string}
    req.userId = tokenVerify.userId
    next()
} catch (error) {
    res.status(401).json({ msg: "Autorização falhou: ", error })
    
}

}) as RequestHandler