import React, { Component } from 'react';
import moment from 'moment';

const PostedElement = ({ timestamp }) => {
  const m = moment(timestamp);
  return (
    <date className="posted-at" title={m.format("MMMM Do YYYY, h:mm:ss a")}>
      {m.fromNow()}
    </date>
  );
}

export default PostedElement;
