import React from "react";
import "./Bar.css";
import Order from '../order/Order';
import axios from "axios";

export default class Bar extends React.Component {

    state = {
        order: undefined
    };

    componentDidMount() {
        axios.get(this.props.apiBaseUrl + "/v1/orders/2")
            .then(response => {
                this.setState({order: response.data})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="pad-2">
                <h1>Bar</h1>
                <Order order={this.state.order}/>
            </div>
        )
    }
}
