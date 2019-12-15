import React, {Component} from 'react'
import './Offers.css';
import {Carousel} from 'antd';
import {loadPublicOffers} from "../util/APIUtils";

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
            this.setState({
                publicOffers: response
            })
        }).catch(error => {
        });
    }

    getBooklets() {
        let bookletList = [];
        for (let i = 0; i < this.state.publicOffers.length; i++) {
            bookletList.push(<div className="board-row"><img src={this.state.publicOffers[i].imageUrl}/></div>);
        }
        return bookletList;
    }

    render() {
        return (
            <Carousel autoplay={false} swipe={true} arrows={true}>
                {this.getBooklets()}
            </Carousel>
        )
    }
}

export default Offers;


