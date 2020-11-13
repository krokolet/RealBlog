import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { articlesPath, toggleArticleFavoritePath } from '../serverInfo/apiPaths';
import sendUserInfo from '../sendUserInfo/sendUserInfo';
import loadSingleArticle from '../loadArticles/loadSingleArticle';
import * as actions from '../store/actions';
import './like.scss';

const mapStateToProps = ({ currentArticle, articlesList }) => {
  return { currentArticle, articlesList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentArticle: (article) => dispatch(actions.setCurrentArticle(article)),
    setArticles: (articles) => dispatch(actions.setArticles(articles)),
  };
};

const Like = ({ slug, articlesList, setArticles }) => {
  const [{ favorited, favCount }, setFavCount] = useState({});

  if (favorited === undefined) {
    loadSingleArticle(articlesPath, slug).then(({ article }) => {
      setFavCount({ favorited: article.favorited, favCount: article.favoritesCount });
    });
  }

  const toggleLike = () => {
    const method = favorited ? 'delete' : 'post';
    sendUserInfo(`${toggleArticleFavoritePath}/${slug}/favorite`, method).then(({ article }) => {
      if (articlesList.length) {
        const currList = articlesList.map((art) =>
          art.slug === slug ? { ...art, favorited: article.favorited } : art
        );
        setArticles(currList);
      }
      setFavCount({ favorited: article.favorited, favCount: article.favoritesCount });
    });
  };

  return (
    <>
      {favorited ? (
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
  setArticles: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

Like.defaultProps = {
  articlesList: undefined,
};
