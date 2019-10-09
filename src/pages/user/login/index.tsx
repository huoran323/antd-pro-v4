import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from './style.less';

interface LoginProps extends FormComponentProps {
  dispatch: Dispatch<any>;
}

interface LoginState {

}

class Login extends Component<LoginProps, LoginState> {

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {

      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {
              getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名',
                  },
                ],
              })(
                <Input size="large" placeholder="请填写用户名"/>,
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码',
                  },
                ],
              })(
                <Input size="large" placeholder="请填写密码"/>,
              )
            }
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" className={styles.submit} htmlType="submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<LoginProps>()(Login);
