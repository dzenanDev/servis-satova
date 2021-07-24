import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Row, Form, Input, Button, message } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import styles from './index.module.less';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { authSelector, login } from '../../redux/modules/auth';
import { Alert } from 'antd';

const { Title, Text } = Typography; // bio Link

const FormItem = Form.Item;

const LoginComponent: React.FC = () => {
  const [alert, setAlert] = useState(false);
  const { isAuth, isLoading, error } = useSelector(authSelector);

  const navigate = useNavigate();

  const err: any = error;

  if (isAuth) {
    navigate('/Naslovna');
    message.success('Login Success !');
  }
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    await store.dispatch(login(values));

    if (isAuth) {
      navigate('/Naslovna');
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  return (
    <Fragment>
      <div className={styles.form}>
        <Title level={2}>Sign in to Service App</Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <FormItem
            label={t`Office`}
            name="office"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input size="large" placeholder={t`input your Office in here`} />
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
          <Row justify="end"></Row>
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
              <Trans>Sign in</Trans>
            </Button>
            <p>
              <span className="margin-right">
                <Trans>Doesn't have an account yet? </Trans>
              </span>
              <span>
                <Link to="/register">
                  <Text strong>
                    <Trans>Sign up now</Trans>
                  </Text>
                </Link>
              </span>
            </p>
          </Row>
        </Form>{' '}
        {alert && (
          <Alert message={err.error} description="" type="error" showIcon />
        )}
      </div>
    </Fragment>
  );
};

export default LoginComponent;
