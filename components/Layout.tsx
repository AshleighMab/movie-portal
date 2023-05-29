import React, { ChangeEvent, ReactNode } from "react";
import Head from "next/head";
import style from "./Layout.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useRouter } from "next/router";
import BadgeIcon from "./BadgeIcon";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Movie Portal" }: Props) => {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };


  const isLoginPage = router.pathname === "/login";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={style.header}>
       
        <nav className={style.nav}>
        <a className={style.name} href="/home">
            Leigh Films
          </a>
          <a className={style.a} href="/home">
            Home
          </a>
          |
          <a className={style.a} href="/all_movies">
            All Movies
          </a>
          | 
          <a className={style.a} href="/watchlist">
            <>
              Watch List
              {/* <BadgeIcon /> */}
            </>
          </a>
          | 
          <a className={style.logout} href="/" onClick={handleLogout}>
            <> 
            Logout
             
            </>
          </a>

          <Space
            style={{ marginRight: "20px", marginLeft: "20px" }}
            direction="vertical"
            size={14}
            onClick={handleProfile}
          >
            <Space wrap size={14}>
              <Avatar size={50} icon={<UserOutlined />} />
            </Space>
          </Space>
    
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
