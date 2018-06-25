import React from 'react';
import { Card, Switch, Row, message  } from 'antd';
import { get, post } from "../../Utils/fetch";
import LoginVerify from '../LoginVerify';

import './style.css';

class SubscribeManage extends React.PureComponent {
    state = {
        info: null,
        isLoading: true
    };

    componentDidMount() {
        get('user/info').then(
            (response) => {
                if (response.success) {
                    this.setState({
                        mail: response.mail,
                        receivedcad: response.receivedcad,
                        receivedad: response.receivedad,
                        subscribe: response.subscribe,
                        subscribeExpireTime: response.subscribeExpireTime,
                        isLoading: false,
                    });
                } else {
                    message.error(response.info);
                }

            }
        );
    }

    handleChangeCad() {
        const { receivedcad } = this.state;
        this.setState({
            receivedcad: !receivedcad
        });
        post('user/info', {
            receivedcad: !receivedcad
        }).then((response) => {
            if(response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        })
    }

    handleChangeAd() {
        const { receivedad } = this.state;
        this.setState({
            receivedad: !receivedad
        });
        post('user/info', {
            receivedad: !receivedad
        }).then((response) => {
            if(response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        });
    }

    render () {
        if(this.state.isLoading) {
            return <div>Loading...</div>
        }
        const { mail, receivedcad, receivedad } = this.state;
        return (
            <Card bordered={false}>
                <LoginVerify/>
                <div>
                    <div className="list">
                        <Row>
                            <p>
                                <span>订阅到期时间:</span>
                                <span>2018年12月31日 23:59:59</span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>邮箱:</span>
                                <span>{mail}</span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAD订阅:</span>
                                <span>
                                    <Switch
                                        checked={receivedcad}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeCad.bind(this)}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>EASA AD订阅:</span>
                                <span>
                                    <Switch
                                        checked={receivedad}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeAd.bind(this)}
                                    />
                                </span>
                            </p>
                        </Row>
                    </div>
                </div>
            </Card>
        );
    }
};

export default SubscribeManage;