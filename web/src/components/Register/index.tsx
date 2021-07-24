import React, { Fragment, useState } from 'react';
import { Typography, Row, Form, Input, Button, message, Alert } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelector } from '../../redux/modules/auth';
import fetchHelper from '@utils/apiHelper';

const { Title, Text, Link } = Typography;
const FormItem = Form.Item;

const LoginComponent: React.FC = () => {
  const { isLoading, error } = useSelector(authSelector);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const handleSubmit = (values: any) => {
    fetchHelper(`/api/register`, values, {
      method: 'POST',
    }).then(response => {
      if (response.auth == false) {
        setErrorVisible(true);
        console.log(response.message);
      }
      if (response.auth == true) {
        message.success('You have now an account !');
        navigate('/login');
      }
    });
  };

  // store.dispatch(login(values));

  return (
    <Fragment>
      <div className={styles.form}>
        <Title level={2}>Register</Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <FormItem
            label={t`Office`}
            name="poslovnica"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input size="large" placeholder={t`input your ofice in here`} />
          </FormItem>
          {errorVisible && (
            <Alert message="This Office name is allredy in use!" type="error" />
          )}
          <FormItem
            label={t`Email`}
            name="mail"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input size="large" placeholder={t`input your email in here`} />
          </FormItem>
          <FormItem
            label={t`Password`}
            name="password"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input
              size="large"
              type="password"
              placeholder={t`input your password in here`}
            />
          </FormItem>
          <Row justify="end">
            <Link href="/login" className={styles.linkForgot}>
              <Text>
                <Trans>Back to login page</Trans>
              </Text>
            </Link>
          </Row>
          <Row>
            <Text>{error && <div>{error.message}</div>}</Text>
          </Row>
          <Row>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              <Trans>Sign up</Trans>
            </Button>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
