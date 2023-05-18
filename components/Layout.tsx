import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import style from './Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>     
       <Link href="/">Profile</Link> | {' '} 
        {/* <Link href="/users">Users List</Link> |{' '}
        <a href="/api/users">Users API</a>|{' '} */}
         {/* <Link href="/movies"> My Movies</Link> | {' '}
        <Link href="/people">People</Link> |{' '} */} 
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
