import React from 'react';
import { ErrorMessage, Field, FieldArray } from 'formik';
import { Col, Input, Row } from 'antd';
import Tags from '../tags/tags';
import './articleForm.scss';
import ErrorText from '../../errorsMessage/errorText';

const ArticleForm = () => {
  return (
    <>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="title" className="article__label">
            Title:{' '}
          </label>
          <Field as={Input} name="title" placeholder="Title" />
          <ErrorMessage name="title" render={(msg) => ErrorText(msg)} />
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="description" className="article__label">
            Short description:{' '}
          </label>
          <Field as={Input} name="description" placeholder="Description" />
          <ErrorMessage name="description" render={(msg) => ErrorText(msg)} />
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="body" className="article__label">
            Text:{' '}
          </label>
          <Field as={Input.TextArea} name="body" placeholder="Text" />
          <ErrorMessage name="body" render={(msg) => ErrorText(msg)} />
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="tagList" className="article__label">
            Tags:{' '}
          </label>
          <FieldArray name="tagList" component={Tags} />
        </Col>
      </Row>
    </>
  );
};

export default ArticleForm;
