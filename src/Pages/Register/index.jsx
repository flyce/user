import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import {Form, Input, Row, Button, Icon, message} from "antd/lib/index";
import logo from '../../assets/logo.svg';
import { post } from "../../Utils/fetch";
import history from "../../Router/history";

const FormItem = Form.Item;

class NRegisterForm extends Component {
    state = {
        buttonDisabled: true
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            if(fieldsValue.password) {
                post('cli/register', fieldsValue).then(
                    response => {
                        if(response.success) {
                            message.success(response.info);
                            this.props.form.resetFields();
                            history.push('/login')
                        } else {
                            message.error(response.info);
                        }
                    }
                )
            } else {
                message.error("两次密码不一致！");
            }
        });
    }

    verifyCaptcha() {
        // 直接生成一个验证码对象
        const captcha = new window.TencentCaptcha('2005711029', function(res) {
            if(res.ret === 0){
                console.log(res);
                this.setState({
                    buttonDisabled: false
                });
            }
        }.bind(this));
        captcha.show(); // 显示验证码
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="regform">
                <div className="loginlogo">
                    <img alt="logo" src={logo} />
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
                            rules: [{ required: true, message: 'Please input your mail address!' },{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}', message: 'The input is not valid phone number!' }],
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
                        <Button onClick={this.verifyCaptcha.bind(this)}>人机验证</Button>
                    </FormItem>
                    <Row>
                        <Button type="primary" disabled={this.state.buttonDisabled} onClick={this.handleSubmit.bind(this)}>
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