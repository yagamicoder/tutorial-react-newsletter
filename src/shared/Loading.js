import React from 'react';
import { Spin } from 'antd';

const Loading = ({message}) => {
  return (
    <Spin tip={message} size="large"/>
  )
}

export default Loading;