import React from 'react'
import {FiLogOut} from 'react-icons/fi'
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter()
	const borderStyle = "border-solid border-b-2 border-blue-600"
	return (
		<nav className="px-12 py-5 flex flex-row justify-between items-center">
			<div className="flex gap-10 items-center">
				<div className="text-white italic font-semibold text-3xl cursor-pointer" onClick={() => router.push('/')}>Simplify</div>
				<div 
					className={`${router.pathname == "/" ? borderStyle : "cursor-pointer hover:text-slate-200"} text-white font-medium text-lg`}
					onClick={() => router.push('/')}
					>
					Home
				</div>
				<div 
					className={`${router.pathname == "/dashboard" ? borderStyle : "cursor-pointer hover:text-slate-200"} text-white font-medium text-lg`}
					onClick={() => router.push('/dashboard')}
					>
					Dashboard
				</div>
			</div>
			<div onClick={() => signOut()} className="text-white flex cursor-pointer hover:text-slate-200">
				<FiLogOut size={25}/>
				<span className="ml-2">Logout</span>
			</div>
		</nav>
	)
}

export default Navbar