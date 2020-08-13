import React, {Component} from 'react'
import './Bucket.css';
import {Table, Col, Row, Card, Button, List, notification, Icon} from 'antd';
import 'antd/dist/antd.css';
import {PlusCircleFilled, MinusCircleOutlined} from '@ant-design/icons';
import {deleteFromUserBucket, getUserBucketGoods, setGoodQuantity} from "../../util/APIUtils";

const {Column} = Table;

class Bucket extends Component {
    state = {
        query: '',
        userGoods: [],
        lastParticipants: [],
        loading: true,
        totalSum: null,
        randomGoods: [],
        randomGoodName1: null,
        randomGoodName2: null,
        randomGoodImage1: null,
        randomGoodImage2: null,
        itemCount: null
    };

    constructor(props) {
        super(props);
        this.initUserBuckerGoods();
        if (this.props.currentUser != null)
            this.initTotalSum(this.props.currentUser.id);
    }

    initUserBuckerGoods(currentUser) {
        this.setState({loading: true});
        let users = getUserBucketGoods();
        users
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    this.state.userGoods.push(response[i]);
                    this.setState({userGoods: this.state.userGoods});
                }
                this.setState({loading: false});
                this.initTotalSum(this.state.userGoods);
                this.setState({loading: false});
            }).catch(error => {
            this.setState({loading: false});
        });
    }

    initTotalSum(userGoods) {
        this.setState({itemCount: null});
        let sum = 0;
        for (let i = 0; i < userGoods.length; i++) {
            sum += userGoods[i].price * userGoods[i].quantity;
            this.setState({itemCount: this.state.itemCount + userGoods[i].quantity});
        }
        this.setState({totalSum: sum});
    }

    deleteGoodFromBucket(goodId) {
        deleteFromUserBucket(goodId).then(response => {
            this.setState({userGoods: response});
            this.initTotalSum(response);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось удалить товар!'
            });
        });
    }

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

    continuePurchase(event) {
        event.preventDefault();
        this.props.history.push(`/purchaseConstructor`)
    }

    setGoodQuantity(event, goodId, type) {
        event.preventDefault();
        const setGoodQuantityRequest = {'goodId': goodId, 'eventType': type};
        setGoodQuantity(setGoodQuantityRequest).then(response => {
            this.setState({userGoods: response});
            this.initTotalSum(this.state.userGoods);
        }).catch(error => {
            notification.error({
                message: 'De/Li',
                description: 'Не удалось изменить количество товара!'
            });
        });
    }

    render() {
        let orderPageContent;
        if (window.innerWidth < 1050)
            orderPageContent = [
                <div>
                    <h2>Моя корзина</h2>
                    <List className="catalogue-good-list" loading={this.state.loading}
                          grid={{
                              gutter: 1, xs: 1,
                              sm: 1,
                              md: 2,
                              lg: 2,
                              xl: 3,
                              xxl: 4,
                          }}
                          dataSource={this.state.userGoods}
                          renderItem={item => (
                              <List.Item
                                  key={item.id}
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
                                                        <div className="item-count">{item.quantity} {item.quantity === 1 ? "штука" :
                                                            item.quantity === 2 || item.quantity === 3 || item.quantity === 4 ? "штуки" : "штук"}</div>
                                                        <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, item.goodId, 'increase')}><PlusCircleFilled/></button>
                                                        <div className="item-count count-price-value">{item.price}₽</div>
                                                    </div>
                                                    <div>
                                                        <p className="item-price">{item.quantity * item.price}₽</p>
                                                    </div>
                                                    <div>
                                                        <a className="item-count" onClick={(e) => this.deleteGoodFromBucket(item.id)}>Удалить</a>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        style={{width: 300}}
                                  />
                              </List.Item>
                          )}
                    />
                    <div className="order-page-summary-wrapper">
                        <div>
                            <p className="order-page-summary">В корзине {this.state.itemCount} {this.state.itemCount === 1 ? "товар" :
                                this.state.itemCount === 2 || this.state.itemCount === 3 || this.state.itemCount === 4 ? "товара" : "товаров"}</p>
                        </div>
                        <div>
                            <p className="order-page-sum">{this.state.totalSum}р</p>
                        </div>
                    </div>
                    <Button type="primary" block className="order-button" onClick={(e) => this.continuePurchase(e)} disabled={this.state.userGoods.length <= 0}>
                        Продолжить оформление
                    </Button>
                </div>
            ];
        else
            orderPageContent = [<Row type="flex" justify="space-between">
                <Col lg={16}>
                    <div>
                        <h2>Моя корзина</h2>
                        < Table className="bucket-good-list" loading={this.state.loading}
                                dataSource={this.state.userGoods}
                        >
                            <Column title="Изображение" dataIndex="imageUrl" key="imageUrl" render={(key) => (<img className="bucket-table-img"
                                                                                                                   src={key}/>)}/>
                            <Column title="Наименование товара" dataIndex="name" key="name"/>
                            <Column title="Цена" dataIndex="price" key="price" render={(key) => <div>{key}₽</div>}/>/>
                            <Column title="Количество" dataIndex="quantity" key="quantity" render={(key, record) => <div className="quantity-label">
                                <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, record.goodId, 'decrease')}><MinusCircleOutlined/></button>
                                {key}
                                <button className="set-quantity-button" type="button" onClick={(e) => this.setGoodQuantity(e, record.goodId, 'increase')}><PlusCircleFilled/></button>
                            </div>}/>
                            <Column title="Стоимость" dataIndex="price" key="price" render={(key, record) => <div>{record.quantity * key}₽</div>}/>
                            < Column
                                title="Действие"
                                key="action"
                                render={(record) => (
                                    <a onClick={(e) => this.deleteGoodFromBucket(record.goodId)}>Удалить</a>
                                )}
                            />
                        </Table>
                    </div>
                </Col>
                <Col lg={5} bordered={true} className="order-panel">
                    <div>
                        <Card className="total-sum" style={{width: 300}}>
                            <div className="order-page-summary-wrapper">
                                <div>
                                    <p className="order-page-summary">В корзине {this.state.itemCount} {this.state.itemCount === 1 ? "товар" :
                                        this.state.itemCount === 2 || this.state.itemCount === 3 || this.state.itemCount === 4 ? "товара" : "товаров"}</p>
                                </div>
                                <div>
                                    <p className="order-page-sum">{this.state.totalSum}р</p>
                                </div>
                            </div>
                            <Button type="primary" block className="order-button" onClick={(e) => this.continuePurchase(e)} disabled={this.state.userGoods.length <= 0}>
                                Продолжить оформление
                            </Button>
                        </Card>
                    </div>
                </Col>
            </Row>
            ];
        return (
            <div>
                {orderPageContent}
            </div>
        )
    }
}

export default Bucket;


