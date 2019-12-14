import React, {Component} from 'react'
import './Bucket.css';
import {Table, Col, Row, Card, Button} from 'antd';
import {deleteFromUserBucket, getUserBucketGoods, getBucketTotalSum, getRandomGoods} from "../../util/APIUtils";
import {formatDate} from "../../util/Helpers";

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
                randomGoodName1: response[0].name,
                randomGoodName2: response[1].name,
                randomGoodImage1: response[0].imageUrl,
                randomGoodImage2: response[1].imageUrl
            })
        }).catch(error => {
        });
    }

    render() {

        return (
            <Row type="flex" justify="space-between">
                <Col span={18} className="order-table">
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

                        <Card className="advertisement" hoverable title="Может быть интересно"
                              style={{width: 240}}
                              cover={<img alt="example" align="middle"
                                          src={this.state.randomGoodImage1}/>}
                              style={{width: 300, marginTop: 16}}
                              actions={[
                                  <div onClick={this.redirectToGood}>
                                      <button>Посмотреть предложение</button>
                                  </div>
                              ]}
                        >
                            <Meta title={this.state.randomGoodName1}
                                  description={this.state.randomGoodName1}/>
                        </Card>

                        <Card className="advertisement" hoverable title="Может быть интересно"
                              style={{width: 240}}
                              cover={<img alt="example" align="middle"
                                          src={this.state.randomGoodImage2}/>}
                              style={{width: 300, marginTop: 16}}
                              actions={[
                                  <div onClick={this.redirectToGood}>
                                      <button>Посмотреть предложение</button>
                                  </div>
                              ]}
                        >
                            <Meta title={this.state.randomGoodName2}
                                  description={this.state.randomGoodName2}/>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Bucket;


