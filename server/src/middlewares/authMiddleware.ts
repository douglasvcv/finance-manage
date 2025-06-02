import { Request, Response, NextFunction, RequestHandler } from "express"
import "dotenv/config"
import { verify } from "jsonwebtoken"

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
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
    if (schema !== "Bearer") {
        res.status(401).json({ msg: "Autorização falhou!" })
        return
    }
    
    const secret = String(process.env.SECRET)
    const tokenVerify = verify(token, secret, (err, decoded) => {
        if(err){
            res.status(401).json({ msg: "Autorização falhou: ",err })
        }
        console.log(decoded)
    })
    next()
} catch (error) {
    res.status(401).json({ msg: "Autorização falhou: ", error })
    
}

}