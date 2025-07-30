import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    }
])


export default router