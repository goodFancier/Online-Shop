import React, {Component} from 'react'
import './Good.css';
import {Table, Card, Row, List, Button, notification, Col, Descriptions} from 'antd';
import {getCatalogueOfGoods, addToBucket, getUserProfile} from "../util/APIUtils";
import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import {getGoodById} from "../util/APIUtils"
import {Link} from "react-router-dom";


const {Column, ColumnGroup} = Table;
const {Meta} = Card;

class Good extends Component {
    constructor(props) {
        super(props);
        this.state = {
            good: null,
            buttonId: 0
        };
        this.loadGoodCard = this.loadGoodCard.bind(this);
        this.showAdditionalInfo = this.showAdditionalInfo.bind(this);
    }

    loadGoodCard(goodId) {
        this.setState({
            isLoading: true
        });

        getGoodById(goodId)
            .then(response => {
                this.setState({
                    good: response
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true
                });
            } else {
                this.setState({
                    serverError: true
                });
            }
        });
    }

    componentDidMount() {
        const goodId = this.props.match.params.goodId;
        this.loadGoodCard(goodId);
    }

    redirectToLogin = () => {
        this.props.history.push("/login");
    }

    addToBucketEvent(event, goodId) {
        event.preventDefault();
        if (this.props.currentUser == null) {
            notification.error({
                message: 'De/Li',
                description: 'Необходимо выполнить вход в личный кабинет!'
            })
            this.redirectToLogin();
        }
        else
            addToBucket(goodId).then(response => {
            }).catch(error => {
            });
    }

    setButtonId(event, buttonId) {
        event.preventDefault();
        this.setState({buttonId: buttonId});
    }

    showAdditionalInfo(goodId, buttonId) {
        return (
            <div>
                {
                    buttonId === 0 ? (<div id="description" className="good-description">
                        {this.state.good.description}
                    </div>) : this.state.buttonId === 1 ? (<div id="characteristics">
                        <Descriptions bordered column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}>
                            <Descriptions.Item label="Производитель"
                            >{this.state.good.producer}</Descriptions.Item>
                            <Descriptions.Item label="Гарантия"
                            >{this.state.good.guaranteeTime}</Descriptions.Item>
                            <Descriptions.Item label="Год выпуска"
                            >{this.state.good.yearOfProduced}</Descriptions.Item>
                            <Descriptions.Item label="Возможность обмена" span={3} xs={1}>
                                {this.state.good.isChangeable}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>) : null
                }
            </div>
        );
    }


    render() {
        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }

        return (
            <Row>
                <div className="good-panel">
                    {
                        this.state.good != null ? (
                            <div className="good-panel-div">
                                <Row>
                                    <Col xxl={24} sm={24} md={24} xs={24}>
                                        <b className="good-title">{this.state.good.name}</b>
                                    </Col>
                                </Row>
                                <Row type="flex">
                                    <Col xxl={18} lg={15} sm={24} md={14} xs={24} className="good-image">
                                        <img className="good-panel-good-img" alt="example" align="middle"
                                             src={this.state.good.imageUrl}/>
                                    </Col>
                                    <Col xxl={6} lg={9} sm={24} md={10} xs={24} className="price-label">
                                        <Card className="advertisement good-card-actions good-add-to-bucket" hoverable
                                              actions={[
                                                  <button className="good-card-buy-button"
                                                          onClick={(e) => this.addToBucketEvent(e, this.state.good.id)}>Добавить
                                                      в
                                                      корзину</button>
                                              ]}
                                        >
                                            <Meta title={<div>Цена: {this.state.good.currentPrice}$</div>}
                                            />
                                        </Card>
                                    </Col>

                                </Row>
                            </div>) : null
                    }
                </div>
                <div className="good-header">
                    {
                        this.state.good != null ? (
                            <div className="good-header-topics">
                                <div>
                                    <Link onClick={(e) => this.setButtonId(e, 0)}>Описание
                                        товара</Link>
                                </div>
                                <div>
                                    <Link
                                        onClick={(e) => this.setButtonId(e, 1)}>Характеристики</Link>
                                </div>
                            </div>

                        ) : null
                    }
                </div>
                <div className="additionalInfo">
                    {
                        this.state.good != null ? (
                            this.showAdditionalInfo(this.state.good.id, this.state.buttonId)
                        ) : null}
                </div>

            </Row>
        )
    }
}

export default Good;


