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
import Disclaimer from '../../Components/Disclaimer';
import LicenseList from '../../Components/LicenseList';
import License from '../../Components/License';
import Authorization from '../../Components/Authorization';

const User = (location) => {

    // router list
    const data = {
        "cadrule": <CadRule/>,
        "adrule": <AdRule/>,
        "info": <SubscribeManage/>,
        "center": <PersonalCenter/>,
        "eltinfo": <EltInfo/>,
        "elt": <EltWatcher />,
        "eltimport": <EltImport/>,
        "cospass": <Cospas/>,
        "aircraft": <Aircraft/>,
        "radio": <Radio />,
        "radiolist": <RadioList />,
        "caac": <Caac />,
        "timeline": <Time />,
        "disclaimer": <Disclaimer />,
        "licenselist": <LicenseList />,
        "license": <License />,
        "authorization": <Authorization />
    };

    let content = data[location.match.params.path] ?
        data[location.match.params.path] : <div>Wrong path.</div>;

    return (
        <Layout content={content} path={location.match.params.path}/>
    );

};

export default User;