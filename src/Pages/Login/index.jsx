import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./index.css"
import { Form, Input, Row, Button, Icon, Tooltip } from "antd/lib/index";
import { post } from '../../Utils/fetch';
import { setItem, getItem } from "../../Utils/storage";
import history from '../../Router/history';

const FormItem = Form.Item;


class NLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            submitButtonDisabled: true
        }
    }

    handleTextChange(event) {
        if (event.target.name === 'username') {
            this.setState({
                username: event.target.value
            });

            // submit button disabled control
            if (this.state.password.length > 0 && event.target.value.length > 0) {
                this.setState({
                    submitButtonDisabled: false
                });
            } else {
                this.setState({
                    submitButtonDisabled: true
                });
            }
        } else {
            this.setState({
                password: event.target.value
            });

            // submit button disabled control
            if (this.state.username.length > 0 && event.target.value.length > 0) {
                this.setState({
                    submitButtonDisabled: false
                });
            } else {
                this.setState({
                    submitButtonDisabled: true
                });
            }
        }
    }

    handleLogin() {
        // 登陆验证逻辑
        post(
            'user/login',
            {
                "username": this.state.username,
                "password": this.state.password
            }).then(
                (response) => {
                    if (response.success) {
                        setItem("token", response.token);
                        setItem("username", this.state.username);
                        setItem("_id", response._id);
                        setItem("loginTime", Math.floor(Date.now()/1000));
                        const token = getItem("token");
                        if (token.length > 0) {
                            history.push('/');
                        }
                    } else {
                        console.log(response);
                    }
                }
            );
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="form">
                <div className="logo">
                    <img alt="logo" src="#" />
                    <span>Iris Studio</span>
                </div>
                <form>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' ,}],
                        })(
                            <Input name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onChange={this.handleTextChange.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={this.handleTextChange.bind(this)} />
                        )}
                    </FormItem>
                    <Row>
                        <Button
                            disabled={this.state.submitButtonDisabled}
                            type="primary"
                            onClick={this.handleLogin.bind(this)}>
                            登录
                        </Button>
                        <p>
                            <span><Link to="register">注册账号</Link></span>
                            <Tooltip title="功能开发中，如忘记密码请与管理员联系！">
                                <span>忘记密码？</span>
                            </Tooltip>
                        </p>
                    </Row>

                </form>
            </div>
        );
    }
}

const Login = Form.create()(NLoginForm);
export default Login;