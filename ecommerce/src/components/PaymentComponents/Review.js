import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { setActiveStep } from '../../redux/checkoutRedux';
import { List, ListItem, ListItemText } from '@mui/material';

const calculateOrderAmount = (items) => {
  let totalCost = items.reduce(function (acc, item) { return acc + (item.price*item.quantity); }, 0)
  return totalCost;};

export default function Review() {
  const checkout = useSelector(state=>state.checkout);
  const activeStep = checkout.activeStep;
  const dispatch = useDispatch()
  const cart = useSelector(state=>state.cart.products)
  const orderProducts = cart.map(function(item){return{productId:item._id, title:item.title, quantity:item.quantity, price:item.price}})

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1))
  }


return (
  <React.Fragment>
    <Typography variant="h6" gutterBottom sx={{fontWeight: 700 }}>
      Order summary
    </Typography>
    <List disablePadding>
      {orderProducts.map((product) => (
        <ListItem key={product.productId} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={product.title} secondary={product.quantity} />
          <Typography variant="body2">${product.price}</Typography>
        </ListItem>
      ))}

      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>${calculateOrderAmount(cart)}</Typography>
      </ListItem>
    </List>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700  }}>
          Shipping
        </Typography>
        <Typography gutterBottom>Recipient:{checkout.customerName}</Typography>
        <Typography gutterBottom>Shipping Address: {checkout.address}</Typography>
      </Grid>
    </Grid>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Button 
        onClick={handleBack} 
        sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 3, ml: 1 }}>
          Next
      </Button>
    </Box>
  </React.Fragment>
);
}