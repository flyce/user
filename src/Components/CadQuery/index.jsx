import React from 'react';
import { Table, Input, message, Button } from 'antd';
import { get, downloadFile } from '../../Utils/fetch';

const Search = Input.Search;
const InputGroup = Input.Group;

class CadQuery extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            data: []
        })
    }
    componentDidMount() {
        get('user/cad').then(res => {
            this.setState({
                data: res.docs,
                keyword: ''
            });
        });
    }

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
                <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                    <InputGroup compact>
                        <Search
                            placeholder="输入关键词来查询"
                            onSearch={value => {
                                if(value.length === 0) {
                                    message.error("请输入内容后再搜索");
                                } else {
                                    get(`user/cad/search?keyword=${value}`).then(res => {
                                        this.setState({
                                            data: res.docs,
                                            keyword: value
                                        });
                                    })
                                }
                            }}
                            enterButton="搜索"
                            size="large"
                            style={{ width: "99%" }}
                        />
                    </InputGroup>

                    <Button size="large" onClick={() => {
                        const { keyword } = this.state;
                        if(keyword.length === 0) {
                            message.error("无搜索记录，不可导出！");
                        } else {
                            downloadFile(`user/cad/export?keyword=${keyword}`, keyword);
                        }
                    }}>导出</Button>
                </div>

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