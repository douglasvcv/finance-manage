import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [incorreto, setIncorreto] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleEmail = (e: any) => {
        setEmail(e.target.value)

    }
    const handleSenha = (e: any) => {
        setSenha(e.target.value)

    }

    const redirectToPage = ()=>{
        navigate("/dashboard")
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const payload = {
                email: email,
                senha: senha
            }
            const valueJson = JSON.stringify(payload)
            const data = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: valueJson
            })
            if (!data) {
                throw new Error("Erro ao fazer login")
            }
            const result = await data.json()
            console.log(result)
            if(result.token){
                redirectToPage()
                sessionStorage.setItem("token", result.token)
            }
            if(result.msg){
                setIncorreto(!incorreto)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.log("Email aí caba vei: ", email)
        console.log("Senha aí caba vei: ", senha)
    }, [ email, senha])
    return (
        <>
            <div className="bg-[#F1F4EF] h-screen flex justify-center items-center flex-col">
                <h1 className="text-6xl font-bold text-[#2F473F]">FinDei</h1>
                <div className="
                bg-white min-w-[28%] flex justify-center items-center min-h-[50%] p-[7%] rounded-2xl mt-[60px]
                md:max-w-[50%]
                ">
                    <form onSubmit={(e) => handleSubmit(e)} className="
                    flex flex-col justify-around items-center h-[100%] w-[80vw]
                    md:w-[40w] 
                    ">
                        <label htmlFor="email" className="font-bold text-xl">Seu Email:</label>
                        <input className="
                        mb-[20px] border-none shadow-md w-[100%] h-[40px] rounded-xl text-center border cursor-pointer focus:outline-transparent
                        md:w-[80%]
                        " name="email" id="email" type="text" placeholder="Email" onChange={(e) => handleEmail(e)} />
                        <label htmlFor="senha" className=" font-bold text-xl">Sua Senha:</label>
                        <input className="
                        mb-[20px] border-none shadow-md w-[100%] h-[40px] rounded-xl text-center border cursor-pointer focus:outline-transparent
                        md:w-[80%]
                        " name="senha" id="senha" type="password" placeholder="Senha" onChange={(e) => handleSenha(e)} />
                        <button className="mt-9 mx-auto bg-black text-white w-35 h-15 text-center rounded-xl cursor-pointer" type="submit">Entrar</button>
                        {incorreto ? <p className="text-red-800 mt-5">Login incorreto</p> : <p className="mt-5 text-green-800">Faça o login</p>}                    
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login