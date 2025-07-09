import { useEffect, useState } from "react"

const Login = ()=>{

    const [email, setEmail]=useState("")
    const [senha, setSenha]=useState("")
    const [Result, setResult]=useState<{token:string; user: {email:string}} | null>(null)
 
    
    const handleEmail = (e:any)=>{
        setEmail(e.target.value)

    }
    const handleSenha = (e:any)=>{
        setSenha(e.target.value)

    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        try {
            const payload = {
                email: email,
                senha: senha
            }
            const valueJson = JSON.stringify(payload)
           const data = await fetch("http://localhost:8080/api/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: valueJson
           })
           if(!data){
            throw new Error("Erro ao fazer login")
           }
           const result = await data.json()
           setResult(result)
           sessionStorage.setItem("token", result.token)
       } catch (error) {
           console.error(error)
       }

    }
    useEffect( ()=>{
        console.log("Result aí caba vei: ",Result)
        console.log("Email aí caba vei: ",email)
        console.log("Senha aí caba vei: ",senha)
    }, [Result, email, senha])
    return (
        <>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input name="email" type="text" placeholder="Email"  onChange={(e)=>handleEmail(e)} />
            <input name="senha" type="text" placeholder="Senha" onChange={(e)=>handleSenha(e)} />
            <button type="submit">Entrar</button>
        </form>
        {Result? <p>{Result.user.email}</p>: <p>Aguardando resultado da pesquisa...</p>}
        </>
    )
}

export default Login