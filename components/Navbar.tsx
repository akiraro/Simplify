import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from 'react-icons/rx'

const Navbar = () => {
	const router = useRouter()
	const [showMenu, setShowMenu] = useState(false)

	return (
		<nav className="w-full px-12 py-5 items-center">
			<div className="flex flex-wrap overflow-hidden items-center justify-between">
				<div className="text-white italic font-semibold text-3xl cursor-pointer" onClick={() => router.push('/')}>Simplify</div>
				<RxHamburgerMenu
					className="text-white border-2 p-1 rounded-lg block cursor-pointer hover:opacity-80 sm:hidden"
					size={40}
					onClick={() => setShowMenu(!showMenu)} />
				<div className={
					`${showMenu ? 'opacity-100 h-full' : 'opacity-0 h-0'} 
					transition ease-in-out delay-150 w-full 
					sm:flex sm:w-fit sm:opacity-100 sm:h-full`}>
					<ul className={`
						flex flex-col gap-6 items-end w-full pt-6 overflow-visible
						sm:w-fit sm:flex-row sm:pt-0`}>
						<li
							className={
								`${router.pathname == "/" ? "opacity-100 text-xl" : "cursor-pointer opacity-50 hover:opacity-100"} 
								text-white font-medium
								sm:delay-150 sm:hover:scale-110 sm:hover:hover:-translate-y-1`}
							onClick={() => router.push('/')}
						>
							Home
						</li>
						<li
							className={
								`${router.pathname == "/dashboard" ? "opacity-100 text-xl" : "cursor-pointer opacity-50 hover:opacity-100"} 
								text-white font-medium
								sm:delay-150 sm:hover:scale-110 sm:hover:hover:-translate-y-1`}
							onClick={() => router.push('/dashboard')}
						>
							Dashboard
						</li>

						<li
							className={`pl-6 text-white cursor-pointer flex hover:text-slate-200`}
							onClick={() => signOut()}
						>
							<FiLogOut size={25} />
							<span className="ml-2">Logout</span>
						</li>
					</ul>
				</div>
			</div>

		</nav>
	)
}

export default Navbar