import { Form, Input, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import style from '../../pages/register/style.module.css';
import { useUsers } from '../../providers/users';
import { IUser } from '../../providers/users/context';
import Layout from '../../components/Layout'

type Props = {
    onFormSwitch: (formType: string) => void;
};

const SignUp = ({ onFormSwitch }: Props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');  
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const { createUser, UserCreated } = useUsers();


    useEffect(() => {

        if (UserCreated != null) {
            console.log("User created");
        }
    }, [UserCreated])



    const onFinish = async (values: IUser) => {
        setLoading(true);
        console.log('Received values:', values);
        if (createUser) {
            createUser(values)
        } else {
            console.log('Failed to create person');
            alert('Failed to create person');
            setAuthenticated(false);
        }
    }

    return (
        <Layout>
        <div>
                         <div className={style.container}>

                    <Form className={style.form} layout="vertical" onFinish={onFinish}>
                        <Form.Item name="userName" label="UserName">
                            <Input value={userName} onChange={e => setUserName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="name" label="First Name">
                            <Input value={name} onChange={e => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="surname" label="Last Name">
                            <Input value={surname} onChange={e => setSurname(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="phoneNumber" label="Phone Number">
                            <Input value={phoneNumber} onChange={e => setNumber(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="emailAddress" label="Email Address">
                            <Input value={emailAddress} onChange={e => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender">
                            <Select value={gender} onChange={value => setGender(value === 'male' ? '1' : '2')}>
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button id={style.button} htmlType="submit">
                                Register
                            </Button>

                            <Button  id={style.button} htmlType="submit" loading={loading} >
                            <a href="login">Login</a>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
        </div>
        </Layout>
    );
};

export default SignUp;
