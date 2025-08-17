import { use, useEffect, useState } from "react"

interface categoriesGet {
     _id: string,
    name: string,
    user: string,
    createdAt: string,
    __v: number
}

const Categories = () => {

    const [categoriesData, setCategoriesData] = useState<categoriesGet[]>([])

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

    useEffect(() => {
        findCategories()
    }, [])
    
    useEffect(()=>{
        console.log(categoriesData)
    }, [categoriesData])
    return (
        <>
            <div>
                <div>
                    <h1>Categorias</h1>
                    {categoriesData.length > 0 ? categoriesData.map((e)=>(<li>{e.name}</li>)) : <li>Nenhuma categoria encontrada</li>}
                </div>
            </div>
        </>
    )
}

export default Categories