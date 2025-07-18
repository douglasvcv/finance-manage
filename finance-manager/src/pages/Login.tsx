import { useEffect, useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [Result, setResult] = useState<{ token: string; user: { email: string } } | null>(null)


    const handleEmail = (e: any) => {
        setEmail(e.target.value)

    }
    const handleSenha = (e: any) => {
        setSenha(e.target.value)

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
            setResult(result)
            sessionStorage.setItem("token", result.token)
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        console.log("Result aí caba vei: ", Result)
        console.log("Email aí caba vei: ", email)
        console.log("Senha aí caba vei: ", senha)
    }, [Result, email, senha])
    return (
        <>
            <div className="bg-[#F1F4EF] h-screen flex justify-center items-center flex-col">
                <h1 className="text-6xl font-bold">FinDei</h1>
                <div className="bg-white min-w-[28%] min-h-[50%] p-[7%] rounded-2xl mt-[60px]">
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-[30vw]">
                        <label htmlFor="email" className="mt-[-10px] font-bold">Seu Email:</label>
                        <input className="mb-[20px] w-[100%] h-[40px] rounded-xl text-center border focus:" name="email" id="email" type="text" placeholder="Email" onChange={(e) => handleEmail(e)} />
                        <label htmlFor="senha" className=" font-bold">Sua Senha:</label>
                        <input className="mb-[20px] w-[100%] h-[40px] rounded-xl text-center border" name="senha" id="senha" type="password" placeholder="Senha" onChange={(e) => handleSenha(e)} />
                        <button  type="submit">Entrar</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Login