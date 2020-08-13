import React, {Component} from "react";
import {Card} from 'antd'

const { Meta } = Card;

class RetailersCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retailers: props.retailers,
            key: props.key,
        }
    }
    render() {
        return (
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="Logo" src={this.state.retailers.imageUrl} />}
            >
                <Meta title={this.state.retailers.name} />
            </Card>
        )
    }
}
export default RetailersCard;

