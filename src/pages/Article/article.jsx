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
import API from '../../Api/api';

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentArticle: (article) => dispatch(actions.setCurrentArticle(article)),
    delCurrentArticle: () => dispatch(actions.delCurrentArticle()),
  };
};

const mapStateToProps = ({ currentArticle, userInfo }) => {
  return {
    currentArticle,
    currentUser: userInfo.username,
  };
};

const { loadSingleArticle, deleteArticle } = new API();

const Article = ({
  history,
  setCurrentArticle,
  delCurrentArticle,
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
  } = currentArticle;

  useEffect(() => {
    loadSingleArticle(slug)
      .then(({ article }) => setCurrentArticle(article))
      .catch(() => {
        history.push(hrefHomePage);
      });
  }, [history, setCurrentArticle, slug]);
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
                  <Like slug={slug} />
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
                        deleteArticle(slug)
                          .then(() => delCurrentArticle())
                          .then(() => history.push(hrefHomePage));
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
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string,
      bio: PropTypes.string,
      following: PropTypes.bool.isRequired,
    }),
  }),
  currentUser: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }),
};

Article.defaultProps = {
  currentArticle: undefined,
  match: undefined,
};
