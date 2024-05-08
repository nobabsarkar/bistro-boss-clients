import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

// TODO: add publishshable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please Payment First"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;