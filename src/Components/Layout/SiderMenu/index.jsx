import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_748212_rdcreh7eees.js",
});

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.path]} defaultOpenKeys={[]}>
                        <Menu.Item key="center">
                            <Icon type="user" />
                            <span className="nav-text">个人中心</span>
                            <Link to={"center"}/>
                        </Menu.Item>
                        <Menu.Item key="disclaimer">
                            <Icon type="read" />
                            <span className="nav-text">免责申明</span>
                            <Link to={"disclaimer"}/>
                        </Menu.Item>
                        <Menu.Item key="aircraft">
                            <IconFont type="icon-aircraft1" />
                            <span className="nav-text">航空器信息</span>
                            <Link to={"aircraft"}/>
                        </Menu.Item>
                        <SubMenu key="ad" title={<span><Icon type="mail" /><span>订阅管理</span></span>}>
                            <Menu.Item key="info">
                                <Icon type="desktop" />
                                <span className="nav-text">订阅方式管理</span>
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
                        <SubMenu key="people" title={<span><Icon type="team" /><span>人员执照管理&nbsp;&nbsp;<sup>new</sup></span></span>}>
                            <Menu.Item key="license">
                                <Icon type="disconnect" />
                                <span className="nav-text">到期预警</span>
                                <Link to={"license"}/>
                            </Menu.Item>
                            <Menu.Item key="licenselist">
                                <Icon type="profile" />
                                <span className="nav-text">人员执照详情</span>
                                <Link to={"licenselist"}/>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="authorization">
                            <Icon type="profile" />
                            <span className="nav-text">人员授权管理&nbsp;&nbsp;<sup>new</sup></span>
                            <Link to={"authorization"}/>
                        </Menu.Item>
                        <SubMenu key="ra" title={<span><Icon type="wifi" /><span>电台执照管理</span></span>}>
                            <Menu.Item key="radio">
                                <Icon type="disconnect" />
                                <span className="nav-text">到期预警</span>
                                <Link to={"radio"}/>
                            </Menu.Item>
                            <Menu.Item key="radiolist">
                                <Icon type="profile" />
                                <span className="nav-text">电台执照清单</span>
                                <Link to={"radiolist"}/>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="elt" title={<span><Icon type="rocket" /><span>ELT管理</span></span>}>
                            <Menu.Item key="elt">
                                <Icon type="clock-circle-o" />
                                <span className="nav-text">到期预警</span>
                                <Link to={"elt"}/>
                            </Menu.Item>
                            <Menu.Item key="eltinfo">
                                <Icon type="folder" />
                                <span className="nav-text">基本信息</span>
                                <Link to={"eltinfo"}/>
                            </Menu.Item>
                            <Menu.Item key="eltimport">
                                <Icon type="file-excel" />
                                <span className="nav-text">ELT录入</span>
                                <Link to={"eltimport"}/>
                            </Menu.Item>
                            <Menu.Item key="cospass">
                                <Icon type="bulb" />
                                <span className="nav-text">Cospas decoder</span>
                                <Link to={"cospass"}/>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="jufang" title={<span><Icon type="rocket" /><span>局方文件</span></span>}>
                            <Menu.Item key="document">
                                <Icon type="file-pdf" />
                                <span className="nav-text">局方文件查询</span>
                                <Link to={"document"}/>
                            </Menu.Item>
                            <Menu.Item key="cadquery">
                                <Icon type="book" />
                                <span className="nav-text">适航指令查询</span>
                                <Link to={"cadquery"}/>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="timeline">
                            <Icon type="exception" />
                            <span className="nav-text">开发日志 V2.1</span>
                            <Link to={"timeline"}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderMenu;