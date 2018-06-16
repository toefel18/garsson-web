import React from "react";
import "./Bar.css";
import Order from '../order/Order';
import Filter from './Filter';
import axios from "axios";

export default class Bar extends React.Component {

    state = {
        orders: undefined,

        filters: {
            open: true,
            paid: false,
            cancelled: false,
            beingOrdered: false
        }
    };

    componentDidUpdate() {
        this.fetchOrders();
    }

    componentWillMount() {
        this.fetchOrders();
    }

    toggle = (status) => {
        if (this.state.filters[status] === undefined) {
            alert("item " + status + " is not a configurable filter, report a bug!");
        } else {
            // this construct is to use a dynamic key in a status update
            let stateChange = {filters: this.state.filters};
            stateChange["filters"][status] = !this.state.filters[status];
            this.setState(stateChange, () => this.fetchOrders(true));
        }
    };

    fetchOrders = (force) => {
        if ((!this.state.orders || force) && this.props.apiBaseUrl) {
            let filters = Object.keys(this.state.filters)
                .filter(filterName => this.state.filters[filterName]) //only retains filters that are true
                .map(filterName => "status=" + filterName)
                .join("&");

            if (filters) {
                axios.get(this.props.apiBaseUrl + "/v1/orders?" + filters)
                    .then(response => this.setState({orders: response.data}))
                    .catch(error => console.log(error))
            } else {
                this.setState({orders: []})
            }
        }
    };

    render() {
        let orders = this.state.orders ? this.state.orders.map(order => <Order key={order.id} order={order}/>) : "";

        return (
            <div className="container-fluid text-left">
                <Filter toggle={this.toggle} {...this.state.filters} />
                <div className="card-columns">
                    {orders}
                </div>
            </div>
        )
    }
}
