import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useReport = (urlId: string, params: Record<string,any>) => {
	// Generate query parameters
	const queryParams = new URLSearchParams()
	Object.keys(params).forEach((key) => {
		queryParams.set(key, params[key])
	})

	const { data, mutate, error, isLoading } = useSWR(`/api/url/${urlId}/report?` + queryParams.toString(), fetcher, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, mutate, error, isLoading };
}

export default useReport