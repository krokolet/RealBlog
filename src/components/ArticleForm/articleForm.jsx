import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Col, Input, Row } from 'antd';
import Tags from '../Tags/tags';
import './articleForm.scss';
import ErrorText from '../ErrorText/errorText';

const ArticleForm = ({ currentArticle }) => {
  const { errors, control } = useFormContext();
  const { title, body, description, tagList } = currentArticle;
  return (
    <>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="title" className="article__label">
            Title:{' '}
          </label>
          <Controller as={Input} name="title" control={control} defaultValue={title} />
          {errors.title && ErrorText(errors.title.message)}
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="description" className="article__label">
            Short description:{' '}
          </label>
          <Controller as={Input} name="description" control={control} defaultValue={description} />
          {errors.description && ErrorText(errors.description.message)}
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="body" className="article__label">
            Text:{' '}
          </label>
          <Controller as={Input} name="body" control={control} defaultValue={body} />
          {errors.body && ErrorText(errors.body.message)}
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col className="gutter-row" span={24}>
          <label htmlFor="tagList" className="article__label">
            Tags:{' '}
          </label>
          {Tags(tagList)}
        </Col>
      </Row>
    </>
  );
};

export default ArticleForm;

ArticleForm.propTypes = {
  currentArticle: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
  }),
};

ArticleForm.defaultProps = {
  currentArticle: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
};
