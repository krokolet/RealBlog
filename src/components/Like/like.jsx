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
    setArticles: (articles) => dispatch(actions.articlesActions.setArticles(articles)),
    setLike: (slug) => dispatch(actions.setLike(slug)),
    deleteLike: (slug) => dispatch(actions.deleteLike(slug)),
  };
};

const Like = ({ slug, username, setLike, deleteLike, isFetching, favorited, favoritesCount }) => {
  const toggleLike = () => {
    if (isFetching || !username) return;
    if (favorited) {
      deleteLike(slug);
    } else {
      setLike(slug);
    }
  };

  const heartClass = {
    heartRed: 'heart--red',
    heartBlack: 'heart--black',
  };

  if (!username) {
    heartClass.heartRed += ' disable';
    heartClass.heartBlack += ' disable';
  }

  return (
    <>
      {favorited && username ? (
        <HeartFilled onClick={toggleLike} className={heartClass.heartRed} />
      ) : (
        <HeartOutlined onClick={toggleLike} className={heartClass.heartBlack} />
      )}
      <span className="favoritesCount">{favoritesCount}</span>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);

Like.propTypes = {
  username: PropTypes.string,
  slug: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  setLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

Like.defaultProps = {
  username: undefined,
};
