import React, {Component} from 'react'
import OrderDesc from "./OrderDesc";
import OrderMini from "./OrderMini";

class OrderMain extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let myOrderContent;
        if (window.innerWidth > 1100)
            myOrderContent = [
                <div>
                    <h1 className="purchase-constructor-header">Мои заказы</h1>
                    <OrderDesc history={this.props.history} currentUser={this.props.currentUser}/>
                </div>
            ];
        else
            myOrderContent = [
                <div>
                    <h1 className="purchase-constructor-header">Мои заказы</h1>
                    <OrderMini history={this.props.history} currentUser={this.props.currentUser}/>
                </div>
            ];
        return (
            <div>
                {myOrderContent}
            </div>
        );
    }
}
export default OrderMain;