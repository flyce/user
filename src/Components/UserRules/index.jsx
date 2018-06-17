import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import { post } from '../../Utils/fetch';

class UserRule extends React.Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    };
    componentDidMount() {
        let arr = this.props.info.info.rule;
        arr = arr.split(",");
        this.setState({
            tags: arr
        });
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
        const _id = localStorage.getItem("_id");
        post('rule/update', {
                rule: tags
            }, {
                _id
            }
        ).then((res) => {
            console.log(res);
        });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
        const _id = localStorage.getItem("_id");
        post('rule/update', {
            rule: tags
            }, {
            _id
            }
        ).then((res) => {
            console.log(res);
        });
    };

    saveInputRef = input => this.input = input;

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const color = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
        return (
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)} color={color[Math.floor(Math.random()*10+1)]}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> 新建规则
                    </Tag>
                )}
            </div>
        );
    }
}

export default UserRule;