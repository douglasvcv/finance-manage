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
        <section className="w-full bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Por Mês</h2>

      <ul className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((x) => (
            <li
              key={x.month}
              className="bg-gray-50 shadow-md rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">{x.month}</h3>
              <p className="text-blue-600 font-bold mt-1">Saldo final: R$ {x.amount}</p>
            </li>
          ))
        ) : (
          <li className="bg-gray-50 shadow-md rounded-xl p-5 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-800">Nenhum mês encontrado</h3>
          </li>
        )}
      </ul>
    </section>
        </>
    )
}

export default DashboardMonth