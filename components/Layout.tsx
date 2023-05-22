import React, { ChangeEvent, ReactNode } from "react";
import Head from "next/head";
import style from "./Layout.module.css";
import { useMovies } from "../providers/movies";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useUsers } from "../providers/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from 'next/router';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Movie Portal" }: Props) => {
  const { getMovies, searchMovie } = useMovies();
  const { getUserInfo } = useUsers();
  const router = useRouter();
  const searchMovieHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search) {
      searchMovie(search);
      // } else {
      //   getMovies();
    }
  };

  const searchFilterHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    const search = event.target.value;
    if (search) {
      searchMovie(search);
      // } else {
      //   getMovies();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    router.push('/login'); // Redirect to the login page
  }

  const isLoginPage = router.pathname === '/login';

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={style.header}>
        <nav className={style.nav}>
          <a className={style.a} href="/">
            Home
          </a>
          |
          <a className={style.a} href="/watchlist">
            Watch List
          </a>
          {/* |
          <a className={style.a} href="/users">
            Movies
          </a> */}
          <input
            style={{ marginRight: "40px", fontWeight: "bold", height: "20px" }}
            type="text"
            id="search"
            placeholder="    Search for movies"
            name="search"
            prefix="{<SearchOutlined />}"
            onChange={searchMovieHandle}
          />
          <select id="filter" name="category" onChange={searchFilterHandle}>
            <option value="">Filter</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
            <option value="musical">Musical</option>
            <option value="thriller">Thriller</option>
          </select>
          <Space   style={{ marginRight: "20px", marginLeft:"20px" }} direction="vertical" size={16}>
            <Space wrap size={16}>
              <Avatar size={50} icon={<UserOutlined />} />
            </Space>
          </Space>
          {!isLoginPage && (
            <button style={{ marginRight: '40px' }} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </nav>
      </header>
      {children}
      {/* <footer className={style.footer}>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer> */}
    </div>
  );
};

export default Layout;
