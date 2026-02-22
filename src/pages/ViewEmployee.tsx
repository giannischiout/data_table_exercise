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

  const employee = data?.[0]
  if(!employee) {
    return (
      <div>no Employee found</div>
    )
  }
  return (
    <section className="employee_view_container" >
     
      <div className="card">
      <h2>Employee Details:</h2>
         <div>
           <span>Full Name</span>
           <p>{`${employee?.firstName} ${employee?.lastName} `}</p>
         </div>
         <div>
           <span>Hire Date </span>
           <p>{`${employee?.hireDate}`}</p>
         </div>
      </div>
    </section>
  )
}