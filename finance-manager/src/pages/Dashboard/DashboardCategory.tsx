import { useEffect, useState } from "react"

const DashboardCategory = () => {

    const [data, setData] = useState<object[]>([])


    async function searchDashCategory() {
        const token = sessionStorage.getItem("token")
        try {
            const data = await fetch("http://localhost:8080/api/dashboard/summary-by-category",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"

                    }
                }
            )
            const response: object[] = await data.json()
            if (response.length > 0) {
                setData(response)
            }
        } catch (error) {

        }
    }

    useEffect(()=>{
      searchDashCategory()  
    })
    return (
        <>
            <div >
                <ul className="flex flex-col items-center text-center w-[100%]
                md:justify-center md:w-[60%] md:m-auto
                ">
                    <h1 className="mt-3 text-4xl font-[Roboto] font-bold">Por categoria:</h1>
                    {data.length > 0 ? data.map((x: any) => <li className="bg-green-800 flex flex-col my-2 h-[140px] w-[80vw] items-center justify-center rounded-xl text-xl font-semibold text-white md:w-[70%]">
                        <h2>{x.category}</h2>
                        Saldo final: R$ {x.amount}
                    </li>) : <li className="bg-green-800 flex flex-col my-2 h-[140px] w-[80vw] items-center justify-center rounded-xl text-xl font-semibold text-white md:w-[70%]">
                        <h2>Nenhuma Categoria encontrada</h2>
                    </li>}
                </ul>
            </div>
        </>
    )
}

export default DashboardCategory