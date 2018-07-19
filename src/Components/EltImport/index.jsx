import React from 'react';
import { Upload, Icon, message, Card } from 'antd';
import {
    Form, Select, Button, Input, DatePicker, Tabs
} from 'antd';
import './style.css';
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;
const Option = Select.Option;

const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: false,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const BaseInfo = (props) => {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        span: '8'
    };
    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="edit" />单条录入</span>} key="1">
                    <Form onSubmit={this.handleSubmit}
                          style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="航空器注册号"
                            className="item"
                            hasFeedback
                        >
                            {getFieldDecorator('registercode', {
                                rules: [{
                                    required: true, message: '请输入航空器注册号',
                                }],
                            })(
                                <Input placeholder="请输入航空器注册号"/>
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
                            {getFieldDecorator('factory', {
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
                            {getFieldDecorator('device', {
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
                            {getFieldDecorator('series', {
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
                                    required: true, message: '请输入航空器注册号',
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
                            {getFieldDecorator('transmitType', {
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
                            {getFieldDecorator('transmitPower', {
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
                            <Button type="primary" className="submitButton">提交</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane tab={<span><Icon type="file-excel" />从EXCEL导入</span>} key="2">
                    <Dragger
                        {...props}
                        className="upload"
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
                        <p className="ant-upload-hint">请严格按照模版格式进行上传</p>
                    </Dragger>
                </TabPane>
            </Tabs>
        </Card>
    );
};


const Import = Form.create()(BaseInfo);

export default Import;