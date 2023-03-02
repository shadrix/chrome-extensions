import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AccountInfo } from "../../../interfaces/accountInfo";

interface BalancesTableProps {
  accountInfo: AccountInfo | null;
}

function BalancesTable(props: BalancesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.accountInfo?.balances
            .filter((balance) => Number(balance.free) > 0)
            .map((balance, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {balance.asset}
                </TableCell>
                <TableCell align="right">{balance.free}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BalancesTable;
