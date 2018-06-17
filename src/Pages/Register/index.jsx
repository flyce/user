import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { Form, Input, Row, Button, Icon} from "antd/lib/index";

const FormItem = Form.Item;


class NRegisterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="regform">
                <div className="logo">
                    <img alt="logo" src="#" />
                    <span>Iris Studio</span>
                </div>
                <form>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('company', {
                            rules: [{ required: true, message: 'Please input your company name!' }],
                        })(
                            <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="公司（全称）" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('position', {
                            rules: [{ required: true, message: 'Please input your position!' }],
                        })(
                            <Input prefix={<Icon type="laptop" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="职务" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('mail', {
                            rules: [{ required: true, message: 'Please input your mail address!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('checkpassword', {
                            rules: [{ required: true, message: 'Please input your Password again!' }],
                        })(
                            <Input prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次输入密码" />
                        )}
                    </FormItem>
                    <Row>
                        <Button type="primary">
                            注册
                        </Button>
                        <p>
                            <span><Link to="login">返回登录</Link></span>
                        </p>
                    </Row>
                </form>
            </div>
        );
    }
}

const Register = Form.create()(NRegisterForm);
export default Register;