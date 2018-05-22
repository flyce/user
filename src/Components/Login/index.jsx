import React, { Component } from 'react';
import { Card } from 'antd';
import "./index.css"
import LoginModule from "./LoginModule";
import RegisterModule from "./RegisterModule";

const tabListNoTitle = [{
    key: 'login',
    tab: '登陆',
}, {
    key: 'register',
    tab: '注册',
}];

const contentListNoTitle = {
    login: <LoginModule/>,
    register: <RegisterModule />
};

class Login extends Component {
    state = {
        key: 'login'
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div className={"login"}>
                <Card
                    style={{ minWidth: '350px' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentListNoTitle[this.state.key]}
                </Card>
            </div>
        );
    }
}

export default Login;