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
    <header className={style.header}><nav className={style.nav}>
<a className={style.a} href="/">Profile</a> |

<a className={style.a} href="/movies">My Movies</a> |
<a className={style.a} href="/movies">My Movies</a> |

</nav>
</header>
{children}
<footer className={style.footer}>
<hr />
<span>I'm here to stay (Footer)</span>
</footer>
</div>
)

export default Layout