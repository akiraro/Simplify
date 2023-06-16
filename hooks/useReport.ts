import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useReport = (urlId: string, type: string) => {
	const { data, error, isLoading } = useSWR(`/api/url/${urlId}/report?` + type, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, error, isLoading };
}

export default useReport