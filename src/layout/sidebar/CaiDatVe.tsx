import React, { useState, useEffect } from 'react';

import '../../styles/caidatve.css';
import "antd/dist/antd.css";

import { BsDot } from "react-icons/bs";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {
  Table, Tag, Modal, Button, DatePicker, Space, TimePicker, Checkbox, Select
} from 'antd';
import moment from 'moment';


// Datepicker:
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// Timepicker:
function onTimePicker(time: any, timeString: any) {
  console.log(time, timeString);
}

// Check Box 
function onCheckBoxPicker(e: any) {
  console.log(`checked = ${e.target.checked}`);
}

// Select cho tình trạng của vé
const { Option } = Select;
function handleTinhTrangVe(value: any) {
  console.log(`selected ${value}`);
}

// Table cho việc cài đặt danh sách vé
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },

  {
    title: 'Mã Gói',
    dataIndex: 'bookcode',
    key: 'bookcode',
  },

  {
    title: 'Tên gói vé',
    dataIndex: 'goivename',
    key: 'goivename',
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'startdate',
    key: 'startdate',
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'outdate',
    key: 'outdate',
  },
  {
    title: 'Giá vé (VNĐ/Vé)',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Giá combo (VNĐ/Combo)',
    dataIndex: 'comboprice',
    key: 'comboprice',
  },
  {
    title: 'Tình trạng',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag === 'Đang Áp Dụng' ? 'green' : 'green';
          if (tag === 'Tắt') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              <BsDot/>{tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Cập Nhật',
    key: 'action',
    render: (text: any, record: any) => (
         <ModalCapNhatVe />
    ),
  },
];

const data = [
  {
    key: '1',
    stt: '1',
    bookcode: 'ALT20210501',
    goivename: 'Gói Gia Đình',
    startdate: '14/04/2021',
    outdate: '14/04/2021',
    price: '90.000 VNĐ',
    comboprice: '360.000 VNĐ/4 vé',
    tags: ['Đang áp dụng'],
  },

];


// Modal cho việc thêm gói vé
const ModalThemGoiVe = () => {
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
      <Button type="primary" onClick={showModal} className='btnmodalthemgoive'>
        Thêm Gói Vé
      </Button>

      <Modal title="Thêm gói vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'600px'} footer={null}>

        <div className='themtengoive'> {/* Thêm tên của gói vé */}
          <h4>Tên gói vé *</h4>
          <input type='text' className='tencuagoive'></input>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}> {/* Ngày áp dụng và Ngày hết hạn */}
          <div>
            <h4>Ngày áp dụng</h4> {/* Ngày bắt đầu */}
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>

          <div style={{ marginLeft: '60px' }}> {/* Ngày Kết thúc */}
            <h4>Ngày hết hạn</h4>
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>
        </div>

        <div style={{ marginTop: '10px' }}> {/* Giá vé áp dụng */}
          <h4>Giá vé áp dụng</h4>
          <Checkbox onChange={onCheckBoxPicker}> {/* Giá vé đơn */}
            Vé lẻ (vnđ/vé) với giá <input type='text' className='inputgiale' />&#160;/ Vé
          </Checkbox>
          <Checkbox onChange={onCheckBoxPicker} style={{ marginTop: '5px', margin: '5px 0 0 0 ' }}> {/* Giá vé combo */}
            Combo vé với giá <input type='text' className='inputgiacombo' />&#160;/ <input type='text' className='inputgiacombotren1ve' /> &#160; Vé
          </Checkbox>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>Tình trạng</h4>
          <Select defaultValue="Yes" style={{ width: 150}} onChange={handleTinhTrangVe} className='selectchocaidatve'> 
            <Option value="Yes">Đang áp dụng</Option>
            <Option value="No">Chưa rõ</Option>
          </Select>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>* là thông tin bắt buộc</h4>
        </div>
         
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button className='btnhuycaidatve'>Hủy</button>
          <button className='btnluucaidatve'>Lưu</button>
        </div>

      </Modal>
    </>
  );
};

// Modal cho việc cập nhật vé
const ModalCapNhatVe = () => {
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
      <Button type="primary" onClick={showModal} className='btnmodalcapnhat'>
        <HiOutlinePencilAlt />Cập Nhật
      </Button>

      <Modal title="Cập nhật thông tin gói vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'600px'} footer={null}>

        <div style={{display: 'flex'}}>
          <div>
            <h4>Mã sự kiện *</h4>
            <input type='text' className='inputmasukien'></input>
          </div>
          <div style={{marginLeft: '70px'}}>
            <h4>Tên sự kiện</h4>
            <input type='text' className='inputtensukien'></input>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}> {/* Ngày áp dụng và Ngày hết hạn */}
          <div>
            <h4>Ngày áp dụng</h4> {/* Ngày bắt đầu */}
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>

          <div style={{ marginLeft: '60px' }}> {/* Ngày Kết thúc */}
            <h4>Ngày hết hạn</h4>
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>
        </div>

        <div style={{ marginTop: '10px' }}> {/* Giá vé áp dụng */}
          <h4>Giá vé áp dụng</h4>
          <Checkbox onChange={onCheckBoxPicker}> {/* Giá vé đơn */}
            Vé lẻ (vnđ/vé) với giá <input type='text' className='inputgiale' />&#160;/ Vé
          </Checkbox>
          <Checkbox onChange={onCheckBoxPicker} style={{ marginTop: '5px', margin: '5px 0 0 0 ' }}> {/* Giá vé combo */}
            Combo vé với giá <input type='text' className='inputgiacombo' />&#160;/ <input type='text' className='inputgiacombotren1ve' /> &#160; Vé
          </Checkbox>
        </div>

        <div style={{marginTop: '10px'}}> {/* Tình trạng vé */}
          <h4>Tình trạng</h4>
          <Select defaultValue="Yes" style={{ width: 150}} onChange={handleTinhTrangVe} className='selectchocaidatve'> 
            <Option value="Yes">Đang áp dụng</Option>
            <Option value="No">Chưa rõ</Option>
          </Select>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>* là thông tin bắt buộc</h4>
        </div>
         
        <div style={{textAlign: 'center', marginTop: '20px'}}> {/* Lưu hoặc hủy */}
          <button className='btnhuycaidatve'>Hủy</button>
          <button className='btnluucaidatve'>Lưu</button>
        </div>

      </Modal>
    </>
  );
};


// Render ra

export const CaiDatVe = () => {
  return (
    <div className="caidatve">

      <div className='tieudecaidatve'>Danh Sách Gói Vé</div>

      <input type='text' className='searchcaidatve'></input>

      <button className='xuatfilecaidatve'>Xuất file (.csv)</button>

      <div className='modalthemgoive'> {/*Modal thêm gói vé */}
        <ModalThemGoiVe />
      </div>

      <Table columns={columns} dataSource={data} className='tabledanhsachgoive'/>
  

    </div>
  )
}