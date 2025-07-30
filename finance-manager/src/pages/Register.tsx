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
            <div className="bg-[#F1F4EF] h-screen flex justify-center items-center flex-col">
                <h1 className="text-6xl font-bold text-[#2F473F]">FinDei</h1>
                <div className="
                bg-white min-w-[28%] flex justify-center items-center min-h-[50%] p-[7%] rounded-2xl mt-[60px]
                md:max-w-[50%]
                ">
                    <form onSubmit={(e) => handleSubmit(e)} className="
                    flex flex-col justify-center items-center h-[100%] w-[100vw]
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
                        <label htmlFor="senha" className=" font-bold text-xl">Confirme a senha:</label>
                        <input className="
                        mb-[20px] border-none shadow-md w-[100%] h-[40px] rounded-xl text-center border cursor-pointer focus:outline-transparent
                        md:w-[80%]
                        " name="senha" id="senha" type="password" placeholder="Confirme a Senha" onChange={(e) => handleConfirmSenha(e)} />
                        <button className="mt-9 mx-auto bg-black text-white w-35 h-15 text-center rounded-xl cursor-pointer" type="submit">Cadastrar</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register