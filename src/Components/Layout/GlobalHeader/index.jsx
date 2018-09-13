import React, { PureComponent } from 'react';
import { Menu, Icon, Dropdown, Avatar, Tooltip, Form, Modal, Input, message } from 'antd';
import { Link } from "react-router-dom";
import './style.css';
import { post } from "../../../Utils/fetch";
import { getItem } from "../../../Utils/storage";

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (fieldsValue.password.length > 0) {
                if (err) return;
                form.resetFields();
                if (fieldsValue.password === fieldsValue.verifypassword) {
                    handleAdd(fieldsValue);
                    handleModalVisible();
                } else {
                   message.error("两次密码不一致!");
                }
            }
        });
    };
    return (
        <Modal
            title="修改密码"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
                {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input some rule...' }],
                })(<Input placeholder="请输入密码" type="password"/>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
                {form.getFieldDecorator('verifypassword', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(<Input placeholder="请再输一遍" type="password"/>)}
            </FormItem>
        </Modal>
    );
});


export default class GlobalHeader extends PureComponent {
    state ={
        modalVisible: false,
        username:  this.props.username || 'Username' ,
    };

    componentDidMount() {
        const username = getItem("username");
        this.setState({
            username
        });
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    // @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }


    handleAdd = data => {
        this.setState({
            modalVisible: true
        });
        post('user/update', {
            password: data.password
        }).then(response => {
            if(response.success) {
                message.success(response.info);
            }
        })
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    render() {
        const {
            collapsed,
            onMenuClick,
        } = this.props;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        const menu = (
            <Menu className={"menu"} selectedKeys={[]} onClick={onMenuClick}>
                {/*<Menu.Item disabled>*/}
                    {/*<Link to={'/user/center'}>*/}
                        {/*<Icon type="user" />个人中心*/}
                    {/*</Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item disabled>*/}
                    {/*<Icon type="setting" />设置*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="password"
                    onClick={this.handleAdd}
                >
                    <Icon type="edit" />修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Link to={"/logout"} ><Icon type="logout" />退出登录</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"header"}>
                <Icon
                    className={"trigger"}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={"right"}>
                    <Tooltip title="使用文档">
                        <a
                            // target="_blank"
                            href="/"
                            rel="noopener noreferrer"
                            className={"action"}
                        >
                            <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                    <Dropdown overlay={menu}>
                      <span className={"action account"}>
                        <Avatar size="small" className={"avatar"} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        <span className={"name"}>{this.state.username}</span>
                      </span>
                    </Dropdown>
                    {/*<Spin size="small" style={{ marginLeft: 8 }} />*/}
                </div>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey />
            </div>
        );
    }
}
