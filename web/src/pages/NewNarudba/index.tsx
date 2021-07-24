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
    console.log('Success:', values);
    navigate('/Narudbe');
    await fetchHelper(`/api/newNarudba`, values, {
      method: 'POST',
    });
    message.success('Narudba uspjesno dodana !');
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
            name="imePrezime"
            rules={[{ required: true, message: 'Please input the Name..!' }]}
          >
            <Input placeholder="Input name and surname " />
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
            rules={[{ required: true, message: 'Please input the date !' }]}
          >
            <Input type="date" form="dd-MM-yyyy" />
          </Form.Item>

          <Form.Item
            label="Poslovnica"
            name="poslovnica"
            rules={[{ required: true, message: 'Please input the office !' }]}
          >
            <Input placeholder="Input business unit" />
          </Form.Item>

          <Form.Item
            label="Opis narudbe"
            name="narucbaOpis"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input placeholder="Input order description" />
          </Form.Item>

          <Form.Item
            label="Sifra sata "
            name="sifra"
            rules={[
              { required: true, message: 'Please input the watch code!' },
            ]}
          >
            <Input placeholder="Input watch code" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to="/Narudbe">
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
