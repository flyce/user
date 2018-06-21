import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import LoginVerify from '../LoginVerify';
import { post, get } from "../../Utils/fetch";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};


class PersonalCenter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "wangquanfeng",
            name: "王全峰",
            company: "Iris Studio",
            position: "worker",
            phone: "1719222622",
            mail: "mail@flyce.cn"
        }
    }

    componentDidMount() {
        get('user/info').then(
            res => {
                const { username, name, company, position, phone, mail } = res;
                this.setState({
                    username,
                    name,
                    company,
                    position,
                    phone,
                    mail
                })
            }
        )
    };

    handleSubmit = () => {
        const { mail, phone } = this.state;
        post('user/info', {mail, phone}).then(
            res => {
              console.log(res);
            }
        );
    };

    handleTextChange(event) {
        if (event.target.name === 'mail') {
            this.setState({
                mail: event.target.value
            });
        } else {
            this.setState({
                phone: event.target.value
            });
        }
    }

    render() {
        const { username, name, company, position, phone, mail } = this.state;
        return (
            <Card bordered={false}>
                <LoginVerify />
                <FormItem {...formItemLayout} label="用户名">
                    <Input value={username} disabled={true}/>
                </FormItem>
                <FormItem {...formItemLayout} label="姓名">
                    <Input value={name} disabled={true}/>
                </FormItem>
                <FormItem {...formItemLayout} label="公司">
                    <Input value={company} disabled={true}/>
                </FormItem>
                <FormItem {...formItemLayout} label="职位">
                    <Input value={position} disabled={true}/>
                </FormItem>
                <FormItem {...formTailLayout} >
                    <span >
                        以上信息不支持修改，特殊情况请联系管理员。
                    </span>
                </FormItem>
                <FormItem {...formItemLayout} label="邮箱">
                    <Input value={mail} onChange={this.handleTextChange.bind(this)} name="mail"/>
                </FormItem>
                <FormItem {...formItemLayout} label="手机号">
                    <Input value={phone} onChange={this.handleTextChange.bind(this)} name="phone"/>
                </FormItem>
                <FormItem {...formTailLayout} >
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                        更新信息
                    </Button>
                </FormItem>
            </Card>
        );
    }
};

export default PersonalCenter;