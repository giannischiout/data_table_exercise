import { useGetData } from "../actions/useGetData"

export default function HomePage() {

  const {data}= useGetData({endpoint: '/employees.json'})
  console.log({data})
  return (
    <div>test</div>
  )
}