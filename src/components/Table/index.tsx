

import { Table as MuiTable, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import type { ITable } from '../../types';
import styles from './style.module.scss'
export default function Table<T>({
  data,
  columns,
  toolbar,
  getKey,
}: ITable<T>) {
  return (  
    <div className={styles.container}>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell align={col?.align || 'left'} key={col.id}>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((item) => (
            <TableRow
              key={getKey(item)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((col) => (
                <TableCell
                  component="th"
                  scope="row">
                  {col.render(item)}
                </TableCell>
              ))}
             
            </TableRow>
          )): (
            <div>
              There is no data to show
            </div>
          )}
        </TableBody>
      </MuiTable>
    </div>
  );
}