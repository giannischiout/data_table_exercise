import useSWR from "swr";
import type {IUser} from "../types/";

type Params = {
  deparment: string;
  search: string;
}
type Props = {
  endpoint: string;
  params?: Params; // allow extra keys

}



const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useGetData({endpoint, params}: Props) {
    const {deparment = "", search = ""} = params || {};
    const {data, isLoading, error} = useSWR<IUser[]>(endpoint, fetcher)

    const filteredData = data?.filter((item) => {
      const matchDeparment = deparment ? item.department?.toLowerCase() === deparment.toLowerCase() : true;
      const fullName = `${item.firstName} ${item.lastName}`
      const matchSearch = search ? 
      fullName.toLowerCase().includes(search.toLowerCase()) || 
      item.email.toLowerCase().includes(search.toLowerCase()) : 
      true;

      return matchDeparment && matchSearch;
    })
  return {data: filteredData, isLoading, error}
}