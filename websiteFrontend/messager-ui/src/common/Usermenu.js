import React, {Component} from 'react';
import './Usermenu.css'
import 'antd/dist/antd.css';
import {Menu, Dropdown, Icon, notification} from 'antd';
import {Route, withRouter, Redirect} from "react-router-dom";



class Usermenu extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
        if (key === "profile") {
            this.props.history.push(`/users/${this.props.currentUser.username}/profile`);
        }
    }

    //TODO: Сделать кастомные картинки, а не задавать их жестко в коде
    render() {
       return <UserDropdownMenu
            currentUser={this.props.currentUser}
            handleMenuClick={this.handleMenuClick}/>
    }
 }

function UserDropdownMenu(props) {
    const menu = (
        <Menu onClick={props.handleMenuClick}>
            <Menu.Item key="profile">Профиль</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">Выйти</Menu.Item>
        </Menu>
    );
    if (props.currentUser != undefined)
    return (
        <Dropdown overlay={menu} trigger={['click']} className="usermenu">
            <a className="ant-dropdown-link" href="#">
                {props.currentUser.username} <Icon type="down"/>
            </a>
        </Dropdown>
    );
    else
        return (
            <Dropdown overlay={menu} trigger={['click']} className="usermenu">
                <a className="ant-dropdown-link" href="#">
                     <Icon type="down"/>
                </a>
            </Dropdown>
        );
}

export default withRouter(Usermenu);