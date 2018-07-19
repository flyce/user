import React from 'react';

import { Card, Table } from 'antd';
import LoginVerify from '../LoginVerify';

class EltInfo extends React.PureComponent {

    render() {
        const dataSource = [
            {
                "EltCode": "B38DDE0384403A1",
                "Registration": "B-1598",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "05-01-24",
                "EquipmentType": "RESCU 406AFN2",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C5A761000265",
                "Registration": "B-1598",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "10-01-22",
                "EquipmentType": "ADT406S",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE0433003A1",
                "Registration": "B-1596",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "HONEYWELL",
                "Effectiveness": "05-01-24",
                "EquipmentType": "RESCU 406AFN2",
                "Frequency": "121.5 / 243 / 406.040",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C50AC5400265",
                "Registration": "B-1596",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "07-01-22",
                "EquipmentType": "ADT406S",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE0432802AD",
                "Registration": "B-1597",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "02-01-29",
                "EquipmentType": "RESCU 406AFN",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.15/0.15/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38C49F15C00265",
                "Registration": "B-1597",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "04-01-22",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 /406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38C4AA66400265",
                "Registration": "B-1595",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "03-01-19",
                "EquipmentType": "ADT406S",
                "Frequency": "121.5/243/406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X"
            },
            {
                "EltCode": "B38C57A39C0020D",
                "Registration": "B-1595",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "09-01-21",
                "EquipmentType": "ADT406 AF/AP",
                "Frequency": "121.5/243/406.028",
                "Power": "0.2/0.2/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38C41EF1400265",
                "Registration": "B-1593",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "01-01-22",
                "EquipmentType": "ADT406S",
                "Frequency": "121.5/243/406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38C55CE340020D",
                "Registration": "B-1593",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "08-01-21",
                "EquipmentType": "ADT406 AF/AP",
                "Frequency": "121.5/243/406.028",
                "Power": "0.2/0.2/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38DDE013E402AD",
                "Registration": "B-7867",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "08-01-25",
                "EquipmentType": "RESCU406AFN",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.125/0.125/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C46CF2C00265",
                "Registration": "B-7867",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "03-01-21",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.125/0.125/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE0007402AD",
                "Registration": "B-7088",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "09-01-27",
                "EquipmentType": "RESCU406AF",
                "Frequency": "121.5 / 243.0 /406.028",
                "Power": "0.2 / 0.2/ 5",
                "TxType": "3K20A3X/16KOGlD"
            },
            {
                "EltCode": "B38C4BB53800265",
                "Registration": "B-7088",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "05-01-21",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243.0 /406.028",
                "Power": "0.1 / 0.1/ 5",
                "TxType": "3K20A3X/16KOGlD"
            },
            {
                "EltCode": "B38DDE03E8C02AD",
                "Registration": "B-7866",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "12-01-24",
                "EquipmentType": "RESCU406AFN",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.2/0.2/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C46CF2800265",
                "Registration": "B-7866",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "03-01-21",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C46CF2400265",
                "Registration": "B-7865",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "03-01-21",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE03E8802AD",
                "Registration": "B-7865",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "08-01-25",
                "EquipmentType": "RESCU406AFN",
                "Frequency": "121.5 / 243 / 406.028",
                "Power": "0.2/0.2/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE039EC02AD",
                "Registration": "B-6110",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "05-01-22",
                "EquipmentType": "RESCU406AF",
                "Frequency": "121.5 MHz/ 243 MHz/ 406.025 MH",
                "Power": "0.2w/0.2w/5w",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C5607CC00265",
                "Registration": "B-6110",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "09-01-20",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 MHz/ 243 MHz/ 406.025 MH",
                "Power": "0.1W/0.1W/5W",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C4A680800265",
                "Registration": "B-6109",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "04-01-20",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.025 ",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38C406BD8002AD",
                "Registration": "B-6109",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "Honeywell",
                "Effectiveness": "01-01-27",
                "EquipmentType": "RESCU 406AF",
                "Frequency": "121.5 / 243 / 406.025 ",
                "Power": "0.2/0.2/5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B3864CD804C40D5",
                "Registration": "B-5830",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "02-01-20",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.025",
                "Power": "0.1 / 0.1 / 5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE0353402AD",
                "Registration": "B-5830",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "01-01-27",
                "EquipmentType": "RESCU 406AF",
                "Frequency": "121.5 / 243 / 406.025",
                "Power": "0.2 / 0.2 / 5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B38DDE0353002AD",
                "Registration": "B-5829",
                "Type": "固定",
                "EltProtocol": "航空器地址编码",
                "Manufacturer": "Honeywell",
                "Effectiveness": "10-01-26",
                "EquipmentType": "RESCU 406",
                "Frequency": "121.5 / 243 / 406.025",
                "Power": "0.2 / 0.2 / 5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B3864CD804C6435",
                "Registration": "B-5829",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "09-01-19",
                "EquipmentType": "ADT 406S",
                "Frequency": "121.5 / 243 / 406.025",
                "Power": "0.1 / 0.1 / 5",
                "TxType": "3K20A3X / 16K0G1D"
            },
            {
                "EltCode": "B386493374354D1",
                "Registration": "B-1960",
                "Type": "固定",
                "EltProtocol": "注册号",
                "Manufacturer": "Honeywell",
                "Effectiveness": "09-01-25",
                "EquipmentType": "RESCU 406",
                "Frequency": "121.5MHz/243MHz/406.028MHz",
                "Power": "0.5/0.15/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38CEAA65003265",
                "Registration": "B-1960",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "ELTA",
                "Effectiveness": "03-01-19",
                "EquipmentType": "ADT 406 S",
                "Frequency": "121.5MHz/243MHz/406.028MHz",
                "Power": "0.1/0.1/5",
                "TxType": "3K20A3X/16K0G1D"
            },
            {
                "EltCode": "B38C565ECC001A5",
                "Registration": "B-5812",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "KANNAD ",
                "Effectiveness": "08-01-21",
                "EquipmentType": "KANNAD 406 AS",
                "Frequency": "121.5MHz/243MHz/406.025MHz",
                "Power": "0.5/0.15/5",
                "TxType": "VHF"
            },
            {
                "EltCode": "B38C404D0C002AD",
                "Registration": "B-5812",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "Honeywell",
                "Effectiveness": "02-12-21",
                "EquipmentType": "RESCU 406",
                "Frequency": "121.5MHz/243MHz/406.028MHz",
                "Power": "0.5/0.15/5",
                "TxType": "VHF"
            },
            {
                "EltCode": "B38C404D38002AD",
                "Registration": "B-5811",
                "Type": "固定",
                "EltProtocol": "发射机序号",
                "Manufacturer": "Honeywell ",
                "Effectiveness": "12-13-20",
                "EquipmentType": "RESCU 406",
                "Frequency": "121.5MHz/243MHz/406.028MHz",
                "Power": "0.5/0.15/5",
                "TxType": "VHF"
            },
            {
                "EltCode": "B38C508820001A5",
                "Registration": "B-5811",
                "Type": "便携",
                "EltProtocol": "发射机序号",
                "Manufacturer": "KANNAD ",
                "Effectiveness": "12-01-21",
                "EquipmentType": "KANNAD 406 AS",
                "Frequency": "121.5MHz/243MHz/406.025MHz",
                "Power": "0.5/0.15/5",
                "TxType": "VHF"
            }
        ];

        const columns = [{
            title: 'Registration',
            dataIndex: 'Registration',
            key: 'Registration',
        }, {
            title: 'EltCode',
            dataIndex: 'EltCode',
            key: 'EltCode',
        }, {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        }, {
            title: 'EltProtocol',
            dataIndex: 'EltProtocol',
            key: 'EltProtocol',
        }, {
            title: 'Manufacturer',
            dataIndex: 'Manufacturer',
            key: 'Manufacturer',
        }, {
            title: 'Effectiveness',
            dataIndex: 'Effectiveness',
            key: 'Effectiveness',
        }, {
            title: 'EquipmentType',
            dataIndex: 'EquipmentType',
            key: 'EquipmentType',
        }, {
            title: 'Frequency',
            dataIndex: 'Frequency',
            key: 'Frequency',
        }, {
            title: 'Power',
            dataIndex: 'Power',
            key: 'Power',
        }, {
            title: 'TxType',
            dataIndex: 'TxType',
            key: 'TxType',
        }];

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        );
    }
};

export default EltInfo;