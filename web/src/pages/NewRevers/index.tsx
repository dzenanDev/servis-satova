import React, { FC, useState, useEffect } from 'react';
import { Row, Form, Input, Button, message } from 'antd';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import fetchHelper from '@utils/apiHelper';
import { useNavigate } from 'react-router-dom';

const ItemPage: FC = () => {
  let { itemId } = useParams();

  const [data, setData] = useState<any>();
  const navigate = useNavigate();
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
    navigate('/Reversi');
    await fetchHelper(`/api/newRevers`, values, {
      method: 'POST',
    });
    message.success('Novi Revers uspjesno dodan !');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Ime i Prezime"
            name="ime"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Input name and surname" />
          </Form.Item>

          <Form.Item
            label="Kontakt broj"
            name="broj"
            rules={[{ required: true, message: 'Please input the phone no.!' }]}
          >
            <Input placeholder="Input contact number" />
          </Form.Item>

          <Form.Item
            label="Datum"
            name="datum"
            rules={[{ required: true, message: 'Please input the date!' }]}
          >
            <Input type="date" form="dd-MM-yyyy" />
          </Form.Item>

          <Form.Item
            label="Kvar"
            name="kvar"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input placeholder="Input type of failure" />
          </Form.Item>

          <Form.Item
            label="Broj Reversa"
            name="brojRev"
            rules={[
              { required: true, message: 'Please input the Rev. number!' },
            ]}
          >
            <Input placeholder="Input reverse number" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="statuss"
            rules={[
              { required: true, message: 'Please input the status of rev. !' },
            ]}
          >
            <Input placeholder="Status (completed or in process)" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to="/Reversi">
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
