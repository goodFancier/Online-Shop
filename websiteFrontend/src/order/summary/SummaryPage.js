import React, {Component} from 'react';
import {Avatar, Row, Tabs} from 'antd';
import './SummaryPage.css';
import {withRouter} from "react-router-dom";
import {getUserProfile} from "../../util/APIUtils";

const TabPane = Tabs.TabPane;

class SummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.initUser();
    }

    initUser() {
        if (this.props.currentUser != null && this.props.currentUser.id != null) {
            getUserProfile(this.props.currentUser.id)
                .then(response => {
                    this.setState({user: response})
                });
        }
    }


    render() {
        return (
            <div>
                <h1 className="order-summary-header">Спасибо за заказ</h1>
                <h2 className="order-summary-header-n1">
                    Ваш заказ был создан
                </h2>
                <div className="order-summary-text">
                    {this.state.user != null ? this.state.user.name == null ? "Уважаемый пользователь" : this.state.user.name : null}, уведомления о статусе заказа вы будете получать
                    в SMS на номер +7 {this.state.user != null ? this.state.user.phone : null}
                    <pre/>
                    Информация о всех заказах размещена в разделе "Мои заказы".
                </div>
            </div>
        );
    }
}

export default withRouter(SummaryPage);