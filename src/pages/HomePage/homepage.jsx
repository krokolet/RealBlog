import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';

import ArticlePreview from '../../components/ArticlePreview/articlePreview';
import * as actions from '../../store/actions';
import './homepage.scss';

const articlesPerPage = 10;

const mapStateToProps = ({ userInfo, articlesCount, articlesList, currentPage, fetchStatus }) => ({
  username: userInfo.username,
  articlesCount,
  articlesList,
  currentPage,
  fetchStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (page) => dispatch(actions.articlesActions.setCurrentPage(page)),
    getArticles: (artPerPage) => dispatch(actions.getArticles(artPerPage)),
  };
};

const Homepage = ({ articlesCount, articlesList, currentPage, setCurrentPage, getArticles }) => {
  useEffect(() => {
    getArticles(articlesPerPage);
  }, [getArticles]);

  return !articlesList.length ? (
    <Spin tip="Loading..." />
  ) : (
    <Row justify="center" className="articlesWrapper" gutter={[24, 24]}>
      {articlesList.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}
      <Col>
        <Pagination
          total={articlesCount}
          pageSize={articlesPerPage}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

Homepage.propTypes = {
  articlesCount: PropTypes.number.isRequired,
  articlesList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      favoritesCount: PropTypes.number.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        image: PropTypes.string,
        bio: PropTypes.string,
        following: PropTypes.bool.isRequired,
      }),
    })
  ),
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
};

Homepage.defaultProps = {
  articlesList: undefined,
};
