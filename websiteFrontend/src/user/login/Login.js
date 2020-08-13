import React, {Component} from 'react';
import {login} from '../../util/APIUtils';
import './Login.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../constants';
import logo from '../../resources/site-logo.jpg';

import {Form, Input, Button, Icon, notification} from 'antd';

const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <div>
                    <img alt="Logo" src={logo} className="site-main-logo"/>
                </div>
                <h1 className="page-title">Вход или регистрация</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                    if (error.status === 401) {
                        notification.error({
                            message: 'De/Li',
                            description: 'Ваш номер или пароль введен неправильно. Пожалуйста, попробуйте ещё раз!'
                        });
                    } else {
                        notification.error({
                            message: 'De/Li',
                            description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem label="Номер телефона">
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}],
                    })(
                        <Input
                            prefix={<Icon type="phone"/>}
                            size="large" addonBefore="+7"
                            name="phone" maxLength="10"
                            placeholder="___ _______"/>
                    )}
                </FormItem>
                <FormItem label="Пароль">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Пожалуйста, введите ваш пароль!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock"/>}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Пароль"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Войти</Button>
                    Или <Link to="/signup">войдите с помощью кода из SMS!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;