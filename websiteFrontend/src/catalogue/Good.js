import React, {Component} from 'react'
import './Good.css';
import {Table, Card, Row, List, Button, notification, Col} from 'antd';
import {getCatalogueOfGoods, addToBucket, getUserProfile} from "../util/APIUtils";
import {formatDate} from "../util/Helpers";
import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import {getGoodById} from "../util/APIUtils"


const {Column, ColumnGroup} = Table;
const {Meta} = Card;

class Good extends Component {
    constructor(props) {
        super(props);
        this.state = {
            good: null
        };
        this.loadGoodCard = this.loadGoodCard.bind(this);
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
                            <div>
                                <Row>
                                    <b className="good-title">{this.state.good.name}</b>
                                </Row>
                                <Row type="flex">
                                    <Col span={8} className="order-table">
                                        <div className="imageBorder">
                                            <img className="good-panel-good-img" alt="example" align="middle"
                                                 src={this.state.good.imageUrl}/>
                                        </div>
                                    </Col>
                                    <Col span={10} className="order-table">
                                        <b>{this.state.good.name}</b>
                                    </Col>
                                </Row>
                            </div>) : null
                    }
                </div>
            </Row>
        )
    }
}

export default Good;


