import React from "react";
import "./NewOrder.css";
import {withRouter} from 'react-router-dom'


// TODO remove, example how to navigate using browser history
const CreateNewOrderButton = withRouter(({history}) => (
    <button type="button" className="btn btn-primary" onClick={() => {
        history.push('new')
    }}>
        Create new order
    </button>
));

export default class NewOrder extends React.Component {

    state = {
        customerName: "",
        created: "",
        lines: [],

    };

    render() {
        let products = this.renderProductsTable();
        let addNewProduct = this.renderAddNewProduct();
        return (
            <div className="card text-left mw-100 w-75 ">
                <div className="card-body">
                    <h5 className="card-title">
                        <span className="badge badge-warning float-left">Being ordered</span>
                        &nbsp; {this.state.customerName}
                    </h5>

                    <p className="card-text">
                        {this.props.user.email}<br/>
                        created:{this.state.created}
                    </p>
                </div>
                {addNewProduct}
                {products}
                <div className="card-body">
                    <button className="btn btn-success btn-sm float-right">Submit for preparation</button>
                </div>
            </div>
        )
    }

    renderAddNewProduct = () => {
        return (<button className="btn btn-primary">
            <i className="fa fa-plus" />
            Add
        </button>)
    };

    renderProductsTable = () => {
        let productLines = this.state.lines.map(line => {
            let price = (line.quantity * line.productPriceInCents) / 100.0;
            return (
                <tr key={line.productBrand + line.productName}>
                    <td>&nbsp;&nbsp;{line.quantity}</td>
                    <td>{line.productBrand} {line.productName}</td>
                    <td className="text-right">&euro;</td>
                    <td className="text-left">{price}</td>
                </tr>
            );
        });

        let totalPriceInCents = 0;
        if (this.state.lines.length > 0) {
            this.state.lines
                .map(orderLine => orderLine.quantity * orderLine.productPriceInCents)
                .reduce((a, b) => a + b);
        }

        let totalPrice = totalPriceInCents / 100.0;

        let totalLine = (
            <tr key="total" className="font-weight-bold">
                <td/>
                <td>Total</td>
                <td className="text-right">&euro;</td>
                <td className="text-left">{totalPrice}</td>
            </tr>);

        return <table className="table table-sm">
            <tbody>{productLines}{totalLine}</tbody>
        </table>;
    };

}
