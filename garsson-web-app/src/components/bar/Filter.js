import React from "react";
import "./Filter.css";

export default class Filter extends React.Component {

    render() {
        return (
            <div className="pt-2 pb-2">
                <div>
                    <button type="button"
                            className={"btn btn-sm " + (this.props.open ? "btn-warning" : "btn-outline-warning")}
                            onClick={() => this.props.toggle("open")}>
                        Open orders
                    </button>

                    &nbsp;

                    <button type="button"
                            className={"btn btn-sm " + (this.props.paid ? "btn-primary" : "btn-outline-primary")}
                            onClick={() => this.props.toggle("paid")}>
                        Paid orders
                    </button>

                    &nbsp;

                    <button type="button"
                            className={"btn btn-sm " + (this.props.cancelled ? "btn-primary" : "btn-outline-primary")}
                            onClick={() => this.props.toggle("cancelled")}>
                        Cancelled orders
                    </button>

                    &nbsp;

                    <button type="button"
                            className={"btn btn-sm " + (this.props.beingOrdered ? "btn-danger" : "btn-outline-danger")}
                            onClick={() => this.props.toggle("beingOrdered")}>
                        Being ordered
                    </button>
                </div>
            </div>
        )
    }
}
