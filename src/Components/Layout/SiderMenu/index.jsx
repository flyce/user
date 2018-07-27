import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.path]} defaultOpenKeys={['ad', 'elt']}>
                        <Menu.Item key="center">
                            <Icon type="user" />
                            <span className="nav-text">个人中心</span>
                            <Link to={"center"}/>
                        </Menu.Item>
                        <Menu.Item key="aircraft">
                            <Icon><i className="iconfont icon-plane" style={{ fontSize: 16 }}></i></Icon>
                            <span className="nav-text">航空器信息</span>
                            <Link to={"aircraft"}/>
                        </Menu.Item>
                        <SubMenu key="ad" title={<span><Icon type="mail" /><span>适航指令订阅</span></span>}>
                            <Menu.Item key="info">
                                <Icon type="desktop" />
                                <span className="nav-text">订阅管理</span>
                                <Link to={"info"}/>
                            </Menu.Item>
                            <Menu.Item key="cadrule">
                                <Icon type="appstore-o" />
                                <span className="nav-text">CAAC CAD规则管理</span>
                                <Link to={"cadrule"}/>
                            </Menu.Item>
                            <Menu.Item key="adrule">
                                <Icon type="appstore-o" />
                                <span className="nav-text">EASA AD规则管理</span>
                                <Link to={"adrule"}/>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="elt" title={<span><Icon type="clock-circle-o" /><span>ELT管理</span></span>}>
                            <Menu.Item key="eltinfo">
                                <Icon type="folder" />
                                <span className="nav-text">基本信息</span>
                                <Link to={"eltinfo"}/>
                            </Menu.Item>
                            <Menu.Item key="import">
                                <Icon type="file-excel" />
                                <span className="nav-text">ELT录入</span>
                                <Link to={"import"}/>
                            </Menu.Item>
                            <Menu.Item key="com">
                                <Icon type="bulb" />
                                <span className="nav-text">Compass decoder</span>
                                <Link to={"import"}/>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderMenu;