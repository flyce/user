import React from 'react';

import { Card, Table, message, Icon, Form, Modal, Button, Input, DatePicker, Popconfirm } from 'antd';
import LoginVerify from '../LoginVerify';
import moment from 'moment';

import { get, post } from '../../Utils/fetch';

const Search = Input.Search;

const FormItem = Form.Item;
const formItemLayout = {
    span: '8'
};

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate, handleDelete, create, handleInit } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            fieldsValue.evaluationDate = Math.floor(new Date(fieldsValue.evaluationDate._d).getTime() / 1000);
            fieldsValue.authDate = Math.floor(new Date(fieldsValue.authDate._d).getTime() / 1000);
            fieldsValue.expiredDate = Math.floor(new Date(fieldsValue.expiredDate._d).getTime() / 1000);
            fieldsValue.evaluationDate1 = fieldsValue.evaluationDate1 ? Math.floor(new Date(fieldsValue.evaluationDate1._d).getTime() / 1000) : null;
            fieldsValue.authDate1 = fieldsValue.authDate1 ? Math.floor(new Date(fieldsValue.authDate1._d).getTime() / 1000) : null;
            fieldsValue.evaluationDate2 = fieldsValue.evaluationDate2 ? Math.floor(new Date(fieldsValue.evaluationDate2._d).getTime() / 1000) : null;
            fieldsValue.authDate2 = fieldsValue.authDate2 ? Math.floor(new Date(fieldsValue.authDate2._d).getTime() / 1000) : null;
            fieldsValue.evaluationDate3 = fieldsValue.evaluationDate3 ? Math.floor(new Date(fieldsValue.evaluationDate3._d).getTime() / 1000): null;
            fieldsValue.authDate3 = fieldsValue.evaluationDate3 ? Math.floor(new Date(fieldsValue.evaluationDate3._d).getTime() / 1000) : null;
            if (err) return;
            form.resetFields();
            if(create) {
                post('user/authorization', fieldsValue).then(response => {
                    if(response.success) {
                        message.info(response.info);
                        handleInit();
                    } else {
                        message.warning(response.info);
                    }
                });
            } else {
                handleUpdate({_id: value._id, ...fieldsValue});
            }
            handleModalVisible();
        });
    };

    const title = create ? "新增人员信息" : "人员信息修改";
    const footer = create ? [
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ] : [
        <Popconfirm title="确定删除?" onConfirm={() => {handleDelete(value._id)}} okText="确定" cancelText="取消">
            <Button key="reset" type="danger" ghost>
                删除
            </Button>
        </Popconfirm>,
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ];

    return (
        <Modal
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width="80%"
            style={{ top: 20 }}
            footer={footer}
        >
            <Form
                style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
            >
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入姓名',
                        }],
                        initialValue: value.name
                    })(
                        <Input placeholder="请输入姓名"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="执照专业"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('major', {
                        rules: [{
                            required: true, message: '请输入执照专业',
                        }],
                        initialValue: value.major
                    })(
                        <Input placeholder="请输入执照专业"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中心"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('center', {
                        rules: [{
                            required: true, message: '请输入中心',
                        }],
                        initialValue: value.center
                    })(
                        <Input placeholder="请输入中心"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="岗位"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('position', {
                        rules: [{
                            required: true, type: 'string', message: '请输入岗位',
                        }],
                        initialValue: value.position
                    })(
                        <Input placeholder="请输入岗位"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="授权项目"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('project', {
                        rules: [{
                            required: true, type: 'string', message: '请输入岗位',
                        }],
                        initialValue: value.project
                    })(
                        <Input placeholder="请输入岗位"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="评估日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('evaluationDate', {
                        rules: [{
                            required: true, message: '请选择最新一次颁发/续签日期',
                        }],
                        initialValue: moment.unix(value.evaluationDate)
                    })(
                        <DatePicker placeholder="请选择最新一次颁发/续签日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="授权日期"
                    className="item"
                >
                    {form.getFieldDecorator('authDate', {
                        rules: [{
                            required: true, message: '请选择执照到期日期',
                        }],
                        initialValue: moment.unix(value.authDate)
                    })(
                        <DatePicker placeholder="请选择执照到期日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="到期日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('expiredDate', {
                        rules: [{
                            required: true, message: '请选择执照到期日期',
                        }],
                        initialValue: moment.unix(value.expiredDate)
                    })(
                        <DatePicker placeholder="请选择执照到期日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续评估日期1"
                    className="item offset"
                >
                    {form.getFieldDecorator('evaluationDate1', {
                        initialValue: create ? null : value.evaluationDate1 ?  moment.unix(value.evaluationDate1) : null
                    })(
                        <DatePicker placeholder="请选择持续评估日期1" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续授权日期1"
                    className="item"
                >
                    {form.getFieldDecorator('authDate1', {
                        initialValue: create ? null : value.authDate1 ? moment.unix(value.authDate1) : null
                    })(
                        <DatePicker placeholder="请选择持续授权日期1" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续评估日期2"
                    className="item offset"
                >
                    {form.getFieldDecorator('evaluationDate2', {
                        initialValue: create ? null : value.evaluationDate2 ? moment.unix(value.evaluationDate2): null
                    })(
                        <DatePicker placeholder="请选择持续评估日期2" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续授权日期2"
                    className="item offset"
                >
                    {form.getFieldDecorator('authDate2', {
                        initialValue: create ? null : value.authDate2 ? moment.unix(value.authDate2) : null
                    })(
                        <DatePicker placeholder="请选择持续授权日期1" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续评估日期3"
                    className="item"
                >
                    {form.getFieldDecorator('evaluationDate3', {
                        initialValue: create ? null : value.evaluationDate3 ? moment.unix(value.evaluationDate3) : null
                    })(
                        <DatePicker placeholder="请选择持续评估日期3" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续授权日期3"
                    className="item offset"
                >
                    {form.getFieldDecorator('authDate3', {
                        initialValue: create ? null : value.authDate3 ? moment.unix(value.authDate3) : null
                    })(
                        <DatePicker placeholder="请选择持续授权日期3" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="参加维修工作时间"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('participationWorkDate', {
                        rules: [{
                            required: true, type: 'string', message: '参加维修工作时间',
                        }],
                        initialValue: value.participationWorkDate
                    })(
                        <Input placeholder="参加维修工作时间"/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});

class Authorization extends React.Component {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        modalVisible: false,
        create: false,
        selectedRowKeys: [],
        value: {
            name: '', center: '', major: '', position: '', project: '',
            evaluationDate: '', authDate: '', expiredDate: '',
            evaluationDate1: '', authDate1: '', evaluationDate2: '',
            authDate2: '', evaluationDate3: '', authDate3: '',
            participationWorkDate: ''
        }
    };

    init = () =>  {
        get('user/authorization').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.data,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    componentDidMount() {
        this.init();
        get('user/count?db=authorization').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count
                });
            } else {
                message.error(res.info);
            }
        });
    }

    onChange = (page) => {
        get('user/authorization?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.aircraft,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleManage = (value) => {
        this.setState({
            value
        });
    };

    handleUpdate = (value) => {
        let data = this.state.data;
        data.map((doc, key) => {
            if (doc._id === value._id) {
                doc.name = value.name;
                doc.center = value.center;
                doc.major = value.major;
                doc.position = value.position;
                doc.project = value.project;
                doc.evaluationDate = value.evaluationDate;
                doc.authDate = value.authDate;
                doc.expiredDate = value.expiredDate;
                doc.evaluationDate1 = value.evaluationDate1;
                doc.authDate1 = value.authDate1;
                doc.evaluationDate2 = value.evaluationDate2;
                doc.authDate2 = value.authDate2;
                doc.evaluationDate3 = value.evaluationDate3;
                doc.authDate3 = value.authDate3;
                doc.participationWorkDate = value.participationWorkDate;
            }
            return 0;
        });
        post('user/authorization/update', value).then((response) => {
            console.log(response);
            if(response.success) {
                message.info(response.info);
            } else {
                message.error(response.info);
            }
        });
        this.setState({
            data
        });
    };

    handleDelete = (_id) => {
        post('user/authorization/delete', {_id}).then((response) => {
            if(response.success) {
                message.info(response.info);
                this.handleModalVisible();
                this.setState({selectedRowKeys: 0});
                this.init();
            } else {
                message.error(response.info);
            }
        });
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    render() {
        const columns = [{
            title: '姓名',
            key: 'name',
            dataIndex: 'name'
        }, {
            title: '中心',
            key: 'center',
            dataIndex: 'center'
        }, {
            title: '执照专业',
            key: 'major',
            dataIndex: 'major',
        }, {
            title: '岗位',
            key: 'position',
            dataIndex: 'position',
        }, {
            title: '授权项目',
            key: 'project',
            dataIndex: 'project',
        }, {
            title: '评估日期',
            key: 'evaluationDate',
            dataIndex: 'evaluationDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '授权日期',
            key: 'authDate',
            dataIndex: 'authDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        },{
            title: '到期日期',
            key: 'expiredDate',
            dataIndex: 'expiredDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        },{
            title: '剩余天数',
            key: 'userId',
            dataIndex: 'expiredDate',
            render: (text) => Math.floor((text - (Math.floor(Date.now() /1000))) /24 /3600 )
        }, {
            title: '持续评估日期1',
            key: 'evaluationDate1',
            dataIndex: 'evaluationDate1',
            render: (text) =>  (text ? new Date(Number(text) * 1000).toLocaleDateString() : null)
        }, {
            title: '持续授权日期1',
            key: 'authDate1',
            dataIndex: 'authDate1',
            render: (text) =>  (text ? new Date(Number(text) * 1000).toLocaleDateString() : null)
        }, {
            title: '持续评估日期2',
            key: 'evaluationDate2',
            dataIndex: 'evaluationDate2',
            render: (text) =>  (text ? new Date(Number(text) * 1000).toLocaleDateString() : null)
        }, {
            title: '持续授权日期2',
            key: 'authDate2',
            dataIndex: 'authDate2',
            render: (text) =>  (text ? new Date(Number(text) * 1000).toLocaleDateString() : null)
        }, {
            title: '参加维修工作时间',
            key: 'participationWorkDate',
            dataIndex: 'participationWorkDate'
        }, {
            title: "操作",
            render: (text, record) => (<Button onClick={
                () => {
                    this.handleManage(record);
                    this.setState({create: false});
                    this.handleModalVisible(true);
                }}
            >
                编辑<Icon type="edit" /></Button>)

        }];

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate,
            handleDelete: this.handleDelete,
            handleInit: this.init
        };

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <div style={{marginBottom: 10}}>
                    <Button onClick={() => {
                        this.handleManage({
                            evaluationDate: moment.unix(Date.now() / 1000000),
                            authDate: moment.unix(Date.now() / 1000000),
                            expiredDate: moment.unix(Date.now() / 1000000),
                        });
                        this.setState({create: true});
                        this.handleModalVisible(true);
                    }}>新建</Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            message.info("管理员限制，此版本不可用🚫");
                        }}
                    >
                        导入
                    </Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            // downloadFile("user/export/aircraft", "Aircraft_list_" + new Date().toLocaleDateString());
                            message.info("管理员限制，此版本不可用🚫");
                        }}
                    >
                        导出
                    </Button>&nbsp;&nbsp;
                    <Button
                        ghost
                        type="danger"
                        onClick={() => {
                            this.handleDelete(this.state.selectedRowKeys)
                        }}
                        disabled={!hasSelected}
                    >
                        删除
                    </Button>&nbsp;&nbsp;
                    <Search
                        placeholder="请输入搜索内容"
                        onSearch={value => {
                           if(value !== '') {
                               get(`user/authorization?keyword=${value}`).then(response => {
                                   if(response.success) {
                                       this.setState({
                                           data: response.data,
                                       });
                                   } else {
                                       message.error(response.info);
                                   }
                               });
                           } else {
                               message.error('您未输入内容，请输入内容后查询！')
                           }
                        }}
                        enterButton
                        style={{width: "30%"}}
                    />
                </div>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey={record => record._id} value={this.state.value} create={this.state.create}/>
                <Table
                    scroll={{ x: 1600 }}
                    dataSource={this.state.data}
                    loading={this.state.isLoading}
                    columns={columns}
                    rowKey={record => record._id}
                    pagination={{
                        defaultCurrent: this.state.defaultCurrent,
                        total: this.state.count,
                        onChange:this.onChange
                    }}
                    rowSelection={rowSelection}
                    size="middle" />
            </Card>
        );
    }
};

export default Authorization;