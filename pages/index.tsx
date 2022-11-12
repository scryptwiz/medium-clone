import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '../components/Hero';
import Posts from '../components/Posts';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Medium - where good ideas find you</title>
        <link rel="icon" href="/medium.svg" />
      </Head>

      <Hero />
      {posts && <Posts posts={posts} />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "posts"]{
    _id,
    title,
    slug,
    author -> {
     name,
     image
    },
    description,
    mainImage,
    _createdAt
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    }
  }
}