import React from 'react';
import { Table, Input, message } from 'antd';
import { get } from '../../Utils/fetch';

const Search = Input.Search;

class Caac extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            data: []
        })
    }
    componentDidMount() {
        get('doc').then(res => {
            this.setState({
                data: res.docs
            });
        });
    }
    render() {
        const { data } = this.state;
        const columns = [{
            title: '文件名',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name > b.name,
            render: (record) => {
                return (<a href="https://www.flyce.cn" target="_blank"  rel="noopener noreferrer" >{record.name}</a>);
            },
            defaultSortOrder: 'aescend',
            key: 'name'
        }, {
            title: '文号',
            dataIndex: 'article',
            key: 'article',
            sorter: (a, b) => a.article > b.article,
        }, {
            title: '发布日期',
            dataIndex: 'date',
            sorter: (a, b) => a.date > b.date,
        }, {
            title: '发布人',
            dataIndex: 'organization',
            sorter: (a, b) => a.organization.length - b.organization.length,
        }, {
            title: '等级',
            dataIndex: 'grade',
            filters: [{
                text: ' ',
                value: ' '
            }, {
                text: '急',
                value: '急'
            }, {
                text: '平急',
                value: '平急'
            }, {
                text: '特提',
                value: '特提'
            }],
            filterMultiple: false,
            onFilter: (value, record) => record.grade.indexOf(value) === 0,
            sorter: (a, b) => a.grade > b.grade,
        }, {
            title: '类别',
            dataIndex: 'category',
            filters: [{
                text: '通知',
                value: '通知'
            }, {
                text: '通报',
                value: '通报'
            }],
            filterMultiple: true,
            onFilter: (value, record) => record.category.indexOf(value) === 0,
            sorter: (a, b) => a.category > b.category,
        }];
        return (
            <div>
                <Search
                    placeholder="输入关键词来查询"
                    onSearch={value => {
                        if(value.length === 0) {
                            message.error("请输入内容后再搜索");
                        } else {
                            get('doc/search?keyword=' + value).then(res => {
                                this.setState({
                                    data: res.docs
                                });
                            })
                        }
                    }}
                    enterButton="搜索"
                    size="large"
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={record => record._id}
                    style={{marginTop: '20px'}}
                    pagination={false}
                />
            </div>
        );
    }
}

export default Caac;