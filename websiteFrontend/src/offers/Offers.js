import React, {Component} from 'react'
import './Offers.css';
import {Card, Carousel, List, Row} from 'antd';
import {loadPublicOffers} from "../util/APIUtils";
import {formatDate} from "../util/Helpers";

const {Meta} = Card;

class Offers extends Component {
    state = {
        publicOffers: []
    };

    constructor(props) {
        super(props);
        this.loadPublicOffers();
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
                      grid={{gutter: 1,  xs: 1,
                          sm: 1,
                          md: 2,
                          lg: 2,
                          xl: 3,
                          xxl: 4,}}
                      dataSource={this.state.publicOffers}
                      renderItem={item => (
                          <List.Item
                              key={item.id}
                          >
                              <Card className="advertisement" hoverable
                                    style={{width: 240}}
                                    cover={<img alt="example" align="middle"
                                                onClick={(e) => this.redirectToOfferPage(e, item.id)}
                                                src={item.imageUrl}/>}
                                    style={{width: 300, marginTop: 16}}
                                    actions={[
                                        <button onClick={(e) => this.redirectToOfferPage(e, item.id)}>Подробнее</button>
                                    ]}
                              >
                                  <Meta title={item.name} onClick={(e) => this.redirectToOfferPage(e, item.id)}
                                        description={<div>С {item.startDate} по {item.finishDate}</div>}/>
                              </Card>
                          </List.Item>
                      )}
                />
            </Row>
        )
    }
}

export default Offers;


