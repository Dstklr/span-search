import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Span } from '../models/Span';
import { useState } from 'react';
import { NoResults } from './NoResults';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface SpanTableProps {
  data: Span[];
}

export const SpanTable = ({ data }: SpanTableProps) => {
  const navigate = useNavigate();

  const onRowClickHandler = (id: string) => navigate(`/span/${id}`);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Span Id</StyledTableCell>
            <StyledTableCell align="center">Parent Span Id</StyledTableCell>
            <StyledTableCell align="center">Operation Name</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">Duration</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow onClick={() => onRowClickHandler(row.spanId)} hover key={row.spanId.toString()}>
              <StyledTableCell align="center">
                {row.spanId}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.parentSpanId}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.operationName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.startTime.toString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.duration}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
