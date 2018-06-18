import React from "react";
import "./Order.css";

export default class Order extends React.Component {
    render() {
        if (this.props.order) {
            let products = this.renderProductsTable();

            return (
                <div className="card text-left">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span className="badge badge-warning float-left">{this.props.order.status}</span>
                            &nbsp; {this.props.order.customerName}
                            <button className="btn btn-outline-danger btn-sm float-right">Cancel</button>
                        </h5>

                        <p className="card-text">
                            {this.props.order.waiter}<br/>
                            created:{this.props.order.timeCreated}
                        </p>
                    </div>
                    {products}
                    <div className="card-body">
                        <button className="btn btn-dark btn-sm ">Ready at bar</button>
                        &nbsp;
                        <button className="btn btn-success btn-sm float-right">Pay</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>...</div>
            )
        }
    }

    renderProductsTable = () => {
        let productLines = this.props.order.orderLines.map(line => {
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

        let totalPriceInCents = this.props.order.orderLines
            .map(orderLine => orderLine.quantity * orderLine.productPriceInCents)
            .reduce((a, b) => a + b);

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
