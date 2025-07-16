import { NavLink } from "react-router-dom"
import imgLogo from "../../assets/images/Design sem nome.png"
import imgBG from "../../assets/images/backgroundHome.png"


const Home = ()=>{
    return(
        <>
        <div className="bg-[url('../../assets/images/backgroundHome.png')] h-screen bg-cover bg-no-repeat w-screen bg-center"
        style={{backgroundImage: `url(${imgBG})`}}
        >
            <header className="flex justify-around items-center h-[15vh] text-white">
                <div className="flex items-center">
                <h1 className="text-size-30 text-6xl font-bold" >FinDei</h1>
                </div>
                <div className="flex items-center justify-center" >
                    <NavLink className="text-3xl m-20 font-bold shadow-xl py-[2%] px-[10%] bg-red-900 rounded-2xl hover:bg-red-800 duration-900" to="/login">
                        Login
                    </NavLink>
                    <NavLink className="text-3xl font-bold shadow-xl p-[2%] px-[3%] bg-red-900 rounded-2xl hover:bg-red-800 duration-900" to="/register">
                        Registrar
                    </NavLink>
                </div>
            </header>
            <div className="text-white h-[70vh] flex flex-col mx-[10vw] justify-center">
                <h1 className="text-3xl w-[40vw] font-bold mb-10">Organize sua vida financeira de um jeito leve e prático, sem planilhas malucas nem apps complicados.</h1>
                <NavLink className="w-[10vw] text-2xl text-center bg-black p-3 rounded-2xl" to="/register">Saiba mais</NavLink>
            </div>
        </div>
        </>
    )
}

export default Home