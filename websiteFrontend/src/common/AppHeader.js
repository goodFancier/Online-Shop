import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import {Redirect} from 'react-router-dom'
import {Layout, Menu, Dropdown, Icon, notification} from 'antd';
import {signup} from "../util/APIUtils";
import Usermenu from "./Usermenu";
import {ACCESS_TOKEN} from "../constants";

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
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
            message: 'AskLion',
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
    }

    redirectToSignup = () => {
        this.props.history.push("/signup");
    }

    redirectToProfile = () => {
        this.props.history.push(`/users/${this.props.currentUser.username}/profile`);
    }

    redirectToProfile = () => {
        this.props.history.push(`/users/${this.props.currentUser.username}/profile`);
    }

    redirectToCatalogue = () => {
        this.props.history.push("/catalogue");
    }

    redirectToBucket = () => {
        this.props.history.push("/shopBucket");
    }


    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <div className="navbar-buttons navbar-auth-buttons">
                    <Usermenu className="usermenu btn btn-default" onLogout={this.handleLogout}
                              currentUser={this.props.currentUser}/>
                </div>,
                <button type="button" className="app-title shop-name-title btn btn-default basket-header-button"
                        onClick={this.redirectToBucket}/>
            ];
        } else {
            menuItems = [
                <div className="navbar-buttons navbar-auth-buttons">
                    <button onClick={this.redirectToLogin} type="button" className="btn btn-default">
                        <span>Войти</span>
                    </button>
                    <button id={'signup'} onClick={this.redirectToSignup} type="button" className="btn btn-default">
                        <span>Зарегистрироваться</span>
                    </button>
                </div>
            ];
        }

        return (
            <Header className="navbar">
                <div className="container">
                    <div className="app-title shop-name-title">
                        <Link to="/catalogue">Онлайн магазин</Link>
                    </div>
                    <div className="app-title header-link-margin">
                        <Link to="/offers">Акции</Link>
                    </div>
                    <div className="app-title header-link-margin">
                        <Link onClick={this.redirectToCatalogue}>Каталог товаров</Link>
                    </div>
                    {menuItems}
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);