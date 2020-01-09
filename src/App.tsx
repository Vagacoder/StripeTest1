import React from 'react';

// import Stripe from 'stripe';
import StripeClient from 'stripe-client';

import { CardElement, injectStripe } from 'react-stripe-elements';

const App = (props: any) => {

  // var stripe = new Stripe('sk_test_4pMoteZlghtyL3swuIT4w8NP002zgcHGJ7');
  var stripe = new StripeClient('pk_test_s7ayxYHzVNMonJu8LVj7A10u00yomvgJBQ');

  var charge = {
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com',
  };

  // const onCharge = async () => {
  //   console.log('clicked');
  //   let response = await stripe.charges.create(charge);
  //   console.log('response', response);

  // };

  var cardInfo = {
    card: {
      number: '4242424242424242',
      exp_month: '02',
      exp_year: '21',
      cvc: '999',
      name: 'Billy Joe'
    }
  };

  const onCreditToken = () => {
    console.log('clicked on credit');
    stripe.createToken(cardInfo)
      .then((resp: any) => {
        return resp.text();
      })
      .then((text: any) => {
        let resJson = JSON.parse(text);
        console.log(resJson);
        setState(JSON.stringify(resJson));
        return resJson;
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  var bankInfo = {
    bank_account: {
      country: 'US',
      currency: 'usd',
      account_holder_name: 'Noah Martinez',
      account_holder_type: 'individual',
      routing_number: '110000000',
      account_number: '000123456789'
    }
  };

  const onBankToken = async () => {
    console.log('clicked on bank');
    stripe.createToken(bankInfo).then((res: any) => {
      return res.text();
    })
      .then((text: any) => {
        let resJson = JSON.parse(text);
        console.log(resJson);
        setState(JSON.stringify(resJson));
        return resJson;
      }).catch((e: any) => {
        console.log(e);
      })
  };

  var userInfo = {
    pii: {
      personal_id_number: '0000000001'
    }
  };

  const onUserToken = () => {
    stripe.createToken(userInfo).then((resp: any) => {
      return resp.text();
    }).then((text: any) => {
      let resJson = JSON.parse(text);
      console.log(resJson);
      setState(JSON.stringify(resJson));
      return resJson;
    }).catch((e: any) => {
      console.log(e);
    })
  }

  const [state, setState] = React.useState("");
  return (
    <div>
      <h4>1. Testing Create Tokens</h4>
      {/* <button onClick={onCharge}>Create Create Card Token</button> */}
      <button onClick={onCreditToken}>Create a Credit Card Token</button>
      <button onClick={onBankToken}>Create a Bank Token</button>
      <button onClick={onUserToken}>Create a User Token</button>
      <div>
        <h6>Information of token</h6>
        <p>{state}</p>
      </div>
      <h4>2. Testing </h4>
    </div>
  );
}

export default App;