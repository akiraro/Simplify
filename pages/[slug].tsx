import useSimplify from "@/hooks/useSimplify"
import { useRouter } from "next/router"
import React from 'react'

const slug = () => {
	const { query, isReady } = useRouter()
	const { slug } = query
	const { data = {}, isLoading } = useSimplify(slug)

	if (!isReady || isLoading){
		return (<div>Loading ...</div>)
	}

	window.location.href = data.originalUrl;

	return (
		<div>Redirecting to {data?.originalUrl}</div>
	)
}

export default slug