import React, {Component} from 'react'
import './Bucket.css';
import {Table, Col, Row, Card, Button} from 'antd';
import {deleteFromUserBucket, getUserBucketGoods, getBucketTotalSum, getRandomGoods} from "../../util/APIUtils";
import {formatDate} from "../../util/Helpers";
import {Link} from "react-router-dom";

const {Column} = Table;
const {Meta} = Card;

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Bucket extends Component {
    state = {
        query: '',
        userGoods: [],
        lastParticipants: [],
        loading: false,
        totalSum: null,
        randomGoods: [],
        randomGoodName1: null,
        randomGoodName2: null,
        randomGoodImage1: null,
        randomGoodImage2: null
    };

    constructor(props) {
        super(props);
        this.initUserBuckerGoods(this.props.currentUser);
        if (this.props.currentUser != null)
            this.initTotalSum(this.props.currentUser.id);
        this.initRandomGoods();
    }

    initUserBuckerGoods(currentUser) {
        if (currentUser != null && currentUser.id != null) {
            let users = getUserBucketGoods(currentUser.id);
            users
                .then(response => {
                    this.setState(this.initGoodsResponseValues(response));
                });
        }
    }

    initTotalSum(userId) {
        getBucketTotalSum(userId).then(response => {
            this.setState({totalSum: response})
        }).catch(error => {
        });
    }

    initGoodsResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            response[i].createdAt = formatDate(response[i].createdAt.epochSecond);
            this.state.userGoods.push(response[i]);
            this.setState({userGoods: this.state.userGoods})
        }
    }

    deleteGoodFromBucket(event, userId, goodId) {
        deleteFromUserBucket(this.props.currentUser.id, goodId).then(response => {
            this.setState({userGoods: response, totalSum: this.initTotalSum(this.props.currentUser.id)})
        }).catch(error => {
        });
    }

    initRandomGoods() {
        getRandomGoods().then(response => {
            this.setState({
                randomGoods: response
            })
        }).catch(error => {
        });
    }

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

    render() {

        return (
            <Row type="flex" justify="space-between">
                <Col span={18}>
                    <h2>Моя корзина</h2>
                    < Table className="bucket-good-list"
                            rowSelection={rowSelection}
                            dataSource={this.state.userGoods}
                    >
                        <Column title="Наименование товара" dataIndex="name" key="name"/>
                        <Column title="Стоимость" dataIndex="currentPrice" key="currentPrice"/>
                        <Column title="Дата поступления на склад" dataIndex="createdAt" key="createdAt"/>
                        <Column title="Изображение" dataIndex="imageUrl" key="imageUrl" render={(key) => (<img
                            src={key}/>)}/>
                        <Column
                            title="Действие"
                            key="action"
                            render={(record) => (
                                <a onClick={(e) => this.deleteGoodFromBucket(e, this.props.currentUser.id, record.id)}>Удалить</a>
                            )}
                        />
                    </Table>
                </Col>
                <Col span={4} bordered={true} className="order-panel">
                    <div>

                        <Card className="total-sum" style={{width: 300}}>
                            <Meta
                                title={"Общая сумма к оплате " + this.state.totalSum}
                                description="Заказ будет доставлен 14 октября"
                            />
                            <Button type="primary" block className="order-button">
                                Сделать заказ
                            </Button>
                        </Card>
                        <div> {
                            this.state.randomGoods[0] != null ? (
                                <Card className="advertisement" hoverable title="Может быть интересно"
                                      style={{width: 240}}
                                      cover={<img alt="example" align="middle"
                                                  src={this.state.randomGoods[0].imageUrl}/>}
                                      style={{width: 300, marginTop: 16}}
                                      actions={[
                                          <div onClick={(e) => this.redirectToGoodPage(e, this.state.randomGoods[0].id)}>
                                              <button>Посмотреть предложение</button>
                                          </div>
                                      ]}
                                >
                                    <Meta title={this.state.randomGoods[0].name}
                                          description={this.state.randomGoods[0].name}/>
                                </Card>

                            ) : null
                        }
                        </div>

                        <div> {
                            this.state.randomGoods[1] != null ? (
                                < Card className="advertisement" hoverable title="Может быть интересно"
                                       style={{width: 240}}
                                       cover={<img alt="example" align="middle"
                                                   src={this.state.randomGoods[1].imageUrl}/>}
                                       style={{width: 300, marginTop: 16}}
                                       actions={[
                                           <div onClick={(e) => this.redirectToGoodPage(e, this.state.randomGoods[1].id)}>
                                               <button>Посмотреть предложение</button>
                                           </div>
                                       ]}
                                >
                                    <Meta title={this.state.randomGoods[1].name}
                                          description={this.state.randomGoods[1].name}/>
                                </Card>) : null
                        }</div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Bucket;


