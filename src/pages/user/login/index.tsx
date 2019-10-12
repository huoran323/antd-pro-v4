import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { StateType } from './model';
import { connect } from 'dva';
import styles from './style.less';

interface LoginProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
}

// interface LoginState {}

export interface FormDataType {
  username: string;
  password: string;
}

const mapStateToProps = ({ userLogin }: { userLogin: StateType }) => ({
  userLogin,
});

@connect(mapStateToProps)
class Login extends Component<LoginProps, any> {
  // state: LoginState = {};
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('values --', values);
        dispatch({
          type: 'userLogin/login',
          payload: {
            ...values,
          },
        });
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
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                placeholder="请填写用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                placeholder="请填写密码"
              />,
            )}
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
