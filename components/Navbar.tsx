import React from 'react'
import {FiLogOut} from 'react-icons/fi'
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter()
	return (
		<nav className="px-12 py-5 flex flex-row justify-between">
			<div className="text-white italic font-semibold text-2xl cursor-pointer" onClick={() => router.push('/')}>Simplify</div>
			<div onClick={() => signOut()} className="text-white flex cursor-pointer hover:text-slate-200">
				<FiLogOut size={25}/>
				<span className="ml-2">Logout</span>
			</div>
		</nav>
	)
}

export default Navbar