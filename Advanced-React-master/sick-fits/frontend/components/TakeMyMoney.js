import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

  const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token ) {
            id
            charge
            total 
            items {
                id
                title
            }
        }
    }
  `;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
    onToken =  (res, createOrder) => {
        console.log('On Token Called!');
        console.log(res.id); 
        // manually call the muatation once we have the stripe token
        createOrder({
            variables: {
                token: res.id,
            },
        }).catch(err => {
            alert(err.message);
        });
    };

    render() {
        return (
            <User>
                {({ data: { me }}) => (
                    <Mutation mutation={CREATE_ORDER_MUTATION} 
                    refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                        {(createOrder) => (

                    <StripeCheckout
                    amount={calcTotalPrice(me.cart)}
                    name="Mo Bamba"
                    description={`order of ${totalItems(me.cart)} items!`}
                    image={me.cart[0].item && me.cart[0].item.image}
                    stripeKey="pk_test_T0Rche2Q2BMKq2YnqfwwlmkG"
                    currency="USD"
                    email={me.email}
                    token={res => this.onToken(res, createOrder)}>
                            {this.props.childern}
                        </StripeCheckout>
                    )}
                </Mutation>
                )}
            </User>
        );
        
    }
}

export default TakeMyMoney;