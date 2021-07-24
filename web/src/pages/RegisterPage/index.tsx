import React, { FC } from 'react';
import { Row, Col } from 'antd';
import RegisterComponent from '@components/Register';
import logo from '../../assets/images/logoInoma.png';
import styles from './index.module.less';

const LoginPage: FC = () => {
  return (
    <Row className={styles.login}>
      <Col lg={{ span: 12 }} className={styles.loginBg}></Col>
      <Col lg={{ span: 12 }}>
        <div className={styles.formWrapper}>
          <img alt="Inoma" src={logo} className={styles.logo} />
          <RegisterComponent />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
