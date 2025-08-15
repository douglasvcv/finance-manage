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
<div className="w-full">
      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Por Categoria</h2>

      {/* Lista de categorias */}
      <ul className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((x: any, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-xl p-5 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {x.category}
              </h3>
              <p className="text-gray-600 mt-1">
                Saldo final:{" "}
                <span className="font-bold text-blue-600">R$ {x.amount}</span>
              </p>
            </li>
          ))
        ) : (
          <li className="bg-white shadow-md rounded-xl p-5 text-center border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Nenhuma Categoria encontrada
            </h3>
          </li>
        )}
      </ul>
    </div>
        </>
    )
}

export default DashboardCategory