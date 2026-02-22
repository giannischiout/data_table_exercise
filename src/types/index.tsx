import type { ReactNode } from "react";

export type ITable<T> = {
  data: T[];
  columns: ITableColumn<T>[];
  toolbar?: ReactNode;
  getKey: (row: T) => string;

}
export type ITableColumn<T> = {
  id: number;
  header: string;
  render: (row: T) => string | ReactNode;
  align?: 'left' | 'right' | 'center'
}




export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}