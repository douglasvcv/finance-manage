import { useEffect, useState } from "react"
import hamburguerIMG from "../../assets/images/hamburger.png"
import closedIMG from "../../assets/images/x.png"

const Dashboard = () => {

    const [total, setTotal]= useState<object | any>({})
    const [open, setOpen] = useState<boolean>(false)

    function handleMenu(){
        setOpen(!open)
    }
    const token = sessionStorage.getItem("token")
   async function fetchTotal(){
        try {
            const data = await fetch("http://localhost:8080/api/dashboard",
                {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json;",
                        "Authorization": "Bearer "+ token
                    },
                }
            )
            const response = await data.json()
            if(response.balance){
                setTotal(response)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        
    })

    return (
        <>
            <div className="h-[100vh]">
                <header className="w-[100vw] h-[63px] flex justify-center items-center shadow-xl">
                    <ul className="flex w-[100%] items-center justify-around">
                        <li><button><img src={open ? closedIMG : hamburguerIMG} onClick={handleMenu} className="w-[70px] cursor-pointer p-2"></img></button></li>
                        <li><button className="cursor-pointer p-2 font-semibold">Resumo padrão</button></li>
                        <li><button className="cursor-pointer p-2 font-semibold">Resumo por categoria</button></li>
                        <li><button className="cursor-pointer p-2 font-semibold">Resumo por mês</button></li>
                    </ul>
                </header>
                <ul className="flex flex-col items-center text-center w-[100%]
                md:justify-center md:w-[60%] md:m-auto
                ">
                    <h1 className="mt-3 text-4xl font-[Roboto] font-bold">Dashboard:</h1>
                    <li className="bg-green-800 flex flex-col my-2 h-[140px] w-[80vw] items-center justify-center rounded-xl text-xl font-semibold text-white md:w-[70%]">
                        <h2>Entradas: {total.totalIncome}</h2>
                        <h2>Saídas: {total.totalExpense}</h2>
                        <h2>Saldo: {total.balance}</h2>
                    </li>
                    <button onClick={fetchTotal}>Teste apenas</button>
                </ul>
            </div>
        </>
    )
}

export default Dashboard