import React, { FC, useState, useEffect } from 'react';
import { Row, Form, Input, Button, message } from 'antd';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import fetchHelper from '@utils/apiHelper';
import { useNavigate } from 'react-router-dom';

const ItemPage: FC = () => {
  let { itemId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const loadData = async (query: any) => {
    try {
      let res = await fetchHelper(`/api/dijelovi/id=${itemId}`);

      setData(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadData(itemId);
    }
  }, [itemId]);
  const onFinish = async (values: any) => {
    navigate('/Rezervni');
    await fetchHelper(`/api/newDio`, values, {
      method: 'POST',
    });
    message.success('Rezervni dio uspjesno dodan !');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row>
        <Form
          action="/"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Brand"
            name="brend"
            rules={[{ required: true, message: 'Please input your brand!' }]}
          >
            <Input placeholder="Input Brand" />
          </Form.Item>
          <Form.Item
            label="Sifra"
            name="sifra"
            rules={[
              { required: true, message: 'Please input your watch code!' },
            ]}
          >
            <Input placeholder="Input Watch/Code" />
          </Form.Item>
          <Form.Item
            label="Artikal"
            name="artikal"
            rules={[{ required: true, message: 'Please input your artikal!' }]}
          >
            <Input placeholder="Input Article" />
          </Form.Item>
          <Form.Item
            label="Opis"
            name="opis"
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
          >
            <Input placeholder="Input Description" />
          </Form.Item>
          <Form.Item
            label="Cijena"
            name="cijena"
            rules={[{ required: true, message: 'Please input your price!' }]}
          >
            <Input placeholder="Input Price" />
          </Form.Item>
          <Form.Item
            label="Komada"
            name="komada"
            rules={[{ required: true, message: 'Please input your pieces!' }]}
          >
            <Input placeholder="Input how many pieces" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to="/Rezervni">
              <Button type="primary" htmlType="submit">
                Cancel Form
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default ItemPage;
