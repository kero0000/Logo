import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './Review';
import Review from './PaymentForm';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';


const steps = ['Shipping address','Review your order', 'Payment details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
    const checkout = useSelector(state=>state.checkout);
    const activeStep = checkout.activeStep

  return (
    <>
      <Navbar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}