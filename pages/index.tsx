import Link from 'next/link'
import Layout from '../components/Layout'
import React from "react";
import { RestfulProvider } from "restful-react";
import App from '../pages/App'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <RestfulProvider base="https://localhost:44311/api/services/app">
    <App />
  </RestfulProvider>
  </Layout>
)

export default IndexPage
