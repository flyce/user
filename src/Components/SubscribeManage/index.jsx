import React from 'react';
import { Card, Switch, Row, message  } from 'antd';
import { get, post } from "../../Utils/fetch";
import LoginVerify from '../LoginVerify';

import './style.css';

class SubscribeManage extends React.PureComponent {
    state = {
        info: null
    };

    componentDidMount() {
        get('user/info').then(
            (response) => {
                if (response.success) {
                    this.setState({
                        mail: response.mail,
                        receivedcad: response.receivedcad,
                        receivedad: response.receivedad,
                        receivednote: response.receivednote,
                        receivedmessage: response.receivedmessage,
                        subscribe: response.subscribe,
                        phone: response.phone,
                        subscribeExpireTime: response.subscribeExpireTime
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

    handleChangeNote() {
        const { receivednote } = this.state;
        this.setState({
            receivednote: !receivednote
        });
        post('user/info', {
            receivednote: !receivednote
        }).then((response) => {
            if(response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        });
    }

    handleChangeMessage() {
        const { receivedmessage } = this.state;
        this.setState({
            receivedmessage: !receivedmessage
        });
        post('user/info', {
            receivedmessage: !receivedmessage
        }).then((response) => {
            if(response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        });
    }

    render () {
        const { mail, receivedcad, receivedad, receivednote, receivedmessage, phone } = this.state;
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
                                <span>手机号:</span>
                                <span>{phone}</span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAD订阅:<sub><a href="http://www.caacaad.org.cn/" target="_blank" rel="noopener noreferrer">CAAC网址</a></sub></span>
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
                                <span>EASA AD订阅:<sub><a href="https://ad.easa.europa.eu/mcai-docs/page-1" target="_blank" rel="noopener noreferrer">EASA网址</a></sub></span>
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
                        <Row>
                            <p>
                                <span>CAAC 信息订阅:<sub><a href="http://www.caac.gov.cn/XXGK/XXGK/index_172.html?fl=13" target="_blank" rel="noopener noreferrer">caac网址</a></sub></span>
                                <span>
                                    <Switch
                                        checked={receivednote}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeNote.bind(this)}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>授权管理订阅:<sub>包括人员执照管理和人员授权管理</sub></span>
                                <span>
                                    <Switch
                                        checked={receivednote}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeNote.bind(this)}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>航空器信息管理订阅:<sub>包括电台执照，ELT到期</sub></span>
                                <span>
                                    <Switch
                                        checked={receivednote}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeNote.bind(this)}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>短信提醒: <sub>(仅到期提醒和您按规则定制的CAD/EASA AD内容会通过短信的方式提醒您)</sub></span>
                                <span>
                                    <Switch
                                        disabled
                                        checked={receivedmessage}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={this.handleChangeMessage.bind(this)}
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