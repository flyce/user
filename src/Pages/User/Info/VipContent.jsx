import React from 'react';
import { Switch, Icon, Row } from 'antd';
import './VipContent.css';

class VipContent extends React.Component{
    onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    render() {
        const { userInfo } = this.props;
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>订阅信息</h3>
                <div className="list">
                    <Row>
                        <p>
                            <span>订阅到期时间:</span>
                            <span>2018年12月31日 23:59:59</span>
                            {/*<span>{userInfo.subscribeExpireTime}</span>*/}
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <span>邮箱:</span>
                            <span>{userInfo.mail}<Icon type="edit" /></span>
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <span>CAD订阅:</span>
                            <span><Switch defaultChecked={userInfo.receivedcad} onChange={this.onChange} /></span>
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
        );
    }

};

export default VipContent;