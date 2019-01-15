import React from 'react';
import { Table, Input, message, Select } from 'antd';
import { get } from '../../Utils/fetch';

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

class CadQuery extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            key: 'cadAmendmentNo'
        })
    }
    componentDidMount() {
        get('user/cad').then(res => {
            this.setState({
                data: res.docs
            });
        });
    }

    handleSelectChange = (value) => {
        this.setState({
            key: value
        });
    };

    render() {
        const { data } = this.state;
        const columns = [{
            title: '指令编号',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.cadNo > b.cadNo,
            render: (record) => {
                return (<a href={record.titlePdfUrl} target="_blank"  rel="noopener noreferrer" >{record.cadNo}</a>);
            },
            defaultSortOrder: 'aescend',
            key: 'cadNo'
        }, {
            title: '修正案号',
            dataIndex: 'cadAmendmentNo',
            key: 'cadAmendmentNo',
            sorter: (a, b) => a.cadAmendmentNo > b.cadAmendmentNo,
        }, {
            title: '标题',
            dataIndex: 'title',
            sorter: (a, b) => a.title > b.title,
        }, {
            title: '颁发单位',
            dataIndex: 'issuedBy',
            sorter: (a, b) => a.issuedBy - b.issuedBy,
        }, {
            title: '参考文件',
            render: (record) => {
                return (<a href={record.referenceDocumentsUrl} target="_blank"  rel="noopener noreferrer" >{record.referenceDocuments}</a>);
            },
            sorter: (a, b) => a.referenceDocuments - b.referenceDocuments,
        }, {
            title: '生效日期',
            dataIndex: 'effectiveDate',
            sorter: (a, b) => a.effectiveDate - b.effectiveDate,
        }];
        return (
            <div>
                <InputGroup compact>
                    <Select defaultValue="cadAmendmentNo" size="large" style={{ width: "10%" }} onChange={this.handleSelectChange}>
                        <Option value="cadAmendmentNo">修正案号</Option>
                        <Option value="title">标题</Option>
                        <Option value="cadNo">指令编号</Option>
                        <Option value="issuedBy">颁发单位</Option>
                    </Select>
                    <Search
                        placeholder="输入关键词来查询"
                        onSearch={value => {
                            if(value.length === 0) {
                                message.error("请输入内容后再搜索");
                            } else {
                                get(`user/cad/search?${this.state.key}=${value}`).then(res => {
                                    this.setState({
                                        data: res.docs
                                    });
                                })
                            }
                        }}
                        enterButton="搜索"
                        size="large"
                        style={{ width: "90%" }}
                    />
                </InputGroup>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1500 }}
                    size="small"
                    rowKey={record => record._id}
                    style={{marginTop: '20px'}}
                    pagination={false}
                />
            </div>
        );
    }
}

export default CadQuery;