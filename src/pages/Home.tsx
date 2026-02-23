import { useEffect, type ChangeEvent, } from "react"
import { useGetData } from "../actions/useGetData"
import Table from "../components/Table"
import type { ITableColumn, IUser } from "../types"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/configure"
import { setFilters, setFiltersFromStorage } from "../store/employees"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router"
import { SearchInput, SelectInput, type IOption } from "../components/Inputs"
import { FILTERS_STORAGE_KEY } from "../config"


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
    header: 'Department',
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
      return (
        <div
        className="icon_button"  
        onClick={() => {
          actionHandlers?.onView?.(row.id.toString())
        }}>
        
        <Eye />
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

   useEffect(() => {
    try {
      const saved = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (saved) {
        dispatch(setFiltersFromStorage(JSON.parse(saved)));
      }
    } catch (e) {
      console.log(e)
    }
   
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

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
              id='department'
              name='department'
              onChange={handleFilter}
              value={filters.department}
            />
          </div>
        }
      />
    </div>
  )
}


