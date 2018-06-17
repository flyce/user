import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Dropdown, Icon, Menu, Row, Col, Select, Form, Input, Table, Badge, Divider, Modal, } from 'antd';
import './style.css'
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
            handleModalVisible();
        });
    };
    return (
        <Modal
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规则">
                {form.getFieldDecorator('rule', {
                    rules: [{ required: true, message: 'Please input some rule...' }],
                })(<Input placeholder="请输入规则" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('description', {
                    rules: [{ message: 'Please input some description...' }],
                })(<Input placeholder="请输入描述" />)}
            </FormItem>
        </Modal>
    );
});

class UserRule extends PureComponent {
    state = {
        modalVisible: false,
        data: [
            {
                _id: '1111',
                rule: "B737",
                description: "这是一段描述",
                callNo: "11",
                status: "运行中",
                updatedAt: Date.now(),
            }
        ]
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleAdd = data => {
        const arr = this.state.data;
        data.callNo = 11;
        data.status = "运行中";
        data.updatedAt = Date.now();
        data._id = Math.random() * 10;
        arr.push(data);
        this.setState ({
            data: arr
        });
    };

    handleRemove = value => {
        const data = this.state.data.filter(res => res.rule != value.rule)
        this.setState({
            data
        });
    };

    render () {
        const columns = [
            {
                title: '规则',
                dataIndex: 'rule',
                key: 'rule'
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '创建时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                sorter: true,
                render: val => <span>{val}</span>,
            },
            {
                title: '操作',
                render: (vaule) => (
                    <Fragment>
                        {/*<Button onClick={() => {console.log(vaule)}}>停用</Button>*/}
                        {/*<Divider type="vertical" />*/}
                        <Button onClick={() => {this.handleRemove(vaule)}}>删除</Button>
                    </Fragment>
                ),
            },
        ];

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };


        return (
            <div>
                <Card bordered={false}>
                    <div className={"tableList"}>
                        <div className={"tableListForm"}>
                            <Form  layout="inline">
                                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                    <Col md={8} sm={24}>
                                        <FormItem label="规则编号">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col md={8} sm={24}>
                                        <FormItem label="使用状态">

                                            <Select placeholder="请选择" style={{ width: '100%' }}>
                                                <Option value="0">关闭</Option>
                                                <Option value="1">运行中</Option>
                                            </Select>

                                        </FormItem>
                                    </Col>
                                    <Col md={8} sm={24}>
                                    <span className={"submitButtons"}>
                                        <Button type="primary">
                                            查询
                                        </Button>
                                        <Button style={{ marginLeft: 8 }}>
                                            重置
                                        </Button>
                                    </span>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className={"tableListOperator"}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                        </div>
                        <Table columns={columns} dataSource={this.state.data} rowKey={record => record._id} />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey />
            </div>
        );
    }
};

export default UserRule;