import React, {Component} from 'react'
import './PurchaseConstructor.css';
import '../bucket/Bucket.css';
import {Button, Card, Col, Form, Icon, Input, List, notification, Row, Modal} from "antd";
import {
    deleteFromUserBucket,
    getUserBucketGoods,
    getUserProfile,
    createOrder,
    getDeliveryPrice,
    setGoodQuantity,
    saveUserProfile, saveCity
} from "../../util/APIUtils";
import {Menu} from 'antd';
import {MinusCircleOutlined, PlusCircleFilled} from "@ant-design/icons";
import {Redirect} from "react-router-dom";

const {SubMenu} = Menu;
const FormItem = Form.Item;

function getFio(surname, name, lastname) {
    if (surname && name && lastname)
        return surname.charAt(0).toUpperCase() + surname.slice(1) + ' ' + name.charAt(0).toUpperCase() + name.slice(1) + ' ' + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    else
        return "Пользователь";
}

class PurchaseConstructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            goodList: null
        }
    }

    componentDidMount() {
        this.initGoodList();
        this.initUser();
    }

    initGoodList() {
        getUserBucketGoods()
            .then(response => {
                this.setState({goodList: response});
            });
    }


    initUser() {
        if (this.props.currentUser != null && this.props.currentUser.id != null) {
            getUserProfile(this.props.currentUser.id)
                .then(response => {
                    this.setState({user: response})
                });
        }
    }

    isVisibleWarningModal() {
        return this.state.user != null && this.state.goodList != null && this.state.user.city !== this.state.goodList[0].city;
    }

    render() {
        const cityGood = this.state.goodList != null ? this.state.goodList[0].city : null;
        const AntWrappedSmallPurchaseForm = Form.create()(PurchaseSmallConstructorForm);
        const AntWrappedPurchaseForm = Form.create()(PurchaseConstructorForm);
        let purchaseContent;
        if (window.innerWidth > 1100)
            purchaseContent = [
                <div>
                    <h1 className="purchase-constructor-header">Оформление заказа</h1>
                    <h2 className="purchase-constructor-header_n1">
                        Укажите данные получателя заказа
                    </h2>
                    <AntWrappedPurchaseForm history={this.props.history} currentUser={this.props.currentUser}/>
                </div>
            ];
        else
            purchaseContent = [
                <div>
                    <h1 className="purchase-constructor-header">Оформление заказа</h1>
                    <h2 className="purchase-constructor-header_n1">
                        Укажите данные получателя заказа
                    </h2>
                    <AntWrappedSmallPurchaseForm history={this.props.history} currentUser={this.props.currentUser}/>
                </div>
            ];
        return (
            <div>
                {purchaseContent}
                {this.isVisibleWarningModal() ?
                    <Modal
                        title="De/Li"
                        centered
                        cancelText="Отменить заказ"
                        okText="Да" visible={true}
                        onOk={() => {
                            this.state.user.city = cityGood;
                            saveCity(this.state.user.city).then(r => {
                                this.props.history.push(`/purchaseConstructor`)
                            });
                        }}
                        onCancel={() => this.props.history.push(`/retailers`)}
                    >
                        Вы делаете заказ в магазине из другого города. Изменить ваш город в профиле на {cityGood} и продолжить оформление заказа?
                    </Modal> : null}
            </div>
        );
    }
}


class PurchaseSmallConstructorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            totalSum: null,
            goodList: null,
            deliveryPrice: null,
            itemCount: null,
            isVisibleContinuePurchaseModal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    }

    // TODO: Сделать нормальный response
    handleSubmit(event) {
        event.preventDefault();
        this.setState({isVisibleContinuePurchaseModal: true});
    }

    handleAddress(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const address = values.address;
                getDeliveryPrice(address)
                    .then(response => {
                        this.setState({deliveryPrice: response.object.deliveryPrice});
                        this.props.form.setFields({
                            address: {
                                value: response.object.foundRightAddress
                            },
                        });
                    }).catch(error => {
                    {
                        this.setState({deliveryPrice: null});
                        notification.error({
                            message: 'De/Li',
                            description: 'Не удалось рассчитать стоимость доставки! Попробуйте указать другой адрес'
                        })
                    }
                });
            }
        });
    }

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

    redirectToSummaryPage(event) {
        event.preventDefault();
        this.props.history.push("/order/summarypage");
    }

    deleteGoodFromBucket(event, goodId) {
        deleteFromUserBucket(goodId).then(response => {
            this.setState({goodList: response});
            this.initTotalSum(this.state.goodList);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось удалить товар!'
            });
        });
    }

    setGoodQuantity(event, goodId, type) {
        event.preventDefault();
        const setGoodQuantityRequest = {'goodId': goodId, 'eventType': type};
        setGoodQuantity(setGoodQuantityRequest).then(response => {
            this.setState({goodList: response});
            this.initTotalSum(this.state.goodList);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось изменить количество товара!'
            });
        });
    }

    componentDidMount() {
        this.initUser();
        this.initGoodList();
    }

    initGoodList() {
        getUserBucketGoods()
            .then(response => {
                this.setState({goodList: response});
                this.initTotalSum(this.state.goodList);
            });
    }

    initTotalSum(userGoods) {
        this.setState({itemCount: null});
        if (userGoods != null) {
            let sum = 0;
            for (let i = 0; i < userGoods.length; i++) {
                sum += userGoods[i].price * userGoods[i].quantity;
                this.setState({itemCount: this.state.itemCount + userGoods[i].quantity});
            }
            this.setState({totalSum: sum});
        }
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
        const {getFieldDecorator} = this.props.form;
        const itemList = (<List className="catalogue-good-list"
                                grid={{
                                    gutter: 1, xs: 1,
                                    sm: 1,
                                    md: 2,
                                    lg: 2,
                                    xl: 3,
                                    xxl: 4,
                                }}
                                dataSource={this.state.goodList}
                                renderItem={item => (
                                    <List.Item
                                        key={item.goodId}
                                    >
                                        <Card className="order-page-list-cart" hoverable
                                              style={{width: 240}}
                                              cover={
                                                  <div className="order-page-list-cart-wrapper">
                                                      <div className="order-page-list-image-wrapper">
                                                          <img className="order-page-list-img" alt="example" align="middle" onClick={(e) => this.redirectToGoodPage(e, item.goodId)}
                                                               src={item.imageUrl}/>
                                                      </div>
                                                      <div className="order-page-list-cart-content-wrapper">
                                                          <div className="order-page-list-text-wrapper">
                                                              {item.name}
                                                          </div>
                                                          <div className="quantity-label">
                                                              <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, item.goodId, 'decrease')}><MinusCircleOutlined/></button>
                                                              <a className="item-count">{item.quantity} {item.quantity === 1 ? "штука" :
                                                                  item.quantity === 2 || item.quantity === 3 || item.quantity === 4 ? "штуки" : "штук"}</a>
                                                              <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, item.goodId, 'increase')}><PlusCircleFilled/></button>
                                                              <div className="item-count count-price-value">{item.price}₽</div>
                                                          </div>
                                                          <div>
                                                              <p className="item-price">{item.quantity * item.price}р</p>
                                                          </div>
                                                          <div>
                                                              <a className="item-count" onClick={(e) => this.deleteGoodFromBucket(e, item.goodId)}>Удалить</a>
                                                          </div>
                                                      </div>
                                                  </div>
                                              }
                                              style={{width: 300}}
                                        />
                                    </List.Item>
                                )}
        />);
        return (
            <div>
                {this.state.isVisibleContinuePurchaseModal ?
                    <Modal
                        title="De/Li"
                        centered
                        cancelText="Отменить заказ"
                        okText="Да" visible={true}
                        onOk={(event) => {
                            this.props.form.validateFields((err, values) => {
                                if (!err) {
                                    const createOrderRequest = Object.assign({}, values, {goods: this.state.goodList}, {deliveryPrice: this.state.deliveryPrice});
                                    createOrder(createOrderRequest)
                                        .then(response => {
                                            this.redirectToSummaryPage(event);
                                        }).catch(error => {
                                        {
                                            this.redirectToSummaryPage(event);
                                        }
                                    });
                                }
                            });
                        }}
                        onCancel={() => this.props.history.push(`/retailers`)}
                    >
                        Вы уверены, что хотите сделать заказ в магазине "{this.state.goodList[0].retailerName}" на сумму {Number(this.state.totalSum) + Number(this.state.deliveryPrice)}р, включая стоимость доставки. Адрес доставки: {this.state.goodList[0].retailerCity}, {this.props.form.getFieldValue('address')} ?
                    </Modal> : null}
                <Form onSubmit={this.handleSubmit} className="login-form" name="basic">
                    <FormItem label="Номер телефона">
                        <Input disabled={true} value={this.state.user != null ? this.state.user.phone : null}
                               prefix={<Icon type="phone"/>}
                               size="large" addonBefore="+7"
                               name="phone"
                               placeholder="___ _______"/>
                    </FormItem>
                    <FormItem label="Email">
                        {getFieldDecorator('email', {
                            initialValue: this.state.user != null ? this.state.user.email : null,
                        })(
                            <Input
                                prefix={<Icon type="mail"/>}
                                size="large"
                                name="email"
                                type="email"
                                value={this.state.user != null ? this.state.user.email : null}
                            />
                        )}
                    </FormItem>
                    <FormItem label="Дополнительный номер телефона">
                        {getFieldDecorator('additionalPhone')(
                            <Input
                                prefix={<Icon type="phone"/>}
                                size="large" addonBefore="+7"
                                name="additionalPhone" maxLength="10"
                                placeholder="(___) _______"/>
                        )}
                    </FormItem>
                    <FormItem label="Адрес получателя">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: 'Пожалуйста, введите ваш адрес!'}],
                        })(
                            <Input onBlur={this.handleAddress}
                                   size="large"
                                   name="address"
                                   placeholder="Адрес получателя"/>
                        )}
                    </FormItem>
                    <FormItem label="Имя">
                        {getFieldDecorator('name', {
                            initialValue: this.state.user != null ? getFio(this.state.user.surname, this.state.user.name, this.state.user.lastname) : null,
                        })(
                            <Input
                                size="large"
                                name="name"
                            />
                        )}
                    </FormItem>

                    <FormItem label="Комментарий">
                        {getFieldDecorator('comment')(
                            <Input.TextArea name="comment" placeholder="Введите комментарий к заказу" rows="4"/>
                        )}
                    </FormItem>
                    <Menu className="purchase-smallscreen-items-menu"
                          onClick={this.handleClick}
                          mode="inline">
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                  <span><p className="order-page-summary">В заказе {this.state.itemCount} {this.state.itemCount === 1 ? "товар" :
                                      this.state.itemCount === 2 || this.state.itemCount === 3 || this.state.itemCount === 4 ? "товара" : "товаров"} на сумму {this.state.totalSum}р </p>
                                   </span>
                                </span>
                            }>{itemList}</SubMenu>
                    </Menu>
                    <hr className="purchase-hr"/>
                    <Card className="purchase-summary-label">
                        <Row>
                            <div className="order-page-summary-wrapper">
                                <div>
                                    <p className="order-page-summary">Стоимость доставки</p>
                                </div>
                                <div>
                                    <p className="order-page-sum">{this.state.deliveryPrice}р</p>
                                </div>
                            </div>
                            <div className="order-page-summary-wrapper">
                                <div>
                                    <p className="order-page-summary">Итого к оплате</p>
                                </div>
                                <div>
                                    <p className="order-page-sum">{Number(this.state.totalSum) + Number(this.state.deliveryPrice)}р</p>
                                </div>
                            </div>
                            <Col className="make-purchase-btn small-make-order" span={10}>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large" className="small-make-order" disabled={(this.state.goodList != null) && (this.state.deliveryPrice != null) ? this.state.goodList.length <= 0 : true}>Сделать заказ</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </div>
        );
    }
}


class PurchaseConstructorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            goodList: null,
            totalSum: null,
            deliveryPrice: null,
            itemCount: null,
            isVisibleContinuePurchaseModal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    }

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

// TODO: Сделать нормальный response
    handleSubmit(event) {
        event.preventDefault();
        this.setState({isVisibleContinuePurchaseModal: true});
    }

    handleAddress(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const address = values.address;
                getDeliveryPrice(address)
                    .then(response => {
                        this.setState({
                            deliveryPrice: response.object.deliveryPrice
                        });
                        this.props.form.setFields({
                            address: {
                                value: response.object.foundRightAddress
                            },
                        });
                    }).catch(error => {
                    {
                        this.setState({deliveryPrice: null});
                        notification.error({
                            message: 'De/Li',
                            description: 'Не удалось рассчитать стоимость доставки! Попробуйте указать другой адрес'
                        })
                    }
                });
            }
        });
    }

    redirectToSummaryPage(event) {
        event.preventDefault();
        this.props.history.push("/order/summarypage");
    }

    componentDidMount() {
        this.initUser();
        this.state.history = this.props.history;
        this.initGoodList();
    }

    initUser() {
        if (this.props.currentUser != null && this.props.currentUser.id != null) {
            getUserProfile(this.props.currentUser.id)
                .then(response => {
                    this.setState({user: response})
                });
        }
    }

    initGoodList() {
        getUserBucketGoods()
            .then(response => {
                this.setState({goodList: response});
                this.initTotalSum(this.state.goodList);
            });
    }

    initTotalSum(userGoods) {
        this.setState({itemCount: null});
        if (userGoods != null) {
            let sum = 0;
            for (let i = 0; i < userGoods.length; i++) {
                sum += userGoods[i].price * userGoods[i].quantity;
                this.setState({itemCount: this.state.itemCount + userGoods[i].quantity});
            }
            this.setState({totalSum: sum});
        }
    }

    deleteGoodFromBucket(event, goodId) {
        deleteFromUserBucket(goodId).then(response => {
            this.setState({goodList: response});
            this.initTotalSum(this.state.goodList);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось удалить товар!'
            });
        });
    }

    setGoodQuantity(event, goodId, type) {
        event.preventDefault();
        const setGoodQuantityRequest = {'goodId': goodId, 'eventType': type};
        setGoodQuantity(setGoodQuantityRequest).then(response => {
            this.setState({goodList: response});
            this.initTotalSum(this.state.goodList);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось изменить количество товара!'
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {this.state.isVisibleContinuePurchaseModal ?
                    <Modal
                        title="De/Li"
                        centered
                        cancelText="Отменить заказ"
                        okText="Да" visible={true}
                        onOk={(event) => {
                            this.props.form.validateFields((err, values) => {
                                if (!err) {
                                    const createOrderRequest = Object.assign({}, values, {goods: this.state.goodList}, {deliveryPrice: this.state.deliveryPrice});
                                    createOrder(createOrderRequest)
                                        .then(response => {
                                            this.redirectToSummaryPage(event);
                                        }).catch(error => {
                                        {
                                            this.redirectToSummaryPage(event);
                                        }
                                    });
                                }
                            });
                        }}
                        onCancel={() => this.props.history.push(`/retailers`)}
                    >
                        Вы уверены, что хотите сделать заказ в магазине "{this.state.goodList[0].retailerName}" на сумму {Number(this.state.totalSum) + Number(this.state.deliveryPrice)}р, включая стоимость доставки. Адрес доставки: {this.state.goodList[0].retailerCity}, {this.props.form.getFieldValue('address')} ?
                    </Modal> : null}
                <Row type="flex" justify="space-between">
                    <Col lg={15}>
                        <Form onSubmit={this.handleSubmit} className="login-form" name="purchase">
                            <Row type="flex" justify="space-between">
                                <Col lg={12}>
                                    <FormItem label="Номер телефона">
                                        <Input disabled={true} value={this.state.user != null ? this.state.user.phone : null}
                                               prefix={<Icon type="phone"/>}
                                               size="large" addonBefore="+7"
                                               name="phone"
                                               placeholder="___ _______"/>
                                    </FormItem>
                                    <FormItem label="Email">
                                        {getFieldDecorator('email', {
                                            initialValue: this.state.user != null ? this.state.user.email : null
                                        })(
                                            <Input
                                                prefix={<Icon type="mail"/>}
                                                size="large"
                                                name="email"
                                                type="email"
                                                placeholder="Email"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="Дополнительный номер телефона">
                                        {getFieldDecorator('additionalPhone')(
                                            <Input
                                                prefix={<Icon type="phone"/>}
                                                size="large" addonBefore="+7"
                                                name="additionalPhone" maxLength="10"
                                                placeholder="___ _______"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={11}>
                                    <FormItem label="Адрес получателя">
                                        {getFieldDecorator('address', {
                                            rules: [{required: true, message: 'Пожалуйста, введите ваш адрес!'}]
                                        })(
                                            <Input onBlur={this.handleAddress}
                                                   size="large"
                                                   name="address"
                                                   placeholder="Адрес получателя"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="Имя">
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.user != null ? getFio(this.state.user.surname, this.state.user.name, this.state.user.lastname) : null
                                        })(
                                            <Input
                                                size="large"
                                                name="name"
                                                placeholder="Имя"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem label="Комментарий">
                                        {getFieldDecorator('comment')(
                                            <Input.TextArea name="comment" placeholder="Введите комментарий к заказу" rows="4"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <hr className="purchase-hr"/>
                            <Card className="purchase-summary-label">
                                <Row>
                                    <div className="order-page-summary-wrapper">
                                        <div>
                                            <p className="order-page-summary">Стоимость доставки</p>
                                        </div>
                                        <div>
                                            <p className="order-page-sum">{this.state.deliveryPrice}р</p>
                                        </div>
                                    </div>
                                    <div className="order-page-summary-wrapper">
                                        <div>
                                            <p className="order-page-summary">Итого к оплате</p>
                                        </div>
                                        <div>
                                            <p className="order-page-sum">{Number(this.state.totalSum) + Number(this.state.deliveryPrice)}р</p>
                                        </div>
                                    </div>
                                    <Col className="make-purchase-btn" span={10}>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" size="large" className="login-form-button" disabled={(this.state.goodList != null) && (this.state.deliveryPrice != null) ? this.state.goodList.length <= 0 : true}>Сделать заказ</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Card>
                        </Form>
                    </Col>
                    <Col lg={5}>
                        <div className="purchase-list-items purchase-block-right-wrapper">
                            <div className="purchase-block-right">
                                <Card className="total-sum" style={{width: 300}}>
                                    <div>
                                        <div>
                                            <p className="order-page-summary">В заказе {this.state.itemCount} {this.state.itemCount === 1 ? "товар" :
                                                this.state.itemCount === 2 || this.state.itemCount === 3 || this.state.itemCount === 4 ? "товара" : "товаров"} на сумму {this.state.totalSum}р </p>
                                            <div>
                                                {this.state.goodList != null ?
                                                    <List className="catalogue-good-list"
                                                          dataSource={this.state.goodList}
                                                          renderItem={item => (
                                                              <List.Item
                                                                  key={item.goodId}
                                                              >
                                                                  <Card className="order-page-list-cart" hoverable
                                                                        style={{width: 240}}
                                                                        cover={
                                                                            <div className="order-page-list-cart-wrapper">
                                                                                <div className="order-page-list-image-wrapper">
                                                                                    <img className="order-page-list-img" alt="example" align="middle" onClick={(e) => this.redirectToGoodPage(e, item.goodId)}
                                                                                         src={item.imageUrl}/>
                                                                                </div>
                                                                                <div className="order-page-list-cart-content-wrapper">
                                                                                    <div className="order-page-list-text-wrapper">
                                                                                        {item.name}
                                                                                    </div>
                                                                                    <div className="quantity-label">
                                                                                        <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, item.goodId, 'decrease')}><MinusCircleOutlined/></button>
                                                                                        <a className="item-count">{item.quantity} {item.quantity === 1 ? "штука" :
                                                                                            item.quantity === 2 || item.quantity === 3 || item.quantity === 4 ? "штуки" : "штук"}</a>
                                                                                        <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, item.goodId, 'increase')}><PlusCircleFilled/></button>
                                                                                    </div>
                                                                                    <div className="item-count">{item.price}₽</div>
                                                                                    <div>
                                                                                        <p className="item-price">{item.quantity * item.price}₽</p>
                                                                                    </div>
                                                                                    <div className="delete-item">
                                                                                        <a className="item-count"
                                                                                           onClick={(e) => this.deleteGoodFromBucket(e, item.goodId)}>Удалить</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        style={{width: 300}}
                                                                  />
                                                              </List.Item>
                                                          )}
                                                    /> : null}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default PurchaseConstructor;

