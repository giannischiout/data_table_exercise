import type { ChangeEvent, ChangeEventHandler } from "react"
import { useGetData } from "../actions/useGetData"
import Table from "../components/Table"
import type { ITableColumn, IUser } from "../types"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/configure"
import { setFilters } from "../store/employees"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router"

const DEPARTMENTS: IOption[] = [
  { label: '', value: '' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'human resources' },
  { label: 'Finance', value: 'finance' },
  { label: 'Operations', value: 'operations' },
  { label: 'Customer Support', value: 'customer support' },
]

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
  },
  {
    id: 4,
    header: 'Status',
    render: (row) => <>{row.status}</>
  },
  {
    id: 5,
    header: 'Actions',
    render: (row, actionHandlers) => {
      console.log({actionHandlers})
      return (
        <div>
        <div onClick={() => {
          actionHandlers?.onView?.(row.id.toString())
        }}>
        <Eye />
        </div>
      </div>
      )
    }
  }
]

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.employees)

  const handleFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch(setFilters({ name, value }))
  }

  const { data } = useGetData({
    endpoint: '/employees.json',
    params: filters,
  })

  const actionHandlers = {
    onView: (id: string) => {
      navigate(`/employee/${id}`)
    }
  }
  return (
    <div>
      <Table
        getKey={(row) => row.id.toString()}
        data={data || []}
        columns={COLUMNS}
        actionHandlers={actionHandlers}
        toolbar={
          <div className="employees_toolbar">
            <SearchInput
              name="search"
              id="search"
              value={filters.search}
              onChange={handleFilter}
              placeholder="Search by name or email"
            />
            <SelectInput
              options={DEPARTMENTS}
              id='deparment'
              name='deparment'
              onChange={handleFilter}
              value={filters.deparment}
            />
          </div>
        }
      />
    </div>
  )
}


export type IOption = {
  label: string;
  value: string | number;
}

export type ISelect = {
  options: IOption[];
  name: string;
  id: string;
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: string;
  placeholder?: string;
}
export function SelectInput({
  onChange,
  value,
  options,
  name,
  id,
  placeholder = "Select an option"
}: ISelect) {
  return (
    <div className="input_wrapper">
      <select
        value={value}
        onChange={onChange}
        id={id} name={name}>
        {options.map((option) => (
          <option value={option.value || ""}>{option.label || placeholder}</option>
        ))}
      </select>
    </div>
  )
}


type ISearchInput = {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string;
  name: string;
  id: string;
  placeholder?: string;
}
export function SearchInput({
  onChange,
  placeholder,
  value,
  name,
  id
}: ISearchInput) {
  return (
    <div>
      <input
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}