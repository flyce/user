import React from 'react';

import CadRule from "../../Components/CadRule";
import AdRule from "../../Components/AdRule";
import SubscribeManage from "../../Components/SubscribeManage";
import PersonalCenter from "../../Components/PersonalCenter";
import Layout from "../../Components/Layout";
import EltInfo from "../../Components/EltInfo";
import EltImport from "../../Components/EltImport";
import Cospas from "../../Components/Cospas";
import Aircraft from "../../Components/Aircraft";
import Radio from "../../Components/Radio";
import RadioList from "../../Components/RadioList";
import Caac from '../../Components/Caac';
import Time from '../../Pages/Timeline';
import EltWatcher from '../../Components/EltWatcher';

const User = (location) => {
    let content;
    switch (location.match.params.path) {
        case 'cadrule': content = <CadRule/>; break;
        case 'adrule': content = <AdRule/>; break;
        case 'info': content = <SubscribeManage/>; break;
        case 'center': content = <PersonalCenter/>; break;
        case 'eltinfo': content = <EltInfo/>; break;
        case 'elt': content = <EltWatcher />;break;
        case 'eltimport': content = <EltImport/>; break;
        case 'cospass': content = <Cospas/>; break;
        case 'aircraft': content = <Aircraft/>;break;
        case 'radio': content = <Radio />;break;
        case 'radiolist': content = <RadioList />;break;
        case 'caac': content = <Caac />;break;
        case 'timeline': content = <Time />;break;
        default:  content = <div>
            Wrong path.
        </div>;
    }

    return (
        <Layout content={content} path={location.match.params.path}/>
    );

};

export default User;