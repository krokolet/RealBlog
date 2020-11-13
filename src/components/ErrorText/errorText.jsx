import React from 'react';
import { Alert, Col, Row } from 'antd';

const ErrorText = (msg) => {
  return (
    <Row gutter={[16, 36]} justify="center">
      <Col span={24}>
        <Alert message={`${msg}`.charAt(0).toUpperCase() + `${msg}`.slice(1)} type="error" />
      </Col>
    </Row>
  );
};

export default ErrorText;
