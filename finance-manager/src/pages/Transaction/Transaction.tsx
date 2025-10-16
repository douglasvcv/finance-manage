import { use, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"

interface DataTransactionGet {
    _id: string,
    user: string,
    type: string,
    description: string,
    amount: number,
    category: string,
    createdAt: string,
    __v: number
}

interface categoriesGet {
    _id: string,
    name: string,
    user: string,
    createdAt: string,
    __v: number
}


function Transaction() {
    //Abre alguma interface:
    const [open, setOpen] = useState<boolean>(false)
    const [openType, setOpenType] = useState<boolean>(false)
    const [openCategory, setOpenCategory] = useState<boolean>(false)
    const [create, setCreate] = useState<boolean>(false)
    //Recebe algum dado
    const [categoriesData, setCategoriesData] = useState<categoriesGet[]>([])
    const [dataFinaly, setDataFinaly] = useState<DataTransactionGet[]>([])
    const [data, setData] = useState<string>()
    const [type, setType] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<string>("")
    //Outros
    const [nameType, setNameType] = useState<string>("")
    const [nameCategory, setNameCategory] = useState<string>("")

    const findCategories = async () => {

        const token = sessionStorage.getItem("token")
        try {
            const data = await fetch("http://localhost:8080/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const result = await data.json()
            if (result.length > 0) {
                setCategoriesData(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDataTransactions() {

        const token = sessionStorage.getItem("token")
        try {
            const data = await fetch("http://localhost:8080/api/transactions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const result = await data.json()
            setData(result)
            if (result.length > 0) {
                setDataFinaly(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleOpenCreateTransaction() {
        setOpen(true)
    }
    function handleCloseCreateTransaction() {
        setOpen(false)
    }
    async function handleCreateTransaction() {
        const token = sessionStorage.getItem("token")
        
        try {
            const data = await fetch("http://localhost:8080/api/transactions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ type: type, description: description, amount:amount, category:category })
                }
            )
            const result = await data.json()
            if(result){
                setData(result)
                setCreate(true)
            }

        } catch (error) {
            console.log("Erro: ", error)
        }
    }

    useEffect(() => {
        handleDataTransactions()
    }, [])

    useEffect(() => {
        if (openCategory == true) {
            findCategories()
        }

    }, [openCategory])

    useEffect(() => {
        console.log(amount)
        console.log(category)
        console.log(type)
        console.log(description)
        
    }, [description])

    return (
        <>
        <div className="bg-[#F1F4EF]">

        
            <Navbar />
            <div className="m-auto text-center w-full py-6">
                <button
                    onClick={handleOpenCreateTransaction}
                    className="bg-[#2F473F] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#253b34] transition"
                >
                    Adicionar Transação
                </button>
            </div>
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[450px] rounded-xl shadow-lg p-6 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-[#2F473F] mb-2">Nova Transação</h2>

                        {/* Tipo */}
                        <div>
                            <label className="block font-medium mb-1">Tipo:</label>
                            <button
                                onClick={() => setOpenType(!openType)}
                                className="w-full border rounded-lg px-3 py-2 text-left hover:bg-gray-50"
                            >
                                {nameType.length <= 0 ? "Escolha uma opção" : nameType}
                            </button>
                            {openType && (
                                <ul className="mt-2 border rounded-lg divide-y">
                                    <li>
                                        <button
                                            onClick={() =>(setType("income"), setNameType("Renda"), setOpenType(false))}
                                            className="w-full px-3 py-2 text-left hover:bg-green-50"
                                        >
                                            Renda
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>( setType("expense") , setNameType("Despesa"), setOpenType(false))}
                                            className="w-full px-3 py-2 text-left hover:bg-red-50"
                                        >
                                            Despesa
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* Valor */}
                        <div>
                            <label className="block font-medium mb-1">Valor:</label>
                            <input
                                type="text"
                                onChange={(e)=>setAmount(Number(e.target.value))}
                                placeholder="Informe o valor"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F473F]"
                            />
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className="block font-medium mb-1">Categoria:</label>
                            <button
                                onClick={() => setOpenCategory(!openCategory)}
                                className="w-full border rounded-lg px-3 py-2 text-left hover:bg-gray-50"
                            >
                               {nameCategory.length <= 0 ? "Escolha a categoria" : nameCategory } 
                            </button>
                            {openCategory && (
                                <ul className="mt-2 border rounded-lg divide-y">
                                    {categoriesData.length > 0 ? (
                                        categoriesData.map((e) => (
                                            <li key={e._id} onClick={()=>(setCategory(e.name), setOpenCategory(false), setNameCategory(e.name))} className="px-3 py-2 hover:bg-gray-50">
                                                {e.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-3 py-2 text-gray-500">Nenhuma categoria</li>
                                    )}
                                </ul>
                            )}
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block font-medium mb-1">Descrição:</label>
                            <input
                                type="text"
                                placeholder="Digite a descrição"
                                onChange={(e:any)=>setDescription(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F473F]"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={handleCloseCreateTransaction}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateTransaction}
                                className="px-4 py-2 rounded-lg bg-[#2F473F] text-white hover:bg-[#253b34] transition"
                            >
                                Salvar
                            </button>
                            {create ? <div>Transação criada</div>: <div></div>}
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de transações */}
            <ul className="flex flex-col gap-4 md:w-[60%] lg:w-1/2 m-auto mt-10">
                {dataFinaly.length > 0 ? (
                    dataFinaly.map((e) => {
                        let nameType = e.type === "expense" ? "Despesa" : "Renda"
                        let typeColor =
                            e.type === "expense" ? "text-red-600" : "text-green-600"

                        return (
                            <li
                                key={e._id}
                                className="bg-white border rounded-lg shadow-md p-4 flex flex-col gap-2"
                            >
                                <p className={`font-bold ${typeColor}`}>{nameType}</p>
                                <p className="text-lg font-semibold">{e.amount}</p>
                                <p className="text-gray-700">{e.category}</p>
                                <p className="text-gray-600 italic">{e.description}</p>
                                <p className="text-sm text-gray-500">
                                    Criado em {new Date(e.createdAt).toLocaleString("pt-BR")}
                                </p>
                            </li>
                        )
                    })
                ) : (
                    <p className="text-center text-gray-500">Nenhuma transação encontrada</p>
                )}
            </ul>
</div>
        </>
    )
}

export default Transaction