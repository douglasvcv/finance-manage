import { NavLink } from "react-router-dom"
import imgLogo from "../../assets/images/Design sem nome.png"
import imgBG from "../../assets/images/backgroundHome.png"


const Home = ()=>{
    return(
        <>
        <div className="bg-[#EDFDF2] h-screen bg-cover bg-no-repeat w-screen bg-center"
        >
            <header className="
            flex justify-around items-center h-[15vh] text-[#2F473F] flex-col
            md:flex-row
             ">
                <div className="flex items-center">
                <h1 className="text-size-30 text-6xl font-bold text-[#2F473F] mt-2" >FinDei</h1>
                </div>
                <div className="
                flex items-center justify-center mt-6
                md:mt-0
                " >
                    <NavLink className="
                    text-3xl mr-10 mt-5 font-bold shadow-xl py-[4%] bg-[#129E3F] text-white px-[10%] rounded-2xl hover:bg-green-800 duration-900
                    
                    " to="/login">
                        Login
                    </NavLink>
                    <NavLink className="text-3xl font-bold mt-5 shadow-xl py-[4%] px-[3%] bg-[#129E3F] text-white rounded-2xl hover:bg-green-800 duration-900" to="/register">
                        Registrar
                    </NavLink>
                </div>
            </header>
            <div className="text-white h-[40vh] flex flex-col mt-30  mx-[10vw] justify-center">
                <h1 className="text-xl text-center font-semibold mb-10 text-[#1A1C19] ">Organize sua vida financeira de um jeito leve e prático, sem planilhas malucas nem apps complicados.</h1>
                <NavLink className=" m-auto text-2xl text-center bg-black p-3 rounded-2xl" to="/register">Saiba mais</NavLink>
            </div>
        </div>
        </>
    )
}

export default Home