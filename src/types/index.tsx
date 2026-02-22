import type { ReactNode } from "react";

export type ITable<T> = {
  data: T[];
  columns: ITableColumn<T>
}
export type ITableColumn<T> = {
  id: number;
  header: string;
  render: (row: T) => string | ReactNode;
}


export type IUser = {}