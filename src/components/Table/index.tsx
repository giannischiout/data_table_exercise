

import { Table as MuiTable, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import type { ITable } from '../../types';
import styles from './style.module.scss'
export default function Table<T>({
  actionHandlers,
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
              <TableCell sx={{color: 'var(--color-primary)', fontWeight: 'bold'}} align={col?.align || 'left'} key={col.id}>{col.header}</TableCell>
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
                  key={col.id}
                  component="th"
                  scope="row">
                  {col.render(item, actionHandlers)}
                </TableCell>
              ))}
             
            </TableRow>
          )): (
            <TableRow sx={{
              padding: '10px'
            }}>
              <TableCell>There is no data to show</TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </div>
  );
}