import express from "express"
import  userRoutes  from "./routes/userRoutes"
import  transactionsRoutes  from "./routes/transactionRoutes"
import  dashboardRoutes from "./routes/dashboardRoutes"
import  categoryRoutes from "./routes/CategoryRoutes"
import { setupSwagger } from "./config/swagger"
import cors from 'cors'

export const app = express ()

setupSwagger(app)
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())


app.use("/api/auth", userRoutes)
app.use("/api", transactionsRoutes )
app.use("/api", dashboardRoutes)
app.use(categoryRoutes)