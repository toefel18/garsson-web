import React from "react";
import "./Order.css";

export default class Order extends React.Component {
    render() {
        if (this.props.order) {

            let products = this.props.order.orderLines.map(line => {
                let price = (line.quantity * line.productPriceInCents) / 100.0;
                return (<li className="list-group-item">{line.quantity} x {line.productBrand} {line.productName} = &euro;{price}</li>);
            });


            return (
                <div className="row justify-content-md-center">
                    <div className="card col-sm-3">
                        {/*<img className="card-img-top" src="blaat.jpg" alt="Card image cap"/>*/}
                        <div className="card-body">
                            <h5 className="card-title">{this.props.order.customerName}</h5>
                            <span className="label label-warning">{this.props.order.status}</span>
                            <p className="card-text">
                                {this.props.order.waiter}<br />
                                created:{this.props.order.timeCreated}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {products}
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>no order set</div>
            )
        }
    }
}
