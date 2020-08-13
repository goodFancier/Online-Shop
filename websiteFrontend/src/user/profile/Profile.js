import React, {Component} from 'react';
import {getAllCity, getUserProfile, saveUserProfile} from '../../util/APIUtils';
import './Profile.css';
import {Form, Input, Button, notification, Icon, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const AntWrappedProfileForm = Form.create()(ProfileForm);
        return (
            <div className="login-container">
                <h1 className="page-title">Профиль</h1>
                <div className="login-content">
                    <AntWrappedProfileForm currentUser={this.props.currentUser}/>
                </div>
            </div>
        );
    }
}

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isShowEdit: true,
            city: [],
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlerCityChange = this.handlerCityChange.bind(this);
    }

    componentDidMount() {
        this.initUser();
        this.fetchCity();
    }

    initUser() {
        if (this.props.currentUser != null && this.props.currentUser.id != null) {
            getUserProfile(this.props.currentUser.id)
                .then(response => {
                    this.setState({user: response})
                });
        }
    }

    fetchCity() {
        getAllCity().then(response =>
        {
            this.setState({
                city : response,
            })
        })
    }

    handlerCityChange(event) {
        this.state.user.city = event;
    }

    handleSave(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const updateProfileRequest = Object.assign({}, values);
                saveUserProfile(updateProfileRequest)
                    .then(response => {
                        notification.success({
                            message: 'De/Li',
                            description: "Поздравляем! Изменения профиля были сохранены",
                        });
                        window.location.reload();
                    }).catch(error => {
                    {
                        notification.error({
                            message: 'De/Li',
                            description: error.message,
                        });
                        this.setState({isShowEdit: true});
                    }
                });
            }
        });

    }

    handleReset(event) {
        event.preventDefault();
        this.setState({isShowEdit: true});
    }

    handleChange(event) {
        this.setState({isShowEdit: false});
    }

    //TODO: Сделать нормальный обработчик для полей (посмотреть в signup в ветке master)

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSave} onReset={this.handleReset} className="login-form">
                    <FormItem label="Город">
                        {
                            this.state.isShowEdit ?
                                <Select
                                    disabled={true}
                                    size="large"
                                    value={this.state.user != null ? this.state.user.city : null}
                                    onChange={this.handlerCityChange}/>
                                 :
                                getFieldDecorator('city', {
                                    initialValue: this.state.user != null ? this.state.user.city : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите ваш город!'}],
                                })(
                                    <Select
                                        disabled={false}
                                        size="large"
                                        placeholder="Введите ваш город."
                                        value={this.state.user != null ? this.state.user.city : null}
                                        defaultValue={''}
                                        onChange={this.handlerCityChange}>
                                        {this.state.city.map((city) =>
                                            <Option key={city}>{city}</Option>
                                        )}
                                    </Select>
                                )
                        }
                    </FormItem>
                    <FormItem label="Фамилия">
                        {
                            this.state.isShowEdit ?
                                <Input disabled={true}
                                       size="large" value={this.state.user != null ? this.state.user.surname : null}
                                       name="surname"/> :
                                getFieldDecorator('surname', {
                                    initialValue: this.state.user != null ? this.state.user.surname : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите вашу фамилию!'}],
                                })(
                                    <Input
                                        size="large"
                                        name="surname"/>
                                )
                        }
                    </FormItem>
                    <FormItem label="Имя">
                        {
                            this.state.isShowEdit ?
                                <Input disabled={true}
                                       size="large" value={this.state.user != null ? this.state.user.name : null}
                                       name="name"/> :
                                getFieldDecorator('name', {
                                    initialValue: this.state.user != null ? this.state.user.name : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите ваше имя!'}],
                                })(
                                    <Input
                                        size="large"
                                        name="name"/>
                                )
                        }
                    </FormItem>
                    <FormItem label="Отчество">
                        {
                            this.state.isShowEdit ?
                                <Input disabled={true}
                                       size="large" value={this.state.user != null ? this.state.user.lastname : null}
                                       name="lastname"/> :
                                getFieldDecorator('lastname', {
                                    initialValue: this.state.user != null ? this.state.user.lastname : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите ваше отчество!'}],
                                })(
                                    <Input
                                        size="large"
                                        name="lastname"/>
                                )
                        }
                    </FormItem>
                    <FormItem label="Email" hasFeedback>
                        {
                            this.state.isShowEdit ? <Input disabled={true}
                                                           size="large" value={this.state.user != null ? this.state.user.email : null}
                                                           name="email" prefix={<Icon type="mail"/>}/> :
                                getFieldDecorator('email', {
                                    initialValue: this.state.user != null ? this.state.user.email : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите Ваш email!'}],
                                })(
                                    <Input
                                        size="large"
                                        name="email" prefix={<Icon type="mail"/>} onBlur={this.validateEmailAvailability}/>
                                )
                        }
                    </FormItem>
                    <FormItem label="Номер телефона">
                        {
                            this.state.isShowEdit ? <Input disabled={true}
                                                           prefix={<Icon type="phone"/>}
                                                           size="large" value={this.state.user != null ? this.state.user.phone : null}
                                                           addonBefore="+7"
                                                           name="phone" maxLength="10"
                                                           placeholder="___ _______"/> :
                                getFieldDecorator('phone', {
                                    initialValue: this.state.user != null ? this.state.user.phone : null,
                                    rules: [{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="phone"/>}
                                        size="large"
                                        addonBefore="+7"
                                        name="phone" maxLength="10"
                                        placeholder="___ _______"/>
                                )
                        }
                    </FormItem>
                    <FormItem label="Пароль">
                        {
                            this.state.isShowEdit ? <Input disabled={true}
                                                           prefix={<Icon type="lock"/>}
                                                           size="large" value={12345678}
                                                           name="password"
                                                           type="password"
                                                           placeholder="Пароль"/> :
                                getFieldDecorator('password', {
                                    //Граммотно обрабатывать пароль!
                                    initialValue: 12345678,
                                    rules: [{required: true, message: 'Пожалуйста, укажите пароль!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock"/>}
                                        size="large"
                                        name="password"
                                        type="password"
                                    />
                                )
                        }
                    </FormItem>
                    {!this.state.isShowEdit ? <div>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size="large"
                                    className="login-form-button">Сохранить</Button>
                        </FormItem>
                        <FormItem>
                            <Button htmlType="reset" size="large"
                                    className="login-form-button reset-form-button">Отмена</Button>
                        </FormItem>
                    </div> : null}
                </Form>
                {
                    this.state.isShowEdit ?
                        <Button type="primary" onClick={(e) => this.handleChange(e)} size="large"
                                className="login-form-button">Изменить</Button> : null
                }
            </div>
        );
    }
}

export default Profile;