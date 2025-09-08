import { useEffect, useState } from "react"
import DashboardCategory from "./DashboardCategory"
import DashboardMonth from "./DashboardMonth"
import Navbar from "../../components/Navbar"

const Dashboard = () => {

    const [total, setTotal] = useState<object | any>({})

    const token = sessionStorage.getItem("token")
    async function fetchTotal() {
        try {
            const data = await fetch("http://localhost:8080/api/dashboard",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                }
            )
            const response = await data.json()
            if (response.balance) {
                setTotal(response)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTotal()
    })

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                
                <Navbar />

                <main className="flex flex-col items-center text-center md:w-[60%] lg:w-1/2 md:m-auto px-4 mt-6 mb-12 space-y-8">

                   
                    <section className="w-full bg-white rounded-2xl shadow-lg p-6">
                        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
                    </section>

                    
                    <section className="w-full bg-white rounded-2xl shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg font-semibold text-gray-600">Entradas</h2>
                                <p className="text-2xl font-bold text-green-600 transition-all duration-500">
                                    {total.totalIncome}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg font-semibold text-gray-600">Saídas</h2>
                                <p className="text-2xl font-bold text-red-500 transition-all duration-500">
                                    {total.totalExpense}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg font-semibold text-gray-600">Saldo</h2>
                                <p className="text-2xl font-bold text-blue-600 transition-all duration-500">
                                    {total.balance}
                                </p>
                            </div>
                        </div>
                    </section>

                    
                    <section className="w-full bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">Categorias</h3>
                        <DashboardCategory />
                    </section>

                    
                    <section className="w-full bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">Mês</h3>
                        <DashboardMonth />
                    </section>
                </main>
            </div>
        </>
    )
}

export default Dashboard