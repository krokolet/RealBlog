import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';

import './createArticle.scss';
import ArticleForm from '../../components/ArticleForm/articleForm';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefHomePage } from '../../Api/linksToPages';
import * as actions from '../../store/actions';

const mapStateToProps = ({ userInfo, fetchStatus: { isFetching, errorsFetching, isFetchSuccess } }) => {
  return {
    username: userInfo.username,
    isFetching,
    errorsFetching,
    isFetchSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (article) => dispatch(actions.postArticle(article)),
  };
};

const normalizeTags = (tags) => {
  if (!tags) return [];
  return tags.filter((tag) => tag.length > 0);
};

const CreateArticle = ({ username, isFetching, errorsFetching, isFetchSuccess, postArticle }) => {
  const { formState, setError, ...methods } = useForm();
  const { errors, isSubmitted } = formState;

  useEffect(() => {
    if (errorsFetching && !Object.keys(errors).length) {
      Object.entries(errorsFetching).map((error) => setError(error[0], { message: error[1] }));
    }
  }, [errors, errorsFetching, isFetchSuccess, isSubmitted, setError]);

  if (!username) {
    return <Redirect to={hrefHomePage} />;
  }

  const onSubmit = (values) => {
    postArticle({ article: { ...values, tagList: normalizeTags(values.tagList) } });
  };

  return (
    <FormProvider {...methods}>
      <Row className="newArticle" justify="center">
        {isFetchSuccess && isSubmitted ? (
          <Redirect to={hrefHomePage} />
        ) : (
          <Col span={24}>
            <Row justify="center">
              <h1 className="newArticle__title">Create article</h1>
            </Row>
            <Row justify="center">
              <form className="newArticle__form" onSubmit={methods.handleSubmit(onSubmit)}>
                {errors.errorUnknown && ErrorText(errors.errorUnknown)}
                <ArticleForm />
                <Row justify="begin">
                  <Col span={8}>
                    {isFetching ? (
                      <span>Please wait...</span>
                    ) : (
                      <Button htmlType="submit" type="primary" block className="submitButton">
                        Send
                      </Button>
                    )}
                  </Col>
                </Row>
              </form>
            </Row>
          </Col>
        )}
      </Row>
    </FormProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

CreateArticle.propTypes = {
  username: PropTypes.string,
  postArticle: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchSuccess: PropTypes.bool.isRequired,
  errorsFetching: PropTypes.shape({}),
};

CreateArticle.defaultProps = {
  errorsFetching: null,
  username: undefined,
};
