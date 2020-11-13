import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Col, Row, Result, Button } from 'antd';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addArticlePath } from '../../serverInfo/apiPaths';
import '../CreateArticle/createArticle.scss';
import ArticleForm from '../../components/ArticleForm/articleForm';
import sendArticle from '../../sendArticles/sendArticles';
import errorFromApiToForm from '../../errorFromApiToForm/errorFromApiToForm';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefHomePage } from '../../serverInfo/linksToPages';

const mapStateToProps = ({ currentArticle, userInfo }) => {
  return {
    currentArticle,
    username: userInfo.username,
  };
};

const normalizeTags = (tags) => {
  const normalTags = tags.filter((tag) => tag.length > 0);
  return [...normalTags];
};

const EditArticle = ({ currentArticle, username }) => {
  const [sendResult, setSendResult] = useState('');
  if (!username) {
    return <Redirect to={hrefHomePage} />;
  }
  const initValues = {
    title: currentArticle.title,
    description: currentArticle.description,
    body: currentArticle.body,
    tagList: currentArticle.tagList,
  };

  return (
    <Row className="newArticle" justify="center">
      <Col span={24}>
        <Row justify="center">
          <h1 className="newArticle__title">Edit article</h1>
        </Row>
        <Row justify="center">
          <Formik
            initialValues={initValues}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              sendArticle(`${addArticlePath}/${currentArticle.slug}`, 'put', {
                article: { ...values, tags: [normalizeTags(values.tagList)] },
              })
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

export default connect(mapStateToProps)(EditArticle);

EditArticle.propTypes = {
  currentArticle: {
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favoritesCount: PropTypes.string,
    author: {
      username: PropTypes.string,
      image: PropTypes.string,
      bio: PropTypes.string,
      following: PropTypes.bool,
    },
  }.isRequired,
  username: PropTypes.string.isRequired,
};
