import { use, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"

interface categoriesGet {
    _id: string,
    name: string,
    user: string,
    createdAt: string,
    __v: number
}

const Categories = () => {

    const [categoriesData, setCategoriesData] = useState<categoriesGet[]>([])
    const [settings, setSettings] = useState<boolean>(false)
    const [changed, setChanged] = useState<boolean>(false)
    const [newName, setNewName] = useState()

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

    function handleEditCategory(idUser:any) {
        setSettings(true)
        sessionStorage.setItem("name", idUser)
    }

    function handleClosed(){
        setSettings(false)
    }

    async function handleChangeName(){
       const nameCategory =  sessionStorage.getItem("name")
       const token = sessionStorage.getItem("token")
        try {
            const data = await fetch("http://localhost:8080/categories", {
                method: "PUT",
                headers:{
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name":nameCategory, "newName":newName})
            })
            if(data.status==201){
                setChanged(!changed)
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    useEffect(() => {
        findCategories()
    }, [])

    useEffect(() => {
        console.log(categoriesData)
    }, [categoriesData])
    return (
        <>
            <div className="bg-[#F1F4EF]">

                <Navbar />
                <div className="bg-[#F1F4EF] min-h-screen flex flex-col items-center p-6">
                    <h1 className="text-3xl font-bold text-[#2F473F] mb-6">Categorias</h1>


                    <ul className="w-full max-w-2xl grid gap-4">
                        {categoriesData.length > 0 ? (
                            categoriesData.map((e) => (
                                <li
                                    id={e._id}
                                    key={e._id}
                                    className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center border border-gray-200 hover:shadow-lg transition"
                                >
                                    <span className="text-lg font-semibold text-[#2F473F]">{e.name}</span>
                                    <span className="text-sm text-gray-500">
                                        Criado em {new Date(e.createdAt).toLocaleDateString("pt-BR")}
                                    </span>
                                    <button onClick={()=>handleEditCategory(e.name)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg></button>

                                </li>
                            ))

                        ) : (
                            <li className="text-center text-gray-500 italic">
                                Nenhuma categoria encontrada
                            </li>
                        )}
                        {settings == true ?
                            <div className="fixed bg-white h-[350px] w-[87vw] flex flex-col justify-center items-center
                            md:w-[35vw]
                            ">
                            <div className="fixed right-9 top-40 text-3xl md:right-160" onClick={handleClosed}><button>✖</button></div>
                                <label className="text-xl mb-2 font-semibold" htmlFor="">Altere o nome</label>
                                <input type="text" onChange={(e:any)=>setNewName(e.target.value)} placeholder="Digite aqui" className="text-center border rounded-xl p-2"/>
                                <button onClick={handleChangeName} className="mt-5 border px-10 py-2 rounded-2xl cursor-pointer">Altere</button>
                            </div>
                            : <div className="hidden"></div>}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Categories