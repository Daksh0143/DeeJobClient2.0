import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const JobTable = ({ columns, rows, title }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
            {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="small" aria-label="dense table" >
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth || 100 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No data available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align || 'left'}>
                                            {row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default JobTable