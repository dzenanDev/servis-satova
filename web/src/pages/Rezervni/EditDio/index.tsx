import React, { FC, useState, useEffect } from 'react';
import { Row, Typography, Form, Input, Button, message } from 'antd';

import { useParams } from 'react-router-dom';

import fetchHelper from '@utils/apiHelper';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ItemPage: FC = () => {
  let { itemId } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState<object>();
  const navigate = useNavigate();

  const loadData = async (query: any) => {
    try {
      let res = await fetchHelper(`/api/dijelovi/${itemId}`);

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
    console.log(values);
    await fetchHelper(`/api/dijelovi/${itemId}`, values, {
      method: 'PUT',
    });

    message.success('Izmjena uspjesno snimljena !');
    navigate('/Rezervni');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  console.log(data);
  const obj: any = { ...data };

  console.log(obj);

  form.setFieldsValue({
    brend: Object.keys(obj).map((objj, i) => {
      return obj[objj].brend;
    }),
    sifra: Object.keys(obj).map((objj, i) => {
      return obj[objj].sifra;
    }),
    artikal: Object.keys(obj).map((objj, i) => {
      return obj[objj].artikal;
    }),
    opis: Object.keys(obj).map((objj, i) => {
      return obj[objj].opis;
    }),
    cijena: Object.keys(obj).map((objj, i) => {
      return obj[objj].cijena;
    }),
    komada: Object.keys(obj).map((objj, i) => {
      return obj[objj].komada;
    }),
  });
  console.log(Object.values(obj));
  return (
    <Row>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={obj}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Brand"
          name="brend"
          rules={[{ required: true, message: 'Please input your brand!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sifra"
          name="sifra"
          rules={[{ required: true, message: 'Please input your watch code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Artikal"
          name="artikal"
          rules={[{ required: true, message: 'Please input your artikal!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Opis"
          name="opis"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cijena"
          name="cijena"
          rules={[{ required: true, message: 'Please input your price!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Komada"
          name="komada"
          rules={[{ required: true, message: 'Please input your pieces!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ItemPage;
