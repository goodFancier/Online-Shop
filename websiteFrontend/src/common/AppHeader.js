import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import {Layout, notification} from 'antd';
import {signup} from "../util/APIUtils";
import Usermenu from "./Usermenu";
import {ACCESS_TOKEN} from "../constants";
import {Input} from 'antd';

const {Search} = Input;

const Header = Layout.Header;

function getFio(surname, name, lastname) {
    if (surname && name && lastname)
        return surname.charAt(0).toUpperCase() + surname.slice(1) + ' ' + name.charAt(0).toUpperCase() + '. ' + lastname.charAt(0).toUpperCase() + '.';
    else
        return "Пользователь";
}

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            seconds: 1,
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
        this.props.history.push(redirectTo);
        window.location.reload();
        notification[notificationType]({
            message: 'De/Li',
            description: description,
        });
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    redirectToLogin = () => {
        this.props.history.push("/login");
    };

    // redirectToSignup = () => {
    //     this.props.history.push("/signup");
    // };

    redirectToBucket = () => {
        this.props.history.push("/shopBucket");
    };


    filterGoodsBySearch(filterValue) {
        return this.props.filterGoodsBySearch(filterValue);
    }

    startKeyUpTimer(filterValue) {
        clearInterval(this.myInterval);
        this.setState({seconds: 1});
        this.myInterval = setInterval(() => {
            const {seconds} = this.state;
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                this.filterGoodsBySearch(filterValue);
                clearInterval(this.myInterval);
            }
        }, 500);
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            this.props.currentUser.username = getFio(this.props.currentUser.surname, this.props.currentUser.name, this.props.currentUser.lastname);
            menuItems = [
                <button type="button" className="app-title shop-name-title btn btn-default basket-header-button"
                        onClick={this.redirectToBucket}/>
                ,
                <div className="navbar-buttons navbar-auth-buttons usermenu-label">
                    <Usermenu className="usermenu btn btn-default" onLogout={this.handleLogout}
                              currentUser={this.props.currentUser}/>
                </div>,
                <div>
                    {
                        this.props.location.pathname.includes("catalogue") ?
                            <Search className="search-desc"
                                    onChange={value => this.startKeyUpTimer(value.target.value)}
                                    placeholder="Поиск товаров"
                                    style={{width: 200}}
                            /> : null
                    }
                </div>
            ];
        } else {
            menuItems = [
                <div className="navbar-buttons navbar-auth-buttons">
                    <button id={'signup'} onClick={this.redirectToLogin} type="button" className="btn btn-default login-or-register-btn">
                        <span>Войти или зарегистрироваться</span>
                    </button>
                </div>,
                <div>
                    {
                        this.props.location.pathname.includes("catalogue") ?
                            <Search className="search-desc"
                                    placeholder="Поиск товаров"
                                    onChange={value => this.startKeyUpTimer(value.target.value)}
                                    style={{width: 200}}
                            /> : null}
                </div>
            ];
        }

        return (
            getHeaderMenu(menuItems, this, this.props.currentUser)
        );
    }
}

function getHeaderMenu(menuItems, obj, currentUser) {
    let headerMenu;
    if (window.innerWidth < 800) {
        headerMenu = [
            <div className="mini-screen-header-content">
                <div className="app-title shop-name-title shop-name-narrow">
                    <Link to="/retailers">De/Li</Link>
                </div>
                ,
                <div className="bucket-icon-right">
                    <Link to={"/shopBucket"}>
                        <div className="app-title shop-name-title btn btn-default basket-header-button"/>
                    </Link>
                </div>,
                <div>
                    {
                        obj.props.location.pathname.includes("catalogue") ?
                            <Search className="search-mini"
                                    placeholder="Поиск товаров"
                                    onChange={value => obj.startKeyUpTimer(value.target.value)}
                                    style={{width: 200}}

                            /> : null}
                </div>
            </div>
        ];
    } else {
        if (currentUser) {
            headerMenu = [<div className="header-container">
                <div className="app-title shop-name-title">
                    <Link to="/retailers">De/Li</Link>
                </div>
                <div className="app-title header-link-margin">
                    <Link to="/retailers">Магазины</Link>
                </div>
                <div className="app-title header-link-margin">
                    <Link to="/order/orderList">Мои заказы</Link>
                </div>
                {menuItems}
            </div>];
        } else {
            headerMenu = [<div className="header-container">
                <div className="app-title shop-name-title">
                    <Link to="/retailers">De/Li</Link>
                </div>
                <div className="app-title header-link-margin">
                    <Link to="/retailers">Магазины</Link>
                </div>
                {menuItems}
            </div>];
        }
    }
    return (
        <Header className="navbar">
            {headerMenu}
        </Header>
    );
}

export default withRouter(AppHeader);