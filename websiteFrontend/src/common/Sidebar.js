import React, {Component} from 'react';
import {push as Menu} from 'react-burger-menu'
import './Sidebar.css'
import {withRouter} from "react-router-dom";
import {Avatar, notification} from "antd";

function getFio(surname, name, lastname) {
    if (surname && name && lastname)
        return surname.charAt(0).toUpperCase() + surname.slice(1) + ' ' + name.charAt(0).toUpperCase() + '. ' + lastname.charAt(0).toUpperCase() + '.';
    else
        return "Пользователь"
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    redirectToLogin = () => {
        this.closeMenu();
        this.props.history.push("/login");
    };

    redirectToCatalogue = () => {
        this.closeMenu();
        this.props.history.push("/retailers");
    };

    redirectToProfile = () => {
        this.closeMenu();
        if (this.props.currentUser != null)
            this.props.history.push(`/users/${this.props.currentUser.id}/profile`);
        else {
            notification.error({
                message: 'De/Li',
                description: 'Необходимо выполнить вход в личный кабинет!'
            });
            this.redirectToLogin();
        }
    };

    redirectToBucket = () => {
        this.closeMenu();
        if (this.props.currentUser != null)
            this.props.history.push("/shopBucket");
        else {
            notification.error({
                message: 'De/Li',
                description: 'Необходимо выполнить вход в личный кабинет!'
            });
            this.redirectToLogin();
        }
    };

    redirectToMyOrder = () => {
        this.closeMenu();
        if (this.props.currentUser != null)
            this.props.history.push("/order/orderList");
        else {
            notification.error({
                message: 'De/Li',
                description: 'Необходимо выполнить вход в личный кабинет!'
            });
            this.redirectToLogin();
        }
    };

    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen})
    }

    closeMenu() {
        this.setState({menuOpen: false})
    }


    redirectToRetailers() {
        this.closeMenu();
        this.props.history.push("/retailers");
    };

    render() {
        let sidebarHeader;


        if (this.props.currentUser) {
            let name = getFio(this.props.currentUser.surname, this.props.currentUser.name, this.props.currentUser.lastname);
            sidebarHeader = [
                <div className="sidebar-header">
                    <Avatar size={64} className="sidebar-avatar">
                        {name}
                    </Avatar>
                    <div className="sidebar-auth-main">
                        <div className="sidebar-auth-header">
                            {name}
                        </div>
                        <a className="sidebar-logout-btn" onClick={(e) => this.props.onLogout()}>
                            Выйти
                        </a>
                    </div>
                </div>
            ];
        } else {
            sidebarHeader = [
                <div className="sidebar-header">
                    <button type="button" className="shop-name-title btn btn-default sidebar-login-btn"
                            onClick={this.redirectToLogin}/>
                    <div className="sidebar-auth-main">
                        <div className="sidebar-auth-header"
                             onClick={(e) => this.redirectToLogin()}>
                            Войдите
                        </div>
                        <div className="sidebar-auth-desc"
                             onClick={(e) => this.redirectToLogin()}>
                            и заказывайте доставку <br/> товаров прямо сейчас
                        </div>
                    </div>
                </div>
            ];
        }
        return (
            <Menu burgerBarClassName={"burger-btn-icon"} disableAutoFocus={true} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                {sidebarHeader}
                <div className="sidebar-main">
                    <a id="catalogue" className="menu-item" onClick={(e) => this.redirectToCatalogue()}>
                        <div><span title="Главная"/>Магазины</div>
                    </a>
                    <a id="about" className="menu-item" onClick={(e) => this.redirectToBucket()}>
                        <div><span title="Корзина"/>Корзина</div>
                    </a>
                    <a id="about" className="menu-item" onClick={(e) => this.redirectToMyOrder()}>
                        <div><span title="Мои заказы"/>Мои заказы</div>
                    </a>
                    <a id="profile" className="menu-item" onClick={(e) => this.redirectToProfile()}>
                        <div><span title="Профиль"/>Профиль</div>
                    </a>
                </div>
            </Menu>
        );
    }
}

export default withRouter(Sidebar);