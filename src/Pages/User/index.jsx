import React from 'react';
import UserRule from "../../Components/UserRule";
import SubscribeManage from "../../Components/SubscribeManage";
import PersonalCenter from "../../Components/PersonalCenter";
import Layout from "../../Components/Layout";

const User = (location) => {
    let content;
    switch (location.match.params.path) {
        case 'rule': content = <UserRule/>; break;
        case 'info': content = <SubscribeManage/>; break;
        case 'center': content = <PersonalCenter/>; break;
        default:  content = <div>
            Wrong path.
        </div>;
    }

    return (
        <Layout content={content} path={location.match.params.path}/>
    );

};

export default User;