import React, { FC } from 'react';
import { Row, Col, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const SubPageDebug: FC = () => {
  return (
    <Row>
      <Col lg={{ span: 24 }}>
        <Title level={3}>Debug</Title>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries
        </Text>
        <Button type="primary">Verify</Button>
      </Col>
    </Row>
  );
};

export default SubPageDebug;
