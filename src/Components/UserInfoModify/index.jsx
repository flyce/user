import React from 'react';
import { Modal, Button, Form, Icon, Input, Checkbox  } from 'antd';
const FormItem = Form.Item;


class UserInfoModify extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Open</Button>
                <Modal title="修改用户信息"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <Form className="login-form">
                        <FormItem>
                            仅需在您想修改的输入框输入即可
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('company', {
                                rules: [{ required: true, message: 'Please input your position!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="公司" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('position', {
                                rules: [{ required: true, message: 'Please input your position!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="职位" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('position', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('position', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="密码" placeholder="公司" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(UserInfoModify);
export default WrappedNormalLoginForm;