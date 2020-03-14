import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Войти в аккаунт</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
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
                    if(error.status === 401) {
                        notification.error({
                            message: 'Online shop',
                            description: 'Ваш логин или пароль введен неправильно. Пожалуйста, попробуйте ещё раз!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Online shop',
                            description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Пожалуйста, введите ваш логин или email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Логин или Email" />
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Пожалуйста, введите ваш пароль!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Пароль"  />
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Войти</Button>
                    Или <Link to="/signup">зарегистрируйтесь сейчас!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;