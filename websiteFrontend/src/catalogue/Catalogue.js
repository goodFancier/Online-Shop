import React, {Component} from 'react'
import './Catalogue.css';
import {Table, Card, Icon, List, Button, notification, Carousel, Row} from 'antd';
import {getCatalogueOfGoods, addToBucket, loadPublicOffers} from "../util/APIUtils";
import {formatDate} from "../util/Helpers";

const {Column, ColumnGroup} = Table;
const {Meta} = Card;

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class Catalogue extends Component {
    state = {
        goods: [],
        publicOffers: []
    };

    constructor(props) {
        super(props);
        this.initCatalogueOfGoods();
        this.addToBucketEvent = this.addToBucketEvent.bind(this);
        this.loadPublicOffers();
    }

    initCatalogueOfGoods() {
        let goods = getCatalogueOfGoods();
        goods
            .then(response => {
                this.setState(this.initGoods(response));
            });
    }

    initGoods(response) {
        for (let i = 0; i < response.length; i++) {
            response[i].createdAt = formatDate(response[i].createdAt.epochSecond);
            this.state.goods.push(response[i]);
            this.setState({goods: this.state.goods})
        }
    }

    addToBucketEvent(event, goodId) {
        event.preventDefault();
        addToBucket(this.props.currentUser.id, goodId).then(response => {
        }).catch(error => {
        });
    }

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

    redirectToOfferPage(event, offerId) {
        event.preventDefault();
        this.props.history.push(`/offer/${offerId}`);
    }

    getBooklets() {
        let bookletList = [];
        for (let i = 0; i < this.state.publicOffers.length; i++) {
            bookletList.push(<div className="board-row"><img src={this.state.publicOffers[i].imageUrl}
                                                             onClick={(e) => this.redirectToOfferPage(e, this.state.publicOffers[i].id)}/>
            </div>);
        }
        return bookletList;
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
            <Row>
                <Carousel autoplay swipe={true} arrows={true}>
                    {this.getBooklets()}
                </Carousel>
                <List className="catalogue-good-list"
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
                              <Card className="advertisement" hoverable
                                    style={{width: 240}}
                                    cover={<img alt="example" align="middle" onClick={(e) => this.redirectToGoodPage(e, item.id)}
                                                src={item.imageUrl}/>}
                                    style={{width: 300, marginTop: 16}}
                                    actions={[
                                        <button onClick={(e) => this.addToBucketEvent(e, item.id)}>Добавить в
                                            корзину</button>
                                    ]}
                              >
                                  <Meta title={item.name} onClick={(e) => this.redirectToGoodPage(e, item.id)}
                                        description={<div>Цена: {item.currentPrice}$</div>}/>
                              </Card>
                          </List.Item>
                      )}
                />
            </Row>
        )
    }
}

export default Catalogue;


