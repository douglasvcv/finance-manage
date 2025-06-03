import {Request, Response, NextFunction, RequestHandler} from 'express'

export function validateRequiredFields(requiredFields:string[]): RequestHandler{
    return (req:Request, res:Response, next:NextFunction): void =>{
        const body = req.body as Record<string, any>
        const missingField = requiredFields.filter(field => !body[field])
        if(missingField.length>0){
             res.status(400).json({
                msg:`Os seguintes campos estão faltando: ${missingField.join(", ")}`
            })
            return
        }   
        next()
    }
}
