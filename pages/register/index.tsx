import { Form, Input, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import style from "../../pages/register/style.module.css";
import { useUsers } from "../../providers/users";
import { IUser } from "../../providers/users/context";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser, UserCreated } = useUsers();

  useEffect(() => {
    if (UserCreated != null) {
      console.log("User created");
    }
  }, [UserCreated]);

  const onFinish = async (values: IUser) => {
    setLoading(true);
    console.log("Received values:", values);
    if (createUser) {
      createUser(values);
    } else {
      console.log("Failed to create person");
      alert("Failed to create person");
      setAuthenticated(false);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <Form className={style.form} layout="vertical" onFinish={onFinish}>
          <Space direction="vertical" size={16}>
            <Space wrap size={16}>
              <Avatar
                style={{ marginLeft: "180px", marginTop: "-100px" }}
                size={100}
                icon={<UserOutlined />}
              />
            </Space>
          </Space>
          <Form.Item name="userName" className={style.label}>
            <Input
              value={userName}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="name" className={style.label}>
            <Input
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="surname" className={style.label}>
            <Input
              placeholder="Last Name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="password" className={style.label}>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="phoneNumber" className={style.label}>
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="emailAddress" className={style.label}>
            <Input
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="gender" className={style.label}>
            <Select
              placeholder="Gender"
              value={gender}
              onChange={(value) => setGender(value === "male" ? "1" : "2")}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button id={style.button} htmlType="submit">
              Register
            </Button>

            <Button id={style.button} htmlType="submit" loading={loading}>
              <a href="login">Login</a>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
