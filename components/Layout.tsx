import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import style from './Layout.module.css';
import {
AppstoreOutlined,
ContainerOutlined,
DesktopOutlined,
MailOutlined,
MenuFoldOutlined,
MenuUnfoldOutlined,
PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
label: React.ReactNode,
key: React.Key,
icon?: React.ReactNode,
children?: MenuItem[],
type?: 'group',
): MenuItem {
return {
key,
icon,
children,
label,
type,
} as MenuItem;
}

const items: MenuItem[] = [
getItem('Option 1', '1', <PieChartOutlined />),
getItem('Option 2', '2', <DesktopOutlined />),
getItem('Option 3', '3', <ContainerOutlined />),

getItem('Navigation One', 'sub1', <MailOutlined />, [
getItem('Option 5', '5'),
getItem('Option 6', '6'),
getItem('Option 7', '7'),
getItem('Option 8', '8'),
]),

getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
getItem('Option 9', '9'),
getItem('Option 10', '10'),

getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
]),
];

type Props = {
children?: ReactNode;
title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
const [collapsed, setCollapsed] = useState(false);

const toggleCollapsed = () => {
setCollapsed(!collapsed);
};

return (
<div>
<Head>
<title>{title}</title>
<meta charSet="utf-8" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
<header className={style.header}>
<div style={{ width: 256 }}>
<Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
</Button>
<Menu
defaultSelectedKeys={['1']}
defaultOpenKeys={['sub1']}
mode="inline"
theme="dark"
inlineCollapsed={collapsed}
items={items}
/>
</div>
<nav className={style.nav}>
<Link href="/">Profile</Link> |
<Link href="/movies">My Movies</Link> |
<Link href="/movies">My Movies</Link> |
</nav>
</header>
{children}
<footer className={style.footer}>
<hr />
<span>I'm here to stay (Footer)</span>
</footer>
</div>
);
};

export default Layout;