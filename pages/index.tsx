import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Medium - where good ideas find you</title>
        <link rel="icon" href="/medium.svg" />
      </Head>

      <Hero />
    </div>
  )
}

export default Home
