import useSWR from "swr";
import type {IUser} from "../types/";

type Params = {
  department?: string;
  search?: string;
  id?: string;
}
type Props = {
  endpoint: string;
  params?: Params; 

}



const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useGetData({endpoint, params}: Props) {
    const {department = " ", search = "", id} = params || {};
    const {data, isLoading, error} = useSWR<IUser[]>(endpoint, fetcher)

    const filteredData = data?.filter((item) => {
      // if we provide ID when we go to the view page, skip the rest:
      if(id) {
        return item.id.toString() === id.trim()
      }
      const matchDepartment = department ? item.department?.toLowerCase() === department.toLowerCase() : true;
      const fullName = `${item.firstName} ${item.lastName}`
      const matchSearch = search ? 
      fullName.toLowerCase().includes(search.toLowerCase()) || 
      item.email.toLowerCase().includes(search.toLowerCase()) : 
      true;
  
     
      return matchDepartment && matchSearch 
    })
  return {data: filteredData, isLoading, error}
}