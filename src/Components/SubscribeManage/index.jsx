import React from 'react';
import { Card, Switch, Icon, Row  } from 'antd';
import { getItem } from "../../Utils/storage";
import { get } from "../../Utils/fetch";

class SubscribeManage extends React.PureComponent {
    state = {
        info: null,
        isLoading: true
    };

    componentDidMount = () => {
        const _id = getItem("_id");
        get('user/info', {_id}).then(
            (info) => {
                if (info) {
                    this.setState({
                        info: info,
                        isLoading: false,
                    });
                } else {
                    console.log("something wrong")
                }

            }
        );
    };

    render () {
        return (
            <Card bordered={false}>
                <div>
                    <h3 style={{ marginBottom: 16 }}>订阅信息</h3>
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
                                <span>mail@flyce.cn<Icon type="edit" /></span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>CAD订阅:</span>
                                <span><Switch defaultChecked/></span>
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <span>AD订阅:</span>
                                <span><Switch disabled={true} /></span>
                            </p>
                        </Row>
                    </div>
                </div>
            </Card>
        );
    }
};

export default SubscribeManage;