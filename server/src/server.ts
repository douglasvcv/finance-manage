import { app } from "./app"
import connectDb from "./config/db"



app.listen(8080, ()=>{
    console.log("Server running http://localhost:8080")
    connectDb()
})