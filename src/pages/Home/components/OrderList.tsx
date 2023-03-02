import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Order } from "../../../interfaces/order";

interface Props {
  orders: Order[] | null;
}

const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <Grid container spacing={2}>
      {orders?.map((order) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={order.orderId}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{order.symbol}</Typography>
              <Typography variant="body1">
                Order ID: {order.orderId}
              </Typography>
              <Typography variant="body1">
                Status: {order.status}
              </Typography>
              <Typography variant="body1">
                Type: {order.type} - Side: {order.side}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderList;
