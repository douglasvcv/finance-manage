import mongoose from "mongoose";
const {Schema, model} = mongoose

interface CategoryInterface{
    name:string,
    icon:string,
    user:string,
    createdAt:Date 
}

const CategoryModel = new Schema<CategoryInterface>({
    name:{
        required:true,
        type:String
    },
    icon:{
        type:String,
        required:false
    },
    user:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date, default:Date.now
    }
})

const Category = model("category", CategoryModel)

export default Category