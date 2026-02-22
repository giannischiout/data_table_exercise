import useSWR from "swr";


type Props = {
  endpoint: string;
  params?: Record<string, string | boolean | number>
}



const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useGetData({endpoint, params}: Props) {
  console.log({params})
  const {data, isLoading, error} = useSWR(endpoint, fetcher)

  return {data, isLoading, error}
}