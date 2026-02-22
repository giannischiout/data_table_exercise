import { useParams } from "react-router"

export default function ViewEmployee() {
  const params = useParams();
  console.log({params})
  return (
    <div>
      {}
    </div>
  )
}