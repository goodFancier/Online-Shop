import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {requestSmsCode} from "../util/APIUtils";
import {notification} from "antd";

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state;

            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes !== 0) {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    requestCodeAgain(event, phone) {
        event.preventDefault();
        this.setState(({
            minutes: 1,
            seconds: 0
        }));
        requestSmsCode({phone: phone})
            .then().catch(error => {
            notification.error({
                message: 'De/Li',
                description: error.message || 'Извините! Что-то пошло не так. Пожалуйста, попробуйте ещё раз!'
            });
        });
    }

    render() {
        const {minutes, seconds} = this.state;
        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? <div>
                        <a className="request-code-again" onClick={(e) => this.requestCodeAgain(e, this.props.phone)}>Запросить код повторно</a>
                    </div>
                    : <div>Запросить смс еще раз можно через: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                }
            </div>
        )
    }
}