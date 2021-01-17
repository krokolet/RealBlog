import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import { Col, Row, Tag, Button, Spin, Popconfirm } from 'antd';
import * as actions from '../../store/actions';
import Like from '../../components/Like/like';
import { hrefEditArticle, hrefHomePage } from '../../Api/linksToPages';
import './article.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticle: (slug) => dispatch(actions.loadArticle(slug)),
    setCurrentArticle: (article) => dispatch(actions.articlesActions.setCurrentArticle(article)),
    delCurrentArticle: () => dispatch(actions.articlesActions.delCurrentArticle()),
    deleteArticle: (slug) => dispatch(actions.deleteArticle(slug)),
  };
};

const mapStateToProps = ({ currentArticle, userInfo, articlesList, fetchStatus: { errorsFetching } }) => {
  return {
    currentArticle,
    currentUser: userInfo.username,
    articlesList,
    errorsFetching,
  };
};

const Article = ({
  history,
  loadArticle,
  articlesList,
  setCurrentArticle,
  delCurrentArticle,
  deleteArticle,
  currentArticle,
  currentUser,
  match: {
    params: { slug },
  },
}) => {
  const {
    title,
    description,
    body,
    tagList,
    createdAt,
    author: { username, image },
    favorited,
    favoritesCount,
  } = currentArticle;

  useEffect(() => {
    if (articlesList.length && articlesList.filter((article) => article.slug === slug).length) {
      setCurrentArticle(articlesList.filter((article) => article.slug === slug)[0]);
    } else if (!title) {
      loadArticle(slug);
    }
  }, [articlesList, setCurrentArticle, slug, title, loadArticle]);

  return !title ? (
    <Spin tip="Loading..." />
  ) : (
    <article className="articlesWrapper">
      <Row>
        <Col className="article">
          <Row>
            <Col span={18}>
              <Row gutter={[13, 6]} className="article_header" type="flex" align="middle">
                <Col className="row-gutter">
                  <h1 className="article_title">{title}</h1>
                </Col>
                <Col className="row-gutter">
                  <Like slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
                </Col>
              </Row>
              <Row gutter={[13, 6]}>
                <Col className="row-gutter">
                  {tagList.map((tag) => (
                    <Tag key={_.uniqueId()} className="tag">
                      {tag}
                    </Tag>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col className="article_description">{description}</Col>
              </Row>
              <Row>
                <Col className="article_body">{body}</Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row gutter={[12, 12]} justify="end">
                <Col className="row-gutter" span={16}>
                  <Row justify="end">
                    <Col>{username}</Col>
                  </Row>
                  <Row justify="end">
                    <Col>{formatDistanceToNow(parseJSON(createdAt))}</Col>
                  </Row>
                </Col>
                <Col className="row-gutter" span={8}>
                  <img className="avatar" src={image} alt="Avatar" />
                </Col>
              </Row>
              {currentUser === username && (
                <Row gutter={[12]} justify="end">
                  <Col>
                    <Popconfirm
                      placement="right"
                      cancelText="No"
                      okText="Yes"
                      title="Are you sure to delete this article?"
                      onConfirm={() => {
                        delCurrentArticle();
                        deleteArticle(slug);
                        history.replace(hrefHomePage);
                      }}
                    >
                      <Button className="article_delete">Delete</Button>
                    </Popconfirm>
                  </Col>
                  <Col>
                    <Button
                      className="article_edit"
                      onClick={(event) => {
                        event.preventDefault();
                        history.push(`${hrefEditArticle}/${slug}/edit`);
                      }}
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </article>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);

Article.propTypes = {
  history: { ...PropTypes.object }.isRequired,
  loadArticle: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  delCurrentArticle: PropTypes.func.isRequired,
  currentArticle: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    favoritesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    favorited: PropTypes.bool,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string,
      bio: PropTypes.string,
      following: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  currentUser: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }),
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
  ).isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

Article.defaultProps = {
  match: undefined,
  currentUser: undefined,
};
