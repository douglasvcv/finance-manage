import { useEffect, useState } from "react"

const DashboardMonth = () => {
    
    interface arrayData {
        month:string,
        amount:number
    }

    const [data, setData] = useState<arrayData[]>([])
    const [monthNames, setMonthNames] = useState<string[]>([])
    

    async function searchDashCategory() {
        const token = sessionStorage.getItem("token")
        try {
            const data = await fetch("http://localhost:8080/api/dashboard/summary-by-month",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            )
            const response: arrayData[] = await data.json()
            if (response.length > 0) {
                setData(response)
            }
            findTransactionPerMonth()
        } catch (error) {
            console.log(error)
        }
    }

    function findTransactionPerMonth(){
        
        for(let i=0; i<data.length; i++){
            let nameMonth = data[i].month
            
            let month = data.filter((e)=>e.month==nameMonth)
            
        }
    }

    useEffect(()=>{
      searchDashCategory()  
    })
    return (
        <>
            <div className="h-[100vh]">
                <ul className="flex flex-col items-center text-center w-[100%]
                md:justify-center md:w-[60%] md:m-auto
                ">
                    <h1 className="mt-3 text-4xl font-[Roboto] font-bold">Por Mês:</h1>
                    {data.length > 0 ? data.map((x: any) => <li className="bg-green-800 flex flex-col my-2 h-[140px] w-[80vw] items-center justify-center rounded-xl text-xl font-semibold text-white md:w-[70%]">
                        <h2>{x.month}</h2>
                        Saldo final: R$ {x.amount}
                    </li>) : <li className="bg-green-800 flex flex-col my-2 h-[140px] w-[80vw] items-center justify-center rounded-xl text-xl font-semibold text-white md:w-[70%]">
                        <h2>Nenhuma Categoria encontrada</h2>
                    </li>}
                    
                </ul>
            </div>
        </>
    )
}

export default DashboardMonth