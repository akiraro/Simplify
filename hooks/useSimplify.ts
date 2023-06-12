import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useSimplify = (slug?: any) => {
	const { data, error, isLoading } = useSWR(slug ? `/api/public/${slug}`: null, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, error, isLoading };
};

export default useSimplify;
