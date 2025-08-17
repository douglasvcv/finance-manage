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
           <div className="bg-[#F1F4EF] h-screen flex justify-center items-center flex-col font-[Roboto]">
            <h1 className="text-5xl font-bold text-green-900">FinDei</h1>

            <div className="
                bg-white shadow-lg min-w-[28%] flex justify-center items-center min-h-[50%]
                p-10 rounded-2xl mt-10
                md:max-w-[40%]
            ">
                <form 
                    onSubmit={handleSubmit} 
                    className="flex flex-col justify-around items-center w-full"
                >
                    <label htmlFor="email" className="font-bold text-lg text-green-900 mb-2">
                        Seu Email:
                    </label>
                    <input 
                        className="
                            mb-5 border-none shadow-md w-full h-11 rounded-xl text-center 
                            focus:outline-none focus:ring-2 focus:ring-green-600
                        " 
                        name="email" 
                        id="email" 
                        type="text" 
                        placeholder="Email" 
                        onChange={handleEmail} 
                    />

                    <label htmlFor="senha" className="font-bold text-lg text-green-900 mb-2">
                        Sua Senha:
                    </label>
                    <input 
                        className="
                            mb-5 border-none shadow-md w-full h-11 rounded-xl text-center 
                            focus:outline-none focus:ring-2 focus:ring-green-600
                        " 
                        name="senha" 
                        id="senha" 
                        type="password" 
                        placeholder="Senha" 
                        onChange={handleSenha} 
                    />

                    <button 
                        className="mt-7 px-6 py-2 bg-green-800 text-white font-semibold 
                                   rounded-xl shadow-md hover:bg-green-700 transition"
                        type="submit"
                    >
                        Entrar
                    </button>

                    {incorreto 
                        ? <p className="text-red-800 mt-5 font-medium">Login incorreto</p> 
                        : <p className="mt-5 text-green-800 font-medium">Faça o login</p>
                    }                    
                </form>
            </div>
        </div>
        </>
    )
}

export default Login