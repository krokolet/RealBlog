import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import '../CreateArticle/createArticle.scss';
import ArticleForm from '../../components/ArticleForm/articleForm';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefHomePage } from '../../Api/linksToPages';
import * as actions from '../../store/actions';

const mapStateToProps = ({
  articlesList,
  currentArticle,
  userInfo,
  fetchStatus: { isFetching, errorsFetching, isFetchSuccess },
}) => {
  return {
    currentArticle,
    username: userInfo.username,
    isFetching,
    errorsFetching,
    isFetchSuccess,
    articlesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticle: (slug) => dispatch(actions.loadArticle(slug)),
    setCurrentArticle: (article) => dispatch(actions.articlesActions.setCurrentArticle(article)),
    postEditedArticle: (slug, article) => dispatch(actions.postEditedArticle(slug, article)),
  };
};

const normalizeTags = (tags) => {
  if (!tags) return null;
  return tags.filter((tag) => tag && tag);
};

const EditArticle = ({
  setCurrentArticle,
  loadArticle,
  articlesList,
  currentArticle,
  username,
  isFetching,
  errorsFetching,
  isFetchSuccess,
  postEditedArticle,
  match: {
    params: { slug },
  },
}) => {
  const { formState, setError, ...methods } = useForm();
  const { errors, isSubmitted } = formState;

  useEffect(() => {
    if (errorsFetching && !Object.keys(errors).length) {
      Object.entries(errorsFetching).map((error) => setError(error[0], { message: error[1] }));
    }
    if (articlesList.length && articlesList.filter((article) => article.slug === slug).length) {
      setCurrentArticle(articlesList.filter((article) => article.slug === slug)[0]);
    } else if (!currentArticle.title) {
      loadArticle(slug);
    }
  }, [
    username,
    currentArticle,
    slug,
    setCurrentArticle,
    loadArticle,
    articlesList,
    errors,
    errorsFetching,
    isFetchSuccess,
    isSubmitted,
    setError,
  ]);

  if (currentArticle.title && (!localStorage.getItem('userInfo') || username !== currentArticle.author.username)) {
    return <Redirect to={hrefHomePage} />;
  }

  const onSubmit = (values) => {
    postEditedArticle(currentArticle.slug, {
      article: { ...values, tagList: normalizeTags(values.tagList) },
    });
  };

  return (
    <FormProvider {...methods}>
      <Row className="newArticle" justify="center">
        {isFetchSuccess && isSubmitted ? (
          <Redirect to={hrefHomePage} />
        ) : (
          <Col span={24}>
            <Row justify="center">
              <h1 className="newArticle__title">Edit article</h1>
            </Row>
            <Row justify="center">
              {currentArticle.title ? (
                <form className="newArticle__form" onSubmit={methods.handleSubmit(onSubmit)}>
                  {errors.errorUnknown && ErrorText(errors.errorUnknown)}
                  <ArticleForm currentArticle={currentArticle} />
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
              ) : (
                <Spin />
              )}
            </Row>
          </Col>
        )}
      </Row>
    </FormProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);

EditArticle.propTypes = {
  currentArticle: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favoritesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
      bio: PropTypes.string,
      following: PropTypes.bool,
    }),
  }),
  username: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchSuccess: PropTypes.bool.isRequired,
  errorsFetching: PropTypes.shape({}),
  postEditedArticle: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }),
  loadArticle: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  articlesList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      favoritesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      author: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.string,
        bio: PropTypes.string,
        following: PropTypes.bool,
      }),
    })
  ),
};

EditArticle.defaultProps = {
  errorsFetching: null,
  currentArticle: undefined,
  match: undefined,
  articlesList: [],
};
