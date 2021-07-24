import React, { FC } from 'react';
import { Row, Col, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const SubPageServingScript: FC = () => {
  return (
    <Row>
      <Col lg={{ span: 24 }}>
        <Title level={3}>Serving Script</Title>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </Text>
        <Button type="primary">Verify</Button>
      </Col>
    </Row>
  );
};

export default SubPageServingScript;
