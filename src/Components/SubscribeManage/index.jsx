import React from 'react';
import { Card, Switch, Row, message  } from 'antd';
import { get, post } from "../../Utils/fetch";
import LoginVerify from '../LoginVerify';

import './style.css';

class SubscribeManage extends React.PureComponent {
    state = {};

    componentDidMount() {
        get('subscribe').then(
            (response) => {
                if (response.success) {
                    const {
                        subscribeExpireTime,
                        subscribe,
                        mail,
                        phone,
                        message,
                        subMail,
                        receivedad,
                        receivedcad,
                        biweekly,
                        aviationInfo,
                        radio,
                        elt,
                        license,
                        auth,
                        external } = response.data[0];
                    console.log(response.data[0]);
                    this.setState({
                        loading: false,
                        subscribeExpireTime,
                        subscribe,
                        mail,
                        phone,
                        message,
                        subMail,
                        receivedad,
                        receivedcad,
                        biweekly,
                        aviationInfo,
                        radio,
                        elt,
                        license,
                        auth,
                        external
                    });
                } else {
                    message.error(response.info);
                }

            }
        );
    }

    handleStatusChange(key) {
        const data = this.state[key];
        console.log(data);
        let json ={};
        json[key] = !data;
        post('subscribe', json).then(
            response => {
                if(response.success) {
                    this.setState(json);
                    const cn = {
                        message: "短信",
                        subMail: '邮件',
                        receivedad: "AD",
                        receivedcad: "CAD",
                        biweekly: "双周刊",
                        aviationInfo: "适航规章",
                        radio: "无线电台执照",
                        elt: "ELT",
                        license: "人员执照管理",
                        auth: "人员授权管理",
                        external: "外来文件监控"
                    };
                    message.success(`${cn[key]} 订阅状态修改为 ${!data ? '订阅' : '不订阅'}`);
                } else {
                    message.error(response.info);
                }
            }
        )

    }

    render () {
        const {
            mail,
            phone,
            message,
            subMail,
            receivedad,
            receivedcad,
            biweekly,
            aviationInfo,
            radio,
            elt,
            license,
            auth,
            external
        } = this.state;
        return (
            <Card bordered={false}>
                <LoginVerify/>
                <div>
                    <div className="list">
                        <Row>
                            <p>
                                <span>订阅到期时间:</span>
                                <span>2019年3月31日 23:59:59</span>
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
                                <span>短信提醒: <sub>(目前，仅自定义订阅规则的CAD/EASA AD和到期提醒类会短信通知，<strong>每月有10条免费短信额度</strong>)</sub></span>
                                <span>
                                    <Switch
                                        checked={message}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('message');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>邮件提醒: <sub>(如果您关闭了此项，本行以下的内容，即使您订阅，也不会给您发送邮件)</sub></span>
                                <span>
                                    <Switch
                                        checked={subMail}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('subMail');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAD订阅:<sub><a href="http://www.caacaad.org.cn/" target="_blank" rel="noopener noreferrer">适航指令查询</a></sub></span>
                                <span>
                                    <Switch
                                        checked={receivedcad}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('receivedcad')
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>EASA AD订阅:<sub><a href="https://ad.easa.europa.eu/mcai-docs/page-1" target="_blank" rel="noopener noreferrer">EASA Safety Publications Tool</a></sub></span>
                                <span>
                                    <Switch
                                        checked={receivedad}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('receivedad');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAD双周刊订阅:<sub><a href="http://www.caacaad.org.cn/biweekly.php" target="_blank" rel="noopener noreferrer">适航指令双周刊</a></sub></span>
                                <span>
                                    <Switch
                                        checked={biweekly}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('biweekly');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAAC 信息订阅:<sub><a href="http://www.caac.gov.cn/XXGK/XXGK/index_172.html?fl=13" target="_blank" rel="noopener noreferrer">中国民用航空局政府信息公开</a>(注：测试阶段，服务存在不稳定的情况)</sub></span>
                                <span>
                                    <Switch
                                        checked={aviationInfo}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('aviationInfo');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>人员执照管理订阅:</span>
                                <span>
                                    <Switch
                                        checked={license}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('license');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>人员授权管理订阅:</span>
                                <span>
                                    <Switch
                                        checked={auth}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('auth');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>电台执照到期订阅:</span>
                                <span>
                                    <Switch
                                        checked={radio}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('radio');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>ELT到期订阅:</span>
                                <span>
                                    <Switch
                                        checked={elt}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('elt');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>外来文件监控订阅:</span>
                                <span>
                                    <Switch
                                        checked={external}
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onClick={() => {
                                            this.handleStatusChange('external');
                                        }}
                                    />
                                </span>
                            </p>
                        </Row>
                    </div>
                </div>
            </Card>
        );
    }
}

export default SubscribeManage;