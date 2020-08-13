import React from 'react';
import {Spin, Icon} from 'antd';
import SyncOutlined from "@ant-design/icons/lib/icons/SyncOutlined";

export default function LoadingIndicator(props) {

    const antIcon = <SyncOutlined spin style={{fontSize: 30}}/>;
    return (
        <div className={props.className}>
            <div className="loading-div">
                <h1>Пожалуйста, подождите...</h1>
                <Spin className="loading-icon" indicator={antIcon} style={{display: 'block', textAlign: 'center'}}/>
            </div>
        </div>
    );
}