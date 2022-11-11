import { GetStaticProps } from "next";
import Head from "next/head";
import PostHeader from "../../components/PostHeader";
import { sanityClient } from "../../sanity";
import { Post } from "../../typings";

interface Props {
    post: Post
}

function posts({ post }: Props) {
    // console.log(post);
    return (
        <div>
            <Head>
                <title>{`${post.title}`}</title>
                <link rel="icon" href="/medium.svg" />
            </Head>

            <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto">
                <PostHeader />
                <div className="flex w-full overflow-y-auto h-screen">
                    <div className="lg:w-8/12 w-full bg-gray-700 p-2">

                    </div>
                    <div className="lg:w-4/12 hidden lg:flex bg-black p-2">

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
        body
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
