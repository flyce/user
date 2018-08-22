import React from 'react';
import { Upload, Icon, message, Card } from 'antd';
import {
    Form, Select, Button, Input, DatePicker, Tabs, Modal, Table
} from 'antd';
import './style.css';
import { post, file } from "../../Utils/fetch";
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;
const Option = Select.Option;

const Dragger = Upload.Dragger;
const formItemLayout = {
    span: '8'
};


class BaseInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            data: null,
            visible: false
        }
    }

    okHandle = () => {
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.effectiveDate = new Date(fieldsValue.effectiveDate._d).getTime()/1000;

            // console.log(new Date(fieldsValue.effectiveDate._d).getTime());
            post('user/elt', {...fieldsValue}).then((response, err) => {
                if(!err) {
                    if(response.success) {
                        message.info(response.info);
                        form.resetFields();
                    } else {
                        message.error(response.info);
                    }
                }
            });
        });
    };

    open = (data) => {
        console.log(data);
        this.setState({
            data,
            visible: true
        });
    };

    handleConfirm = () => {
        post('user/elts', this.state.data).then((response, err) => {
            if(!err) {
                if(response.success) {
                    message.info(response.info);
                } else {
                    message.error(response.info);
                }
            }
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const uploadData = {
            name: 'elt',
            multiple: true,
            showUploadList: false,
            customRequest:  (info) => {
                const data = new FormData();
                data.append('elt', info.file);
                file(data).then((response) => {
                    if(response.success) {
                        this.open(response.data);
                    } else {
                        message.error(response.info);
                    }
                });
            }
        };

        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration)
        }, {
            title: 'ELT编码',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: 'ELT协议',
            dataIndex: 'protocol',
            key: 'protocol',
        }, {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        }, {
            title: '有效期',
            dataIndex: 'effectiveDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '设备型号',
            dataIndex: 'equipment',
            key: 'equipment',
        }, {
            title: '系列号',
            dataIndex: 'seriesNumber',
            key: 'seriesNumber',
        }, {
            title: '发射频率',
            dataIndex: 'frequency',
            key: 'frequency',
        }, {
            title: '发射功率',
            dataIndex: 'power',
            key: 'power',
        }, {
            title: '发射类型',
            dataIndex: 'txType',
            key: 'txType',
        }];

        return (
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="edit" />单条录入</span>} key="1">
                        <Form
                            style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="航空器注册号"
                                className="item"
                                hasFeedback
                            >
                                {getFieldDecorator('registration', {
                                    rules: [{
                                        required: true, message: '请输入航空器注册号',
                                    }],
                                })(
                                    <Input placeholder="请输入航空器注册号" addonBefore="B-"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ELT编码"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('code', {
                                    rules: [{
                                        required: true, message: '请输入ELT编码',
                                    }],
                                })(
                                    <Input placeholder="请输入ELT编码"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="制造商"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('manufacturer', {
                                    rules: [{
                                        type: 'string', message: '请输入制造商',
                                    }]
                                })(
                                    <Input placeholder="请输入制造商"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="设备型号"
                                className="item"
                                hasFeedback
                            >
                                {getFieldDecorator('equipment', {
                                    rules: [{
                                        type: 'string', message: '请输入设备型号',
                                    }]
                                })(
                                    <Input placeholder="请输入设备型号"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="序号"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('seriesNumber', {
                                    rules: [{
                                        type: 'string', message: '请输入序号',
                                    }]
                                })(
                                    <Input placeholder="请输入序号"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="类型"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('type', {
                                    rules: [
                                        {required: true, message: '请选择ELT类型'},
                                    ],
                                })(
                                    <Select placeholder="请选择ELT类型">
                                        <Option value="固定">固定</Option>
                                        <Option value="便携">便携</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ELT编码协议"
                                className="item"
                                hasFeedback
                            >
                                {getFieldDecorator('protocol', {
                                    rules: [{
                                        type: 'string', message: '请输入ELT编码协议',
                                    }]
                                })(
                                    <Input placeholder="请输入ELT编码协议"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="发射频率"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('frequency', {
                                    rules: [{
                                        type: 'string', message: '请输入发射频率',
                                    }]
                                })(
                                    <Input placeholder="请输入发射频率" addonAfter="MHz"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="电池有效期"
                                className="item offset"
                            >
                                {getFieldDecorator('effectiveDate', {
                                    rules: [{
                                        required: true, message: '请选择电池有效期',
                                    }],
                                })(
                                    <DatePicker placeholder="请选择电池有效期" style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="发射类型"
                                className="item"
                                hasFeedback
                            >
                                {getFieldDecorator('txType', {
                                    rules: [{
                                        type: 'string', message: '请输入发射类型',
                                    }]
                                })(
                                    <Input placeholder="请输入发射类型"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="发射功率"
                                className="item offset"
                                hasFeedback
                            >
                                {getFieldDecorator('power', {
                                    rules: [{
                                        type: 'string', message: '请输入发射功率',
                                    }]
                                })(
                                    <Input placeholder="请输入发射功率"/>
                                )}
                            </FormItem>
                            <FormItem
                                className="item offset"
                            >
                            </FormItem>
                            <FormItem
                                className="item"
                            >
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                className="item offset"
                                hasFeedback
                            >
                                <Button type="primary" className="submitButton" onClick={this.okHandle} htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane tab={<span><Icon type="file-excel" />从EXCEL导入</span>} key="2">
                        <div className="uploadContainer">
                            <div style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                                <a href="https://store.flyce.cn/yuanweistudio/store/ELT.xlsx" target="_blank" rel="noopener noreferrer" download="ELT.xlsx">点击下载导入模版</a>
                            </div>
                            <Dragger
                                {...uploadData}
                            >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
                                    <p className="ant-upload-hint">请严格按照模版格式进行上传</p>
                            </Dragger>
                        </div>
                        <Modal
                            title="导入数据"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.visible}
                            onOk={this.handleConfirm}
                            onCancel={this.handleCancel}
                            width={"90%"}
                        >
                            <Table
                                dataSource={this.state.data}
                                columns={columns}
                                rowKey={record => record.code}
                                size="middle"
                                />
                        </Modal>
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

const Import = Form.create()(BaseInfo);

export default Import;