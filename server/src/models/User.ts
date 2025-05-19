import mongoose from "mongoose"
const {Schema, model} = mongoose

const userSchema = new Schema ({
    email:String,
    senha:String,
    createAt: Date
})

const User = model("User", userSchema)

export default User