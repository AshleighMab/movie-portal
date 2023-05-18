import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import style from "../login/style.module.css";
import { useUsers } from "../../providers/users";
import { useNavigate  } from 'react-router-dom';
import Layout from '../../components/Layout'
import { ILogin } from "../../providers/users/context";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { login, Login } = useUsers();

  useEffect(() => {
    if (Login != null) {
    }
  }, [Login]);


  
  const onFinish = async (values: ILogin) => {
    // setLoading(true);
    console.log("Received values:", values);
    if (login) {
      const result = await login(values);
      // setLoading(false);
      if (!authenticated) {
        setError("Incorrect username or password");
      } else {
        setAuthenticated(true);
      }
    }
  };
  return (
    <Layout>
      <div>
        <div className={style.container}>
          <div className={style.wrapper}>
            <div className={style.boardcontainer}>
              <h1 className={style.h1}>LEIGH FILMS</h1>
            </div>

            <Form
              name="normal_login"
              className={style.form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="UserNameOrEmailAddress"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                validateStatus={error ? "error" : ""}
                help={error}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button className={style.button} htmlType="submit" loading={loading}>
                  Login
                </Button>

                <Link className={style.redirect} href="/movies">My Movies</Link> 
              </Form.Item>
            </Form>
          </div>
        </div>
        <Link href="register"></Link>
        <Link style={{ marginRight: "60px" }} href="/movies">
          Movies
        </Link>
      </div>
    </Layout>
  );
}

export default Login;
