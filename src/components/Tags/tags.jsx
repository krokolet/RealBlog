import React from 'react';
import { Col, Row, Input, Button } from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import './tags.scss';

const renderTags = (tagsLength, tag, index, remove) => {
  return (
    <Row gutter={[0, 16]} key={`${index}`}>
      <Col flex={12}>
        <Field as={Input} name={`tagList.${index}`} placeholder="Tag" className="tag__field" />
      </Col>
      <Col flex={2}>
        <Row justify="center">
          <Button className="tag__btn--red" onClick={() => remove(index)}>
            Delete
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const Tags = ({ push, form, remove }) => {
  const { tagList } = form.values;
  return (
    <Row className="tag">
      {tagList.length ? (
        <Col span={12}>{tagList.map((tag, index, array) => renderTags(array.length, tag, index, remove))}</Col>
      ) : null}
      <Row gutter={[0, 18]} align="bottom">
        <Col className="row-gutter">
          <Button className="tag__btn--blue" onClick={() => push('')}>
            Add tag
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default Tags;

Tags.propTypes = {
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  form: PropTypes.shape({ values: PropTypes.shape({ tagList: PropTypes.arrayOf(PropTypes.string) }) }),
};

Tags.defaultProps = {
  form: undefined,
};
