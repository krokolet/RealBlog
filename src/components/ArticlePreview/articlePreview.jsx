import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Tag } from 'antd';
import { parseJSON, formatDistanceToNow } from 'date-fns';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import './articlePreview.scss';
import { hrefArcticles } from '../../Api/linksToPages';
import Like from '../Like/like';

const ArticlePreview = ({ article }) => {
  const {
    slug,
    title,
    description,
    tagList,
    createdAt,
    author: { username, image },
    favorited,
    favoritesCount,
  } = article;

  const createdTimeAgo = {
    time: formatDistanceToNow(parseJSON(createdAt)),
  };
  return (
    <Col className="gutter-row" span={24}>
      <Row className="articlePreview">
        <Col span={18}>
          <article>
            <Row gutter={[13, 6]} type="flex" align="middle">
              <Col className="row-gutter">
                <Link to={`${hrefArcticles}/${slug}`} className="articlePreview__link">
                  <h1 className="articlePreview__title">{title}</h1>
                </Link>
              </Col>
              <Col className="row-gutter">
                <Like slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
              </Col>
            </Row>
            <Row gutter={[13, 6]}>
              <Col className="row-gutter">
                {tagList.map((tag) => (
                  <Tag key={_.uniqueId()}>{tag}</Tag>
                ))}
              </Col>
            </Row>
            <Row>
              <Col>{description}</Col>
            </Row>
          </article>
        </Col>
        <Col span={6}>
          <Row gutter={[12, 12]} justify="end">
            <Col className="row-gutter" span={16}>
              <Row justify="end" className="articlePreview__username">
                <Col>{username}</Col>
              </Row>
              <Row justify="end">
                <Col>{createdTimeAgo.time}</Col>
              </Row>
            </Col>
            <Col className="row-gutter" span={8}>
              <img className="avatar" src={image} alt="Avatar" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default connect()(ArticlePreview);

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favoritesCount: PropTypes.number,
    favorited: PropTypes.bool,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
      bio: PropTypes.string,
      following: PropTypes.bool,
    }),
  }).isRequired,
};
