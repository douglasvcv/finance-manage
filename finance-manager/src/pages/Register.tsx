import { useEffect, useState } from "react";

const Register = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [Result, setResult] = useState<{ token: string; user: { email: string } } | null>(null)
    

    const handleEmail = (e: any) => {
        setEmail(e.target.value)

    }
    const handleSenha = (e: any) => {
        setSenha(e.target.value)

    }
    const handleConfirmSenha = (e: any) => {
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
            const data = await fetch("http://localhost:8080/api/auth/register", {
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
<div className="min-h-screen flex flex-col justify-center items-center bg-[#F1F4EF] from-[#1a1f2b] via-[#232c3b] to-[#1a1f2b] p-4">
            <h1 className="text-6xl font-bold text-green-900 drop-shadow-lg">FinDei</h1>

            <div className="mt-10 w-full max-w-lg bg-white backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                    <label htmlFor="email" className="font-semibold text-lg text-green-900 mb-2">Seu Email:</label>
                    <input
                        className="mb-5 px-4 py-2 w-full rounded-xl text-center text-black focus:outline-none shadow-md
                                focus:outline-none focus:ring-2 focus:ring-green-600"
                        name="email" id="email" type="text" placeholder="Email" onChange={handleEmail}
                    />

                    <label htmlFor="senha" className="font-semibold text-lg text-green-900 mb-2">Sua Senha:</label>
                    <input
                        className="mb-5 px-4 py-2 w-full rounded-xl text-center text-black focus:outline-none shadow-md
                                focus:outline-none focus:ring-2 focus:ring-green-600"
                        name="senha" id="senha" type="password" placeholder="Senha" onChange={handleSenha}
                    />

                    <label htmlFor="confirmSenha" className="font-semibold text-lg text-green-900 mb-2">Confirme a senha:</label>
                    <input
                        className="mb-8 px-4 py-2 w-full rounded-xl text-center text-black focus:outline-none shadow-md
                                focus:outline-none focus:ring-2 focus:ring-green-600"
                        name="confirmSenha" id="confirmSenha" type="password" placeholder="Confirme a Senha" onChange={handleConfirmSenha}
                    />

                    <button
                        className="bg-green-800 hover:bg-green-700 transition-colors text-white font-bold px-6 py-2 rounded-xl shadow-md"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register