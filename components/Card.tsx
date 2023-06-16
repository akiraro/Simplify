import React from 'react'

type Props = {
	children?: React.ReactNode
	className?: String
};

export const Card: React.FC<Props> = ({ children, className }) => {
	return (
		<div className={`bg-white rounded-md p-5 ${className}`}>
			{children}
		</div>
	)
}
