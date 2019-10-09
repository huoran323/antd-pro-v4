import React, {Component} from "react";
import {Dispatch} from "redux"
import {Form, Input, Icon} from "antd";
import { FormComponentProps } from 'antd/es/form';
import styles from "./style.less"

interface LoginProps {
  dispatch: Dispatch<any>;
  form?: FormComponentProps['form'];
}

interface LoginState {

}

class Login extends Component<LoginProps, LoginState> {

  render() {
    const { form } = this.props;
    console.log("form --", form);

    return (
      <div className={styles.main}>
        <Form>
          <Form.Item>
            {/*{getFieldDecorator('username', {*/}
              {/*rules: [{ required: true, message: 'Please input your username!' }],*/}
            {/*})(*/}
              {/*<Input*/}
                {/*prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                {/*placeholder="Username"*/}
              {/*/>,*/}
            {/*)}*/}
          </Form.Item>
        </Form>
        我是登录页面
      </div>
    )
  }
}

export default Login;
