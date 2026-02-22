import { useGetData } from "../actions/useGetData"
import Table from "../components/Table"
import type { ITableColumn, IUser } from "../types"


const COLUMNS: ITableColumn<IUser>[] = [
  {
    id: 1,
    header: 'Full Name',
    render: (row) => <>{`${row.firstName} ${row.lastName}`}</>
  },
  {
    id: 2,
    header: 'Email',
    render: (row) => <>{row.email}</>
  },
  {
    id: 3,
    header: 'Deparment',
    render: (row) => <>{row.department}</>
  }
]

export default function HomePage() {

  const { data } = useGetData({
    endpoint: '/employees.json',
    params: {
      search: 'test',
      deparment: ''
    }
  })
  return (
    <div>
      <Table
        getKey={(row) => row.id.toString()}
        data={data || []}
        columns={COLUMNS}
        toolbar={
          <>
            test
          </>
        }
      />
    </div>
  )
}