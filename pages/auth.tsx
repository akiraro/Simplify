import React, { useCallback, useState } from 'react'
import Input from '@/components/Input'
import axios from "axios"
import { getSession, signIn } from 'next-auth/react'
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { enqueueSnackbar } from "notistack"

const auth = () => {
	const router = useRouter()

	const [variant, setVariant] = useState('login')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const login = useCallback(async () => {
		try {
			const auth = await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/'
			})

			if (!auth?.ok){
				enqueueSnackbar('Error: ' + auth?.error, {variant: "error"})
			}else{
				enqueueSnackbar('Log in successful !', {variant: "success"})
				router.push('/')
			}
		} catch (error) {
			console.log("meee");
			console.error(error);
			enqueueSnackbar('Error: ' + error, {variant: "error"})
		}
	}, [email, password])

	const register = useCallback(async () => {
		try {
			await axios.post('/api/auth/register', {
				email, name, password
			})
		} catch (error) {
			console.error(error);
		}
	}, [email, name, password])

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
	}, [])

	return (
		<div className="relative h-full w-full bg-violet-950 flex flex-col">
			<nav className="px-12 py-5">
				<div className="text-zinc-300 italic font-semibold text-2xl">Simplify</div>
			</nav>
			<div className="h-screen flex justify-center">
				<div className="bg-black bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-lg rounded-md w-full">
					<h2 className="text-3xl font-bold text-white">
						{variant === 'login' ? 'Login' : 'Register'}
					</h2>
					{variant === 'register' &&
						(
							<div className="flex flex-col">
								<Input id="name" label="Name" onChange={(e: any) => setName(e.target.value)} type="name" value={name} />
							</div>
						)
					}
					<div className="flex flex-col">
						<Input id="email" label="Email" onChange={(e: any) => setEmail(e.target.value)} type="email" value={email} />
					</div>
					<div className="flex flex-col">
						<Input id="password" label="Password" onChange={(e: any) => setPassword(e.target.value)} type="password" value={password} />
					</div>
					<button onClick={variant === 'login' ? login : register} className="my-3 w-full bg-indigo-700 py-3 text-white rounded-md hover:bg-indigo-800 transition">
						{variant === 'login' ? 'Login' : 'Register'}
					</button>
					<p className="text-neutral-500">
						{variant === 'login' ? 'First time using Simplify ?' : 'Already have an account?'}
						<span onClick={toggleVariant} className="text-white ml-1 cursor-pointer hover:underline">
							{variant === 'login' ? 'Create an account' : 'Login now'}
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default auth

export async function getServerSideProps(context: NextPageContext){
	const session = await getSession(context)

	if (session) {
	  return {
		 redirect: {
			destination: '/',
			permanent: false
		 }
	  }
	}
 
	return {
	  props: {}
	}
 }