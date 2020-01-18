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

    addToBucketEvent(event, goodId) {
        event.preventDefault();
        addToBucket(this.props.currentUser.id, goodId).then(response => {
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
                        <Descriptions bordered>
                            <Descriptions.Item label="Производитель"
                                               span={3} xs={1}>{this.state.good.producer}</Descriptions.Item>
                            <Descriptions.Item label="Гарантия"
                                               span={3} xs={1}>{this.state.good.guaranteeTime}</Descriptions.Item>
                            <Descriptions.Item label="Год выпуска"
                                               span={3} xs={1}>{this.state.good.yearOfProduced}</Descriptions.Item>
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
                                    <Col xxl={22} sm={18} md={22} xs={18}>
                                        <b className="good-title">{this.state.good.name}</b>
                                    </Col>
                                </Row>
                                <Row type="flex">
                                    <Col xxl={14} sm={22} md={13} xs={22} className="good-image">
                                        <img className="good-panel-good-img" alt="example" align="middle"
                                             src={this.state.good.imageUrl}/>
                                    </Col>
                                    <Col xxl={8} sm={22} md={8} xs={22} className="price-label">
                                        <Card className="advertisement good-card-actions" hoverable
                                              style={{width: 300}}
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
                <div className="good-panel additionalInfo">
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


