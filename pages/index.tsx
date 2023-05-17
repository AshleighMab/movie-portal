import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link'
// import './LoginStyle.css';
import { useUsers } from '../providers/users';
import { ILogin } from '../providers/users/context';

interface LoginProps {
  onFormSwitch: (formType: string) => void;
}

function Login({ onFormSwitch }: LoginProps): JSX.Element {

  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { login, Login } = useUsers();

  useEffect(() => {
    if (Login != null) {
    }
  }, [Login])

  const onFinish = async (values: ILogin) => {
    // setLoading(true);
    console.log('Received values:', values);
    if (login) {
      const result = await login(values);
      // setLoading(false);
      if (!authenticated) {
        setError('Incorrect username or password');
      } else {
        setAuthenticated(true);
      }
    }
  };
  return (
    
    <div>
      {isLoginForm} {
         (
          <div className="login-form-container">
            <div className="form-wrapper" >
              <div className="clapperboard-container">
             

                <h1 className='h1'>LEIGH FILMS</h1>
              </div>

              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}

              >
                <Form.Item
                  name="UserNameOrEmailAddress"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                  validateStatus={error ? 'error' : ''}
                  help={error}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button id="login-button" htmlType="submit" loading={loading}>
                    Login
                  </Button>

                  <Button id="login-button" onClick={() => onFormSwitch('signup')}>
                    Register
                  </Button>

                </Form.Item>
              </Form>
            </div>

            <Link href="/movies">Movies</Link>
          </div>

        )}
    </div>
  );


}

export default Login;