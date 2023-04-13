import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Input from "./Input"
import axios from "axios"
import { enqueueSnackbar } from "notistack"
import copy from "copy-to-clipboard";

interface LinkFormProps {
	domain: String
}

const VARIANT_COPY = 'copy'
const VARIANT_CREATE = 'create'

const LinkForm: React.FC<LinkFormProps> = ({ domain }) => {
	const [isSlugUsed, setIsSlugUsed] = useState(false)
	const [variant, setVariant] = useState(VARIANT_CREATE)
	const [form, setForm] = useState({ slug: '', originalUrl: '' })
	const [response, setResponse] = useState({ slug: '' })

	const simplifyUrl = useCallback(async () => {
		const response = await axios.post('/api/url', {
			...form
		})

		if (response.status === 200) {
			setResponse(response.data)
			setVariant(VARIANT_COPY)
			enqueueSnackbar("Successfully simplify URL", { variant: "success" })
		}else{
			enqueueSnackbar("Error occured !", { variant: "error" })
		}

	}, [form])

	useEffect(() => {
		let active = true
		checkSlug()

		return () => { active = false }

		async function checkSlug() {
			const response = await axios.get('/api/url/check', {
				params: {
					slug: form.slug
				}
			})
			if (!active) { return }
			setIsSlugUsed(response.data.used)
		}

	}, [form.slug])

	return (
		<div className="flex p-10 w-full justify-center overflow-y-scroll flex-col lg:w-2/4 md:w-2/3">
			<div className="text-white italic font-semibold text-4xl text-center mb-5">Simplify</div>
			{variant === VARIANT_CREATE ? (
				<form
					onSubmit={(e) => {
						e.preventDefault()
						simplifyUrl()
					}}
				>
					<Input
						id="name"
						label="Link to be simplifed"
						onChange={(e: any) => { setForm({ ...form, originalUrl: e.target.value }) }}
						type="url"
						value={form.originalUrl}
						required
						placeholder="URL to be simplifed e.g http://google.com" />

					<div className="bg-black bg-opacity-20 p-6 rounded-md mt-3">
						<p className="text-white text-md">Simplify URL {isSlugUsed && <span className="ml-2 text-red-500">Already in use</span>}</p>
						<div className="mt-3 flex flex-col lg:flex-row md:flex-row">
							<span className="text-white text-xl">simplify.com/</span>
							<input
								placeholder="alias e.g mytwitterhandler"
								value={form.slug}
								onChange={(e) => setForm({ ...form, slug: e.target.value })}
								required
								minLength={2}
								className={`lg:ml-2 md:ml-2 rounded px-5 py-2 w-full focus:outline-none ${isSlugUsed ? 'border-2 border-red-500' : null}`} />
						</div>
					</div>
					<input
						type="submit"
						disabled={isSlugUsed}
						value="Simplify"
						className={`w-full mt-5 cursor-pointer rounded-md py-3 text-white text-xl bg-opacity-70 hover:bg-opacity-100 transition ${isSlugUsed ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600'}`} />
				</form>
			) : (
				<div className="mt-5">
					<div 
						className="text-white text-center text-lg cursor-pointer"
						onClick={() => {window.location.href = `${domain}/${response?.slug}`;}}>
							{`${domain}/${response?.slug}`}
					</div>
					<div className="flex gap-10 mt-5">
						<button 
							className="flex-1 bg-blue-600 bg-opacity-70 text-white rounded-md py-3 hover:bg-opacity-100 transition"
							onClick={() => {
								copy(`${domain}/${response?.slug}`)
								enqueueSnackbar("Link copied to clipboard 📋", {variant: "success"})
							}}>
									Copy Link
						</button>
						<button
							className="flex-1 bg-blue-600 bg-opacity-70 text-white rounded-md py-3 hover:bg-opacity-100 transition"
							onClick={() => {
								setForm({ slug: '', originalUrl: '' })
								setVariant(VARIANT_CREATE)
								setResponse({ slug: '' })
							}}>
							Another One
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default LinkForm