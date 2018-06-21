import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;

class SiderMenu extends PureComponent {
    state = {
        modalVisible: false,
    };

    render() {
        const { logo, collapsed, onCollapse } = this.props;
        return (
            <div>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    width={256}
                    className="sider"
                    onCollapse={onCollapse}
                >
                    <div className="logo" key="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            <h1>IRIS STUDIO</h1>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.path]}>
                        <Menu.Item key="info">
                            <Icon type="desktop" />
                            <span className="nav-text">订阅管理</span>
                            <Link to={"info"}/>
                        </Menu.Item>
                        <Menu.Item key="rule">
                            <Icon type="appstore-o" />
                            <span className="nav-text">规则管理</span>
                            <Link to={"rule"}/>
                        </Menu.Item>
                        <Menu.Item key="center">
                            <Icon type="user" />
                            <span className="nav-text">个人中心</span>
                            <Link to={"center"}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderMenu;