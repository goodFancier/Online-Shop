import React, {Component} from 'react'
import './OfferPage.css';
import {Table, Card, Row, Col, List} from 'antd';
import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import {addToBucket, getOfferById} from "../util/APIUtils";
import {toOfferDate} from "../util/Helpers";


const {Column, ColumnGroup} = Table;
const {Meta} = Card;

class OfferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: null
        };
        this.initOfferPage = this.initOfferPage.bind(this);
    }

    initOfferPage(offerId) {
        this.setState({
            isLoading: true
        });
        getOfferById(offerId)
            .then(response => {
                response.startDate = toOfferDate(response.startDate);
                response.finishDate = toOfferDate(response.finishDate);
                this.setState({
                    offer: response
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
        const offerId = this.props.match.params.offerId;
        this.initOfferPage(offerId);
    }

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

    addToBucketEvent(event, goodId) {
        event.preventDefault();
        addToBucket(this.props.currentUser.id, goodId).then(response => {
        }).catch(error => {
        });
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
                <div>
                    {
                        this.state.offer != null ? (
                            <div className="good-panel-div">
                                <Row type="flex">
                                    <Col xxl={13} lg={15} sm={24} md={14} xs={24} className="good-image">
                                        <img className="offer-title-img" alt="example" align="middle"
                                             src={this.state.offer.imageUrl}/>
                                    </Col>
                                    <Col xxl={11} lg={9} sm={24} md={10} xs={24} className="price-label">
                                        <Row>
                                            <Col xxl={24} lg={24} sm={24} md={24} xs={24}>
                                                <div
                                                    className="offer-dates">{this.state.offer.startDate} - {this.state.offer.finishDate}</div>
                                            </Col>
                                            <Col xxl={24} lg={24} sm={24} md={24} xs={24}>
                                                <b className="offer-title">{this.state.offer.name}</b>
                                            </Col>
                                            <Col xxl={24} lg={24} sm={24} md={24} xs={24}>
                                                <div className="offer-description">{this.state.offer.description}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="offer-goods-title-row">
                                    <b className="offer-goods-title">Акционные товары</b>
                                </Row>
                                <Row>
                                    <List className="catalogue-good-list"
                                          grid={{gutter: 1,  xs: 1,
                                              sm: 1,
                                              md: 2,
                                              lg: 2,
                                              xl: 3,
                                              xxl: 4,}}
                                          dataSource={this.state.offer.goodList}
                                          renderItem={item => (
                                              <List.Item
                                                  key={item.id}
                                              >
                                                  <Card className="advertisement" hoverable
                                                        style={{width: 240}}
                                                        cover={<img alt="example" align="middle"
                                                                    onClick={(e) => this.redirectToGoodPage(e, item.id)}
                                                                    src={item.imageUrl}/>}
                                                        style={{width: 300, marginTop: 16}}
                                                        actions={[
                                                            <button
                                                                onClick={(e) => this.addToBucketEvent(e, item.id)}>Добавить
                                                                в
                                                                корзину</button>
                                                        ]}
                                                  >
                                                      <Meta title={item.name}
                                                            onClick={(e) => this.redirectToGoodPage(e, item.id)}
                                                            description={<div>Цена: {item.currentPrice}$</div>}/>
                                                  </Card>
                                              </List.Item>
                                          )}
                                    />
                                </Row>
                            </div>) : null
                    }
                </div>
            </Row>
        )
    }
}

export default OfferPage;


