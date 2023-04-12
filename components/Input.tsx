import React from 'react'

interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type?: string;
}

const Input: React.FC<InputProps> = ({
	id, onChange, value, label, type
}) => {
	return (
		<div className="relative flex-col my-3">
			<label htmlFor={id} className="text-white flex-1 block mb-2">{label}</label>
			<input
				id={id}
				value={value}
				type={type}
				onChange={onChange}
				className="w-full block rounded px-5 py-3 text-md bg-neutral-300 focus:outline-none focus:bg-neutral-400"/>
		</div>
	)
}

export default Input