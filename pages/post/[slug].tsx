import { GetStaticProps } from "next";
import Head from "next/head";
import { AiOutlineSearch } from 'react-icons/ai';
import PostHeader from "../../components/PostHeader";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
    post: Post
}

function posts({ post }: Props) {
    return (
        <div>
            <Head>
                <title>{`${post.title}`}</title>
                <link rel="icon" href="/medium.svg" />
            </Head>

            <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto">
                <PostHeader />
                <div className="flex w-full overflow-y-auto h-auto lg:h-screen">
                    <div className="lg:w-8/12 w-full p-2">
                        <div className="mx-auto w-full lg:w-11/12 px-5 py-5 lg:py-16">
                            <span className="w-full flex gap-3">
                                <img src={urlFor(post.author.image).url()} alt={`${post.author.name} Image`} className='w-10 h-10 rounded-full' />
                                <div className="flex flex-col px-3">
                                    <p className="text-xl">{post.author.name}</p>
                                    <p className="text-light text-xs text-black">Published at {(post._createdAt).toLocaleString()}</p>
                                </div>
                            </span>
                            <div className="mt-3">
                                <h1 className="text-3xl font-bold">{post.title}</h1>
                                <img src={urlFor(post.mainImage).url()} alt={`${post.title}`} className='mt-5 w-full object-cover' />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-4/12 hidden lg:flex border-l border-gray-200 sticky top-0 w-full px-5 lg:py-16">
                        <div className="w-full h-full">
                            <div className="flex gap-10 items-center">
                                <button className="bg-black rounded-full px-16 py-2 text-white">Get Started</button>
                                <button className="text-green-500 text-light text-sm">Sign In</button>
                            </div>
                            <div className="rounded-full w-full border border-200 flex gap-2 px-3 items-center mt-5 group">
                                <AiOutlineSearch className="text-xl" />
                                <input type="text" className="w-full py-3 outline-none text-sm" />
                            </div>
                            <div className="mt-5">
                                <img src={urlFor(post.author.image).url()} alt={`${post.author.name}`} className="w-24 h-24 rounded-full object-cover" />
                                <h3 className="mt-4 font-semibold">{post.author.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default posts

export const getStaticPaths = async () => {
    const query = `*[_type == "posts"]{
        _id,
        slug{
          current
        },
      }`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "posts" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        author -> {
         name,
         image
        },
        description,
        mainImage,
        body,
        _createdAt
      }`;
    const post = await sanityClient.fetch(query, { slug: params?.slug });
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post,
        },
        revalidate: 60,  // after sixty seconds it reupdate the old cache
    }
}
