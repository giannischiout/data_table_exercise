import { useParams } from "react-router"
import { useGetData } from "../actions/useGetData";


export default function ViewEmployee() {
  const params = useParams();
  const { data } = useGetData({
    endpoint: '/employees.json',
    params: {
      id: params.id ?? ""
    },
  })
  console.log({data})
  return (
    <div>
      {params.id}

    </div>
  )
}