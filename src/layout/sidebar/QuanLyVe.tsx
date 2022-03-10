import React, { useState } from 'react';

import '../../styles/quanlyve.css';
import "antd/dist/antd.css";

import moment from 'moment';
import { Tabs, Modal, Button, DatePicker, Space, Radio, Checkbox, Row, Col, Table, Tag, } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { BsDot } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";


// Date picker
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// Radio cho tình trạng sử dụng
const Radiostatus = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>Tất cả</Radio>
      <Radio value={2}>Đã sử dụng</Radio>
      <Radio value={3}>Chưa sử dụng</Radio>
      <Radio value={4}>Hết hạn</Radio>
    </Radio.Group>
  );
};

// Check box cho cổng checkin
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5'];
const defaultCheckedList = ['Cổng 1'];

const CheckboxGateCheck = () => {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = (list: any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.unchecked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Tất cả
          </Checkbox>
        </Col>
        <Col style={{ marginTop: '10px' }}>
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </Col>
      </Row>
    </>
  );
};

// Modal Cho gói gia đình và sự kiện:
const Modals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='buttonmodal' style={{position: 'absolute', }}>
        <AiOutlineFilter className='iconfilter' />Lọc Vé
      </Button>

      <Modal title="Lọc Vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width='600px'
        style={{ textAlign: 'center' }}>

        <div className='from-d-to-d'> {/* Thời gian bắt đầu đến thời gian kết thúc */}
          <div className='beginday'> {/* Thời gian bắt đầu */}
            <h3>Từ ngày</h3>
            <Space direction="vertical" size={12}>
              <DatePicker format={dateFormat} />
            </Space>,
          </div>

          <div className='endday'> {/* Thời gian kết thúc */}
            <h3>Đến ngày</h3>
            <Space direction="vertical" size={12}>
              <DatePicker format={dateFormat} />
            </Space>,
          </div>
        </div>

        <div className='tinhtrangsudung'> {/* Tình trạng sử dụng */}
          <h3>Tình trạng sử dụng</h3>
          <div className='tinhtrang'><Radiostatus /></div>
        </div>

        <div className='congcheckin'> {/* Cổng check in */}
          <h3>cổng Check-in</h3>
          <CheckboxGateCheck />
        </div>

        <Button className='buttonlocve'>Lọc</Button>
      </Modal>
    </>
  );
};

// Table Danh sách vé:
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },

  {
    title: 'Booking code',
    dataIndex: 'bookcode',
    key: 'bookcode',
  },

  {
    title: 'Số vé',
    dataIndex: 'sove',
    key: 'sove',
  },

  {
    title: 'Tên sự kiện',
    dataIndex: 'sukien',
    key: 'sukien',
  },

  {
    title: 'Tình trạng sử dụng',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag === 'Đã sử dụng' ? 'geekblue' : 'green';
          if (tag === 'Hết hạn') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              <BsDot /> {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: 'Ngày sử dụng',
    dataIndex: 'useddate',
    key: 'useddate',
  },
  {
    title: 'Ngày xuất vé',
    dataIndex: 'releasedate',
    key: 'releasedate',
  },
  {
    title: 'Cổng check-in',
    dataIndex: 'gatecheck',
    key: 'gatecheck',
  },
];

const data = [
  {
    key: '1',
    stt: '1',
    bookcode: 'ALT20210501',
    sove: 123456789034,
    sukien: 'Hội chợ triển lãm tiêu dùng 2021',
    tags: ['Đã sử dụng'],
    useddate: '14/04/2021',
    releasedate: '14/04/2021',
    gatecheck: 'Cổng 1',
  },
  {
    key: '2',
    stt: '2',
    bookcode: 'ALT20210501',
    sove: 123456789034,
    sukien: 'Hội chợ triển lãm tiêu dùng 2021',
    tags: ['Đã sử dụng'],
    useddate: '14/04/2021',
    releasedate: '14/04/2021',
    gatecheck: 'Cổng 1',
  },
];


// Tabs cho gói gia đình và sự kiện:
const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Tab = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>

    <TabPane tab="Gói Gia Đình" key="1"> {/* Gói gia đìn */}

      <div className='khungtren'> {/* Khung Trên Gói Gia Đình */}
        <input type='text' className='searcher' /><SearchOutlined className='icongoigiadinh' />
      </div>

      <div className='modal'> {/* Modal Cho Gói Gia Đình */}
        <Modals />
      </div>

      <Button className='xuatfilebutton'>Xuất file (.csv)</Button> {/* Xuất file gói gia đình  */}

      <Table columns={columns} dataSource={data} className='tabledanhsachve' />

    </TabPane>

    <TabPane tab="Gói sự kiện" key="2">
      <div className='khungtren'> {/* Khung Trên Gói Sự kiện */}
        <input type='text' className='searcher' /><SearchOutlined className='icongoigiadinh' />
      </div>

      <div className='modal'> {/* Modal Cho Gói Sự kiện */}
        <Modals />
      </div>

      <Button className='xuatfilebutton'>Xuất file (.csv)</Button> {/* Xuất file gói sự kiện  */}

      <Table columns={columns} dataSource={data} className='tabledanhsachve' />
    </TabPane>

  </Tabs>
);


// Render ra kết quả

export const QuanLyVe = () => {
  return (
    <div className="quanlyve">
      <div className='tieudedanhsachve'>Danh Sách Vé</div>
      <div className='tabs'><Tab /></div>
    </div>
  )
}