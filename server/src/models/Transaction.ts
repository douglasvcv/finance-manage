import mongoose, { Document } from "mongoose"
const {Schema, model} = mongoose

type TransactionType = "income" | "expense"

interface ITransaction extends Document {
    user: string,
    amount: number,
    description:string
    type:TransactionType,
    createdAt: Date
}

const TransactionModel = new Schema<ITransaction>({
    user:mongoose.Schema.Types.ObjectId,
    type:{
        type:String,
        enum:["income", "expense"],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    createdAt:{type:Date, default:Date.now}
})

export default TransactionModel