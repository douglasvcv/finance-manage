import express from "express"
import  userRoutes  from "./routes/userRoutes"

export const app = express ()

app.use(express.json())
app.use("/api/auth", userRoutes)