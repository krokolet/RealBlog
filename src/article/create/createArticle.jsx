import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Col, Row, Result, Button } from 'antd';

import { addArticlePath } from '../../serverData/apiPaths';
import './createArticle.scss';
import ArticleForm from '../form/articleForm';
import sendArticle from '../../sendArticles/sendArticles';
import errorFromApiToForm from '../../errorsMessage/errorFromApiToForm';
import ErrorText from '../../errorsMessage/errorText';

const normalizeTags = (tags) => {
  const normalTags = tags.filter((tag) => tag.length > 0);
  return [...normalTags];
};

const CreateArticle = () => {
  const [sendResult, setSendResult] = useState('');
  const initValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  return (
    <Row className="newArticle" justify="center">
      <Col span={24}>
        <Row justify="center">
          <h1 className="newArticle__title">Create new article</h1>
        </Row>
        <Row justify="center">
          <Formik
            initialValues={initValues}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              sendArticle(addArticlePath, 'post', { article: { ...values, tags: [normalizeTags(values.tagList)] } })
                .then((response) => {
                  setSendResult(response);
                })
                .catch((error) => setErrors(errorFromApiToForm(error)));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors }) =>
              sendResult ? (
                <Result status="success" extra={[<span> Articale sent !</span>]} />
              ) : (
                <Form className="newArticle__form">
                  {errors.errorUnknown && ErrorText(errors.errorUnknown)}
                  {ArticleForm(errors)}
                  <Row justify="begin">
                    <Col span={8}>
                      <Button htmlType="submit" type="primary" disabled={isSubmitting} block className="submitButton">
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )
            }
          </Formik>
        </Row>
      </Col>
    </Row>
  );
};

export default connect()(CreateArticle);
