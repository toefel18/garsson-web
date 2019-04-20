import React from "react";
import "./Order.css";

export default class Order extends React.Component {
    render() {
        if (this.props.order) {
            const products = this.renderProductsTable();

            return (
                <div className="card text-left">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span className="badge badge-warning float-left">{this.props.order.status}</span>
                            &nbsp; {this.props.order.customerName}
                            <button className="btn btn-outline-danger btn-sm float-right">Cancel</button>
                        </h5>

                        <p className="card-text">
                            {this.props.order.waiterId}<br/>
                            created:{this.props.order.createdTime}
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
        const productLines = this.props.order.orderLines.map(line => {
            const price = (line.quantity * line.product.productPrice);
            return (
                <tr key={line.product.productId}>
                    <td>&nbsp;&nbsp;{line.quantity}</td>
                    <td>{line.product.productId}</td>
                    <td className="text-right">&euro;</td>
                    <td className="text-left">{price}</td>
                </tr>
            );
        });

        const totalPrice = this.props.order.totalPrice;

        const totalLine = (
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
