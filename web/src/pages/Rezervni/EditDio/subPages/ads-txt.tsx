import React, { FC } from 'react';
import { Row, Col, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const SubPageAdsText: FC = () => {
  return (
    <Row>
      <Col lg={{ span: 24 }}>
        <Title level={3}>Ads Text</Title>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printervived not only
          five centuries
        </Text>
        <Button type="primary">Verify</Button>
      </Col>
    </Row>
  );
};

export default SubPageAdsText;
