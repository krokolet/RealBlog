import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Col, Row, Button } from 'antd';

import './tags.scss';

const Tags = (tagList) => {
  const { register } = useFormContext();

  const [tagsId, setTagsId] = useState([]);

  useEffect(() => {
    if (tagList.length) {
      const newIdList = tagList.map((item, i) => i);
      setTagsId(newIdList);
    }
  }, [tagList]);

  const addTag = () => {
    setTagsId((prev) => {
      const newId = prev.length ? prev[prev.length - 1] + 1 : 0;
      return [...prev, newId];
    });
  };

  const delTag = (id) => {
    const filteredTags = tagsId.filter((item) => item !== id);
    setTagsId(filteredTags);
  };

  const renderTag = (id) => {
    const tagValue = tagList.length ? tagList[id] : null;
    return (
      <Row gutter={[0, 16]} key={id}>
        <Col flex={12}>
          <input
            id={id}
            ref={register()}
            name={`tagList[${id}]`}
            placeholder="Tag"
            className="tag__field"
            defaultValue={tagValue}
          />
        </Col>
        <Col flex={2}>
          <Row justify="center">
            <Button className="tag__btn--red" onClick={() => delTag(id)}>
              Delete
            </Button>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Row className="tag">
      {tagsId.length ? <Col span={12}>{tagsId.map((id) => renderTag(id))}</Col> : null}
      <Row gutter={[0, 18]} align="bottom">
        <Col className="row-gutter">
          <Button
            className="tag__btn--blue"
            onClick={() => {
              addTag();
            }}
          >
            Add tag
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default Tags;
