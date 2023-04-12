import React, { useCallback, useMemo, useState } from 'react'
import Input from "./Input"
import axios from "axios"

const LinkForm = () => {
	const [slug, setSlug] = useState('')

	const simplifyUrl = useCallback(async () => {
		console.log("simplify url");
		await axios.post('/api/url', {
			slug: 'test',
			originalUrl: 'http://www.google.com'
		})
	}, [])

	const isSlugUsed = useMemo(async () => {
		const slugCheck =  await axios.get('/api/url/check', {
			params: {
				slug
			}
		})

		return slugCheck
	}, [slug])

	return (
		<div className="flex p-10 w-2/4 justify-center flex-col">
			<div className="text-white italic font-semibold text-4xl text-center mb-5">Simplify</div>
			
			<Input id="name" label="Link to simplify" onChange={(e: any) => {}} type="name" value={'aa'} />

			<div className="bg-black bg-opacity-30 p-6 rounded-md mt-3">
				<p className="text-white text-md">Simplify URL</p>
				{isSlugUsed ? 'used': 'nope'}
				<div className="mt-3 flex">
					<span className="text-white text-xl">simplify.com/</span>
					<input 
						placeholder="alias e.g mytwitterhandler"
						className="ml-2 rounded px-5 py-2 flex-1"/>
				</div>
			</div>
			<button onClick={simplifyUrl} className="mt-5 bg-indigo-700 rounded-md py-3 text-white text-xl">Simplify</button>
		</div>
	)
}

export default LinkForm