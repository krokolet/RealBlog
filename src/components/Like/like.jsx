import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions';
import './like.scss';

const mapStateToProps = ({ currentArticle, articlesList, userInfo: { username }, fetchStatus: { isFetching } }) => {
  return { currentArticle, articlesList, username, isFetching };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentArticle: (article) => dispatch(actions.setCurrentArticle(article)),
    setArticles: (articles) => dispatch(actions.setArticles(articles)),
    setLike: (slug) => dispatch(actions.setLike(slug)),
    deleteLike: (slug) => dispatch(actions.deleteLike(slug)),
  };
};

const Like = ({ slug, username, articlesList, setLike, deleteLike, isFetching }) => {
  const { favorited, favoritesCount } = articlesList.filter((article) => article.slug === slug)[0];

  const toggleLike = () => {
    if (isFetching) return;
    if (favorited) {
      deleteLike(slug);
    } else {
      setLike(slug);
    }
  };

  return (
    <>
      {favorited && username ? (
        <HeartFilled onClick={toggleLike} className="heart--red" />
      ) : (
        <HeartOutlined onClick={toggleLike} className="heart--balck" />
      )}
      <span className="favoritesCount">{favoritesCount}</span>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);

Like.propTypes = {
  username: PropTypes.string,
  slug: PropTypes.string.isRequired,
  articlesList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      favoritesCount: PropTypes.number,
      author: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.string,
        bio: PropTypes.string,
        following: PropTypes.bool,
      }),
    })
  ).isRequired,
  setLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

Like.defaultProps = {
  username: undefined,
};
