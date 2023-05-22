import React, { ChangeEvent, ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import style from './Layout.module.css';
import { useMovies } from '../providers/movies';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Movie Portal' }: Props) => {
  const { getMovies, searchMovie } = useMovies();

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
            Profile
          </a>
          |
          <a className={style.a} href="/movies">
            My Movies
          </a>
          |
          <a className={style.a} href="/users">
            Movies
          </a>
          <input
                style={{ marginRight: '50px', fontWeight: 'bold', height: '30px' }}
                type="text"
                id="search"
                placeholder="    Search for movies"
                name="search"
                prefix="{<SearchOutlined />}"
                onChange={searchMovieHandle}
              />
              <select id="filter" name="category" onChange={searchFilterHandle}>
                <option value="">All</option>
                <option value="action">Action</option>
                <option value="romance">Romance</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="documentary">Documentary</option>
                <option value="musical">Musical</option>
                <option value="thriller">Thriller</option>
              </select>
          <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size={50} icon={<UserOutlined />} />
    </Space>
  
  </Space>
      
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
