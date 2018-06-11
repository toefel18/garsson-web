import React from "react";
import "./Bar.css";
import OpenOrder from '../order/OpenOrder';

export default class Bar extends React.Component {
    render() {
        return (
            <div className="pad-2">
                <h1>Bar</h1>
                <OpenOrder />
            </div>
        )
    }
}
