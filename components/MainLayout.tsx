import Navbar from "./Navbar"
import React from "react"

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
	return (
		<div className="h-full w-full bg-gradient-to-t from-[#3b82f6] to-[#2dd4bf] flex flex-col overflow-auto">
			<Navbar />
			{children}
		</div>
	)
}

export default MainLayout