import React, { FC } from 'react';
import { Row, Col } from 'antd';
import DummyComponent from '@components/DummyComponent';

const DummyPage: FC = () => {
  return (
    <Row>
      <Col lg={{ span: 24 }}>
        <DummyComponent title="Inoma" />
      </Col>
    </Row>
  );
};

export default DummyPage;
