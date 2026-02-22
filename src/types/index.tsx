import type { ReactNode } from "react";

export type ActionHandlers = {
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export type ITable<T> = {
  data: T[];
  columns: ITableColumn<T>[];
  toolbar?: ReactNode;
  getKey: (row: T) => string;
  actionHandlers?: ActionHandlers

}
export type ITableColumn<T> = {
  id: number;
  header: string;
  render: (row: T, actionHandlers?: ActionHandlers ) => string | ReactNode;
  align?: 'left' | 'right' | 'center'
}




export type UserStatus = 'Active' | 'Inactive' | 'On Leave' | 'Pending' | 'Terminated';

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  status: UserStatus;
}