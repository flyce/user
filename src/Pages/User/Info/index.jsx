import React from 'react';


import VipContent from './VipContent';
import GeneralContent from './GeneralContent';

import { get } from '../../../Utils/fetch';
import {getItem} from "../../../Utils/storage";

class Info extends React.Component {
    state = {
        info: null,
        isLoading: true
    };

    componentDidMount() {
        const _id = getItem("_id");
        get('user/info', {_id}).then(
            (info) => {
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
                {this.state.isLoading ? <div>Loading</div> : this.state.info.subscribe ? <VipContent userInfo={this.state.info}/> : <GeneralContent userInfo={this.state.info}/>}
            </div>
        );
    }
}

export default Info;