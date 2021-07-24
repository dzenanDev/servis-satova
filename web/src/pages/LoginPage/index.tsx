import React, { FC } from 'react';
import { Row, Col } from 'antd';
import LoginComponent from '@components/LoginComponent';
import logo from '../../assets/images/logoInoma.png';
import styles from './index.module.less';

const LoginPage: FC = () => {
  return (
    <Row className={styles.login}>
      <Col lg={{ span: 12 }} className={styles.loginBg}></Col>
      <Col lg={{ span: 12 }}>
        <div className={styles.formWrapper}>
          <img alt="React logo" src={logo} className={styles.logo} />
          <LoginComponent />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
