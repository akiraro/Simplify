import useSimplify from "@/hooks/useSimplify"
import { useRouter } from "next/router"
import React from 'react'

const Slug = () => {
	const { query, isReady } = useRouter()
	const { slug } = query
	const { data = {}, error, isLoading } = useSimplify(slug)

	if (!isReady || isLoading){
		return (<div>Loading ...</div>)
	}

	if (error?.request?.status !== 400) {
		window.location.href = data.originalUrl;

		return (
			<div>Redirecting to {data?.originalUrl}</div>
		)
	}

	return (
		<div>404</div>
	)
}

export default Slug