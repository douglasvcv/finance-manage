import express from "express"
import  userRoutes  from "./routes/userRoutes"
import  transactionsRoutes  from "./routes/transactionRoutes"
import  dashboardRoutes from "./routes/dashboardRoutes"

export const app = express ()

app.use(express.json())
app.use("/api/auth", userRoutes)
app.use("/api", transactionsRoutes )
app.use("/api", dashboardRoutes)