import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import style from "../login/style.module.css";
import { useUsers } from "../../providers/users";
import { ILogin } from "../../providers/users/context";
import { Avatar, Space } from "antd";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login, Login } = useUsers();

  useEffect(() => {
    if (Login != null) {
    }
  }, [Login]);

  const onFinish = async (values: ILogin) => {
    console.log("Received values:", values);
    if (login) {
      const result = await login(values);
      if (authenticated) {
        setAuthenticated(true);
      } else {
        setError("Incorrect username or password"); 
      }
    }
  };
  return (
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
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar
                  style={{ marginLeft: "160px", marginTop: "-150px" }}
                  size={120}
                  icon={<UserOutlined />}
                />
              </Space>
            </Space>
            <Form.Item
              name="UserNameOrEmailAddress"
              rules={[{ required: true, message: "Please input your Email!" }]}
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
              <Button
                className={style.button}
                htmlType="submit"
                loading={loading}
              >
                Login
              </Button>

              <Button
                className={style.button}
                htmlType="submit"
                loading={loading}
              >
                <Link href="register">Register</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
