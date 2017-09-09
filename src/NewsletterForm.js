import React from 'react';
import validator from 'validator';
import { Form, Input, Button, Icon } from 'antd';

const NewsletterForm = ({ handleSendEmail, handleOnChangeEmail, email }) => {
  return (
    <Form layout='inline' className="newsletter-form">
      <Form.Item>
        <Input prefix={<Icon type="red-envelope" />} placeholder="Email" value={email}
          onChange={({target}) => handleOnChangeEmail(target.value)} />
      </Form.Item>
      <Form.Item>
        <Button onClick={() => handleSendEmail(email)} disabled={!validator.isEmail(email)}
          type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewsletterForm;