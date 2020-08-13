import React, {Component} from 'react'
import './Catalogue.css';
import {Button, Card, List, notification, Row} from 'antd';
import {addToBucket, loadPublicOffers, getGoodsByRetailers} from "../util/APIUtils";
import {formatDate} from "../util/Helpers";
import InfiniteScroll from "react-infinite-scroller";
import Spin from "antd/es/spin";
import Text from "antd/es/typography/Text";

const {Meta} = Card;

class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retailerId: props.match.params.retailerId,
            goods: [],
            publicOffers: [],
            totalElements: 0,
            size: 0,
            totalPages: 0,
            page: 0,
            pagination: 0,
            loading: false,
            hasMore: true,
            last: false,
        };
        this.addToBucketEvent = this.addToBucketEvent.bind(this);
        this.loadPublicOffers();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.initCatalogueOfGoods = this.initCatalogueOfGoods.bind(this);
        this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentWillUnmount() {
        this.props.resetFilterValue();
    }

    componentDidMount() {
        const retailerId = this.props.match.params.retailerId;
        this.setState({
            retailerId: retailerId
        });
        this.initCatalogueOfGoods(retailerId, {
            page: this.state.page,
        }, this.props.filterValue);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filterValue !== this.props.filterValue) {
            this.setState({totalElements: 0, size: 0, totalPages: 0, page: 0, pagination: 0, hasMore: true, last: false, goods: []}, function () {
                const retailerId = this.props.match.params.retailerId;
                if (this.props.filterValue != null)
                    this.initCatalogueOfGoods(retailerId, {
                        page: this.state.page,
                    }, this.props.filterValue);
            });
        }
    }

    initCatalogueOfGoods(retailerId, params = {}, filterValue) {
        this.setState({loading: true});
        let goods = filterValue != null ? getGoodsByRetailers(retailerId, params.page, 10, params.sortField, params.sortOrder, filterValue) :
            getGoodsByRetailers(retailerId, params.page, 10, params.sortField, params.sortOrder, 0);
        this.props.initCatalogueRetailer(retailerId);
        goods
            .then(response => {
                this.setState({
                    loading: false,
                    totalElements: response.totalElements,
                    size: response.size,
                    totalPages: response.totalPages,
                    page: response.page,
                    last: response.last
                });
                this.setState(this.initGoods(response.content));
            });
    }

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        if (this.state.last) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.initCatalogueOfGoods(this.state.retailerId, {
            page: this.state.page + 1,
        }, this.props.filterValue);
    };

    initGoods(response) {
        for (let i = 0; i < response.length; i++) {
            if (response[i].createdAt != null)
                response[i].createdAt = formatDate(response[i].createdAt.epochSecond);
            this.state.goods.push(response[i]);
            this.setState({goods: this.state.goods})
        }
    }

    redirectToLogin = () => {
        this.props.history.push("/login");
    };

    addToBucketEvent(event, goodId) {
        event.preventDefault();
        if (this.props.currentUser == null) {
            notification.error({
                message: 'De/Li',
                description: 'Необходимо выполнить вход в личный кабинет!'
            });
            this.redirectToLogin();
        } else {
            const goodList = [...this.state.goods];
            addToBucket(goodId).then(response => {
            }).catch(error => {
            });
            goodList.forEach(item => {
                if (item.id == goodId) {
                    item.addToBucket = true;
                }
            });
            this.setState({
                goods: goodList
            });
        }
    }

    redirectToBucket = () => {
        this.props.history.push("/shopBucket");
    };

    redirectToGoodPage(event, goodId) {
        event.preventDefault();
        this.props.history.push(`/good/${goodId}`);
    }

    loadPublicOffers() {
        loadPublicOffers().then(response => {
            this.initOffersResponseValues(response);
        }).catch(error => {
        });
    }

    initOffersResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            if (response[i].startDate != null)
                response[i].startDate = formatDate(response[i].startDate);
            if (response[i].finishDate != null)
                response[i].finishDate = formatDate(response[i].finishDate);
            this.state.publicOffers.push(response[i]);
            this.setState({publicOffers: this.state.publicOffers})
        }
    }


    render() {

        return (
            <Row className="catalogue-item-list">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                > {this.state.goods.length > 0 ?
                    <List
                        grid={{
                            gutter: 1, xs: 1,
                            sm: 1,
                            md: 2,
                            lg: 2,
                            xl: 3,
                            xxl: 4,
                        }}
                        dataSource={this.state.goods}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                            >
                                <Card hoverable
                                      cover={<div className="b-retailer__logo b-retailer__logo_loaded_true" align="center">
                                          <img alt="Logo" align="center"
                                               src={item.imageUrl}
                                               className="b-image__root"/>
                                      </div>}
                                      style={{width: 300}}
                                >
                                    <Meta title={item.name}
                                          description={
                                              <div className="item-price-label">
                                                  <div className="item-price">
                                                      {item.currentPrice} ₽
                                                  </div>
                                                  <div>
                                                      {item.addToBucket == 1 ?
                                                          <Button type="primary" className="green-button" block onClick={this.redirectToBucket}>
                                                              В корзине
                                                          </Button>
                                                          :
                                                          <Button type="primary" block onClick={(e) => this.addToBucketEvent(e, item.id)}>
                                                              В корзину
                                                          </Button>
                                                      }

                                                  </div>
                                              </div>
                                          }/>
                                </Card>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin/>
                            </div>
                        )}
                    </List> : <Text type="secondary">Товаров с заданным фильтром не найдено</Text>}
                </InfiniteScroll>
            </Row>
        )
    }
}

export default Catalogue;


