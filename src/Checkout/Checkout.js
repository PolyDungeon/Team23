import React, { Component } from 'react'
import Title from '../Title';
import CheckoutColumns from './CheckoutColumns';
import EmptyCart from './EmptyCart';
import { TruckerCatelog} from '../../context';
import CheckoutList from './CheckoutList';
import CartTotals from "./CartTotals";

export default class Store extends Component {
    render() {
        return (
            <section>
                <TruckerCatelog>
                    {value => {
                        const { checkout } = value;
                        if (checkout.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="" title="My Cart" />
                                    <CheckoutColumns />
                                    <CheckoutList value={value} />
                                    <CartTotals value={value} history={this.props.history} />
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />;
                        }
                    }}
                </TruckerCatelog>
            </section>
        );
    }
}
