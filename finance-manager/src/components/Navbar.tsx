import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="">
                <button
                    onClick={() => { setIsOpen(true) }}
                    className="p-3 text-black  text-3xl"
                >
                    ☰
                </button>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-20 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={() => setIsOpen(false)}>✖</button>
                </div>

                <ul className="p-4 space-y-4">
                    <li><Link to="/dashboard" className="block hover:text-blue-600">Home</Link></li>
                    <li><Link to="/transacoes" className="block hover:text-blue-600">Transações</Link></li>
                    <li><Link to="/categorias" className="block hover:text-blue-600">Categorias</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar