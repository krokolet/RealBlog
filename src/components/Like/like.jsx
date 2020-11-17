import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions';
import './like.scss';
import API from '../../Api/api';

const mapStateToProps = ({ currentArticle, articlesList, userInfo: { username } }) => {
  return { currentArticle, articlesList, username };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentArticle: (article) => dispatch(actions.setCurrentArticle(article)),
    setArticles: (articles) => dispatch(actions.setArticles(articles)),
  };
};

const { loadSingleArticle, setLike, deleteLike } = new API();

const Like = ({ slug, username }) => {
  const [{ favorited, favCount }, setFavCount] = useState({});

  if (favorited === undefined) {
    loadSingleArticle(slug).then(({ article }) => {
      setFavCount({ favorited: article.favorited, favCount: article.favoritesCount });
    });
  }

  const toggleLike = () => {
    if (favorited) {
      deleteLike(slug).then(() => setFavCount({ favorited: false, favCount: favCount - 1 }));
    } else {
      setLike(slug).then(() => setFavCount({ favorited: true, favCount: favCount + 1 }));
    }
  };

  return (
    <>
      {favorited && username ? (
        <HeartFilled onClick={toggleLike} className="heart--red" />
      ) : (
        <HeartOutlined onClick={toggleLike} className="heart--balck" />
      )}
      <span className="favoritesCount">{favCount}</span>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);

Like.propTypes = {
  username: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

Like.defaultProps = {
  username: undefined,
};
