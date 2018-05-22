import React, { Component } from 'react';
import { Layout } from 'antd';
import "./index.css";
import { Menu } from 'antd';
const { Header} = Layout;

class Head extends Component {
    state = {
        current: 'homepage',
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
                <Header style={{background: "#FFF"}}>
                    <div>
                        <a id="logo" href="/index-cn">
                            <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            <img alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg" />
                        </a>
                    </div>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: "right"}}
                    >
                        <Menu.Item key="homepage">
                            首页
                        </Menu.Item>
                        <Menu.Item key="price">
                            价格
                        </Menu.Item>
                        <Menu.Item key="help">
                            帮助
                        </Menu.Item>

                        <Menu.Item key="login">
                            <a href="" target="" rel="noopener noreferrer">登录</a>
                        </Menu.Item>
                    </Menu>
                </Header>
        );
    }
}

export default Head;