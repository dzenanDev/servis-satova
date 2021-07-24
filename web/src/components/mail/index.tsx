import React from 'react';
import fetchHelper from '@utils/apiHelper';
import { Row, Form, Input, Button, message } from 'antd';

const Message = () => {
  const onFinish = async (values: any) => {
    await fetchHelper(`/send`, values, {
      method: 'POST',
    });
    message.success('Mail poslan !');
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Row>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please input a subject!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input yout message !' }]}
        >
          <Input.TextArea style={{ width: '400px', height: '150px' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
      </Form>
    </Row>
  );
};
export default Message;
function value(value: any, e: any) {
  throw new Error('Function not implemented.');
}

function e(value: any, e: any) {
  throw new Error('Function not implemented.');
}
