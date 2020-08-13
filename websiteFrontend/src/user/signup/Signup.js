import React, {Component} from 'react';
import {signup} from '../../util/APIUtils';
import {requestSmsCode} from '../../util/APIUtils';
import './Signup.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../constants';

import {Form, Input, Button, notification, Icon} from 'antd';
import Timer from "../../common/TImer";
import logo from "../../resources/site-logo.jpg";

const FormItem = Form.Item;

class Signup extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <div>
                    <img alt="Logo" src={logo} className="site-main-logo"/>
                </div>
                <h1 className="page-title">Вход или регистрация</h1>
                <div className="login-content">
                    <AntWrappedLoginForm history={this.props.history} onLogin={this.props.onLogin}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.requestCodeAgain = this.requestCodeAgain.bind(this);
        this.state = {
            showSmsLayout: false,
            smsCode: '',
            phone: null
        };
    }

    handleChange(event) {
        this.setState({smsCode: event.target.value}, this.checkSmsCode);
    }

    checkSmsCode() {
        if (this.state.smsCode.length >= 4) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const signupRequest = Object.assign({}, values);
                    signup(signupRequest)
                        .then(response => {
                            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                            this.redirectToProfile(response.userResponse.id);
                        }).catch(error => {
                        notification.error({
                            message: 'De/Li',
                            description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
                        });
                    });
                }
            });
        }
    }

    redirectToProfile = (userId) => {
        this.props.history.push(`/users/${userId}/profile`);
        window.location.reload();
    };

    requestCodeAgain(event, phone) {
        event.preventDefault();
        requestSmsCode({phone: this.state.phone})
            .then().catch(error => {
            notification.error({
                message: 'De/Li',
                description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
            });
        });
        this.setState({showSmsLayout: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const smsRequest = Object.assign({}, values);
                requestSmsCode(smsRequest)
                    .then().catch(error => {
                    notification.error({
                        message: 'De/Li',
                        description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
                    });
                });
                this.setState({showSmsLayout: true, phone: smsRequest.phone});
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
                {
                    this.state.showSmsLayout ? <FormItem id="smsCodeLayout" label="Код из SMS">
                        {getFieldDecorator('smsCode', {
                            rules: [{required: true, message: 'Укажите код из SMS!'}],
                        })(
                            <Input onChange={this.handleChange}
                                   size="large"
                                   name="smsCode" value={this.state.smsCode.value}
                            />
                        )}
                        <Timer phone={this.state.phone}/>
                    </FormItem> : <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Получить код из SMS</Button>
                    </FormItem>
                }

                Или <Link to="/login">войдите с помощью пароля!</Link>
            </Form>
        );
    }
}

export default Signup;