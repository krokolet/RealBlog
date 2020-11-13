import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Col, Row, Result, Button } from 'antd';
import PropTypes from 'prop-types';

import { addArticlePath } from '../../serverInfo/apiPaths';
import './createArticle.scss';
import ArticleForm from '../../components/ArticleForm/articleForm';
import sendArticle from '../../sendArticles/sendArticles';
import errorFromApiToForm from '../../errorFromApiToForm/errorFromApiToForm';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefHomePage } from '../../serverInfo/linksToPages';

const mapStateToProps = ({ userInfo }) => {
  return { username: userInfo.username };
};

const normalizeTags = (tags) => {
  const normalTags = tags.filter((tag) => tag.length > 0);
  return [...normalTags];
};

const CreateArticle = ({ username }) => {
  const [sendResult, setSendResult] = useState('');
  if (!username) {
    return <Redirect to={hrefHomePage} />;
  }

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

export default connect(mapStateToProps)(CreateArticle);

CreateArticle.propTypes = {
  username: PropTypes.string.isRequired,
};
