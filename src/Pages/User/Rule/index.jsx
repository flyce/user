import React from 'react';
import UserRule from '../../../Components/UserRule';
import { Icon } from 'antd';
import {get} from "../../../Utils/fetch";
import {getItem} from "../../../Utils/storage";


class Rule extends React.Component {
    state={
        info: '',
        isLoading: true
    };

    componentDidMount() {
        const _id = getItem("_id");
        get('user/rule', {_id}).then(
            (info) => {
                console.log(info);
                if (info) {
                    this.setState({
                        info: info,
                        isLoading: false,
                    });
                } else {
                    console.log("something wrong")
                }

            }
        );
    }

    render() {
        return (
            <div>
                <h3>使用说明</h3>
                <p>
                    鸢尾工作室目前做的限制为 CAD/AD 标题中匹配到用户设定的关键字，则向用户发送CAD推送。<br/>
                    点击条件后面的<Icon type="close" style={{ fontSize: 16, color: '#08c' }} />可以删除当前条件。<br />
                    点击 <strong>新建规则</strong> 可以建立新的限制条件。<br />
                </p>
                <h4>请不要在规则中添加空格!!!</h4>
                <h3>您当前接收的邮件规则为：</h3>
                {this.state.isLoading ? <div>loading</div>:this.state.info.subscribe ? <SubscribeUser info={this.state.info}/> : <GeneralUser />}
            </div>
        );
    }
}

const SubscribeUser = (info) => (
    <div>
        <UserRule info={info}/>
    </div>
);

const GeneralUser = () => (
    <div>
        <h4><span style={{color: "#eb5055"}}>您不是订阅用户，无法使用此功能。</span></h4>
        <a href="#">点击订阅，20元/月</a>
        <p>订阅后您将可以定制 CAD/AD 的接收，更大程度的提升你的工作效率。</p>
    </div>
);

export default Rule;