import React, {Component} from 'react'
import './Catalogue.css';
import {Table, Card, Icon, List, Button} from 'antd';
import {getCatalogueOfGoods, addToBucket} from "../util/APIUtils";
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
        goods: []
    };

    constructor(props) {
        super(props);
        this.initCatalogueOfGoods();
        this.addToBucketEvent = this.addToBucketEvent.bind(this);
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

    render() {

        return (
            <List className="catalogue-good-list"
                  grid={{gutter: 1, column: 4}}
                  dataSource={this.state.goods}
                  renderItem={item => (
                      <List.Item
                          key={item.id}
                      >
                          <Card className="advertisement" hoverable
                                style={{width: 240}}
                                cover={<img alt="example" align="middle"
                                            src={item.imageUrl}/>}
                                style={{width: 300, marginTop: 16}}
                                actions={[
                                    <button onClick={(e) => this.addToBucketEvent(e, item.id)}>Добавить в
                                        корзину</button>
                                ]}
                          >
                              <Meta title={item.name} description={<div>Цена: {item.currentPrice}$</div>}/>
                          </Card>
                      </List.Item>
                  )}
            />
        )
    }
}

export default Catalogue;


