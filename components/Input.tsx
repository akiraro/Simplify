import React from 'react'

interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type?: string;
	placeholder?: string;
	required?: boolean
}

const Input: React.FC<InputProps> = ({
	id, onChange, value, label, type, placeholder, required
}) => {
	return (
		<div className="relative flex-col my-3">
			<label htmlFor={id} className="text-white flex-1 block mb-2">{label}</label>
			<input
				id={id}
				value={value}
				type={type}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className="w-full block rounded px-5 py-3 text-md bg-white focus:outline-none"/>
		</div>
	)
}

export default Input