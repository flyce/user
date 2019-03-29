import React from 'react';

import { Card, Table, message, Icon, Form, Modal, Button, Input, DatePicker, Popconfirm, Upload } from 'antd';
import LoginVerify from '../LoginVerify';
import moment from 'moment';

import { get, post } from '../../Utils/fetch';

const Search = Input.Search;
const { TextArea } = Input;

const FormItem = Form.Item;
const formItemLayout = {
    span: '8'
};

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate, handleDelete, create, handleInit } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            fieldsValue.releaseDate = Math.floor(new Date(fieldsValue.releaseDate._d).getTime() / 1000);
            fieldsValue.receivedDate = Math.floor(new Date(fieldsValue.receivedDate._d).getTime() / 1000);
            fieldsValue.finishDate = fieldsValue.finishDate ? Math.floor(new Date(fieldsValue.finishDate._d).getTime() / 1000) : null;
            fieldsValue.timeLimit = fieldsValue.timeLimit ? Math.floor(new Date(fieldsValue.timeLimit._d).getTime() / 1000) : null;
            if (err) return;
            form.resetFields();
            if(create) {
                post('external', fieldsValue).then(response => {
                    if(response.success) {
                        message.info("创建成功");
                        handleInit();
                    } else {
                        message.warning(response.info);
                    }
                });
            } else {
                handleUpdate({_id: value._id, ...fieldsValue});
                handleInit();
            }
            handleModalVisible();
        });
    };

    const title = create ? "新增外来文件信息" : "外来文件信息修改";
    const footer = create ? [
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ] : [
        <Popconfirm key={value._id} title="确定删除?" onConfirm={() => {handleDelete(value._id)}} okText="确定" cancelText="取消">
            <Button key="reset" type="danger" ghost>
                删除
            </Button>
        </Popconfirm>,
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ];

    const uploadProps = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


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
                    label="编号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('filename', {
                        rules: [{
                            required: true, message: '请输入编号',
                        }],
                        initialValue: value.filename
                    })(
                        <Input placeholder="请输入编号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '请输入标题',
                        }],
                        initialValue: value.title
                    })(
                        <Input placeholder="请输入标题"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发文单位"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('unit', {
                        rules: [{
                            required: true, message: '请输入发文单位',
                        }],
                        initialValue: value.unit
                    })(
                        <Input placeholder="请输入发文单位"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发布日期"
                    className="item"
                >
                    {form.getFieldDecorator('releaseDate', {
                        rules: [{
                            required: true, message: '请选择发布日期',
                        }],
                        initialValue: moment.unix(value.releaseDate)
                    })(
                        <DatePicker placeholder="请选择发布日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="接收日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('receivedDate', {
                        rules: [{
                            required: true, message: '请选择接收日期',
                        }],
                        initialValue: moment.unix(value.receivedDate)
                    })(
                        <DatePicker placeholder="请选择接收日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="处理单位"
                    className="item offset"
                >
                    {form.getFieldDecorator('processingUnit', {
                        rules: [{
                            required: true, type: 'string', message: '请输入处理单位',
                        }],
                        initialValue: value.processingUnit
                    })(
                        <Input placeholder="请输入处理单位"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="完成时限"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('timeLimit', {
                        rules: [{
                            type: 'object',
                            message: '请输入完成时限',
                        }],
                        initialValue: value.timeLimit === null ? null : moment.unix(value.timeLimit)
                    })(
                        <DatePicker placeholder="请选择发布日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="完成日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('finishDate', {
                        rules: [{
                            type: 'object',
                            message: '请选择完成日期',
                        }],
                        initialValue: value.finishDate === null ? null : moment.unix(value.finishDate)
                    })(
                        <DatePicker placeholder="请选择完成日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} className="item offset"  label="附件(管理员禁用，本地版可打开)">
                    <Upload {...uploadProps} disabled >
                        <Button disabled>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="相关要求"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('requirement', {
                        rules: [{
                            type: 'string', message: '请输入相关要求',
                        }],
                        initialValue: value.requirement
                    })(
                        <TextArea rows={4} placeholder="请输入相关要求"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="处理措施"
                    className="item offset"
                >
                    {form.getFieldDecorator('treatment', {
                        rules: [{
                            required: false, type: 'string', message: '请输入处理措施',
                        }],
                        initialValue: value.treatment
                    })(
                        <TextArea rows={4} placeholder="请输入处理措施"/>
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
            filename: '', title: '', unit: '', requirement: '', timeLimit: '',
            releaseDate: '', receivedDate: '', processingUnit: '',
            treatment: '', finishDate: '', upload: ''
        }
    };

    init = () =>  {
        get('external').then((res) => {
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
        get('user/count?db=external').then(res => {
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
        get('external?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.data,
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
        post('external/update', value).then((response) => {
            if(response.success) {
                message.info("修改成功");
            } else {
                message.error(response.info);
            }
        });
        this.setState({
            data
        });
    };

    handleDelete = (_id) => {
        post('external/delete', {_id}).then((response) => {
            if(response.success) {
                message.info("删除成功");
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
            title: '文件编号',
            key: 'filename',
            dataIndex: 'filename'
        }, {
            title: '文件标题',
            key: 'title',
            dataIndex: 'title'
        }, {
            title: '发文单位',
            key: 'unit',
            dataIndex: 'unit',
        }, {
            title: '发布日期',
            key: 'releaseDate',
            dataIndex: 'releaseDate',
            render: (text) =>  ( text === null ? null : new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '完成时限',
            key: 'timeLimit',
            dataIndex: 'timeLimit',
            render: (text) =>  ( text === null ? null : new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '处理单位',
            key: 'processingUnit',
            dataIndex: 'processingUnit'
        }, {
            title: "操作",
            render: (text, record) => (<Button onClick={
                () => {
                    this.handleManage(record);
                    this.setState({create: false});
                    this.handleModalVisible(true);
                }}
            >
                详情<Icon type="edit" /></Button>)

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
                            timeLimit: null,
                            releaseDate: moment.unix(Date.now() / 1000000),
                            receivedDate: moment.unix(Date.now() / 1000000),
                            finishDate: null
                        });
                        this.setState({create: true});
                        this.handleModalVisible(true);
                    }}>新建</Button>&nbsp;&nbsp;
                    {/*<Button*/}
                        {/*disabled*/}
                        {/*onClick={() => {*/}
                            {/*message.info("管理员限制，此版本不可用🚫");*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*导入*/}
                    {/*</Button>&nbsp;&nbsp;*/}
                    {/*<Button*/}
                        {/*disabled*/}
                        {/*onClick={() => {*/}
                            {/*// downloadFile("user/export/aircraft", "Aircraft_list_" + new Date().toLocaleDateString());*/}
                            {/*message.info("管理员限制，此版本不可用🚫");*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*导出*/}
                    {/*</Button>&nbsp;&nbsp;*/}
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
                                get(`external/search?keyword=${value}`).then(response => {
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
}

export default Authorization;