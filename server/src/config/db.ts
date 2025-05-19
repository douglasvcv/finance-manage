import mongoose from "mongoose"
import "dotenv/config"

const uri = process.env.URI


async function connectDb(){
    if(!uri){
        throw new Error("Variável de ambiente não definida")
    }
    try{
        console.log("connect database")
        const connection = await mongoose.connect(uri)
    }catch{
        throw new Error("Connection fail")
    }
}

export default connectDb

