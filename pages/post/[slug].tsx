import { GetStaticProps } from "next";
import { sanityClient } from "../../sanity";
import { Post } from "../../typings";

interface Props {
    post: Post
}

function posts({ post }: Props) {
    console.log(post);
    return (
        <div>posts</div>
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
    const query = `*[_type == "posts" && slug.current == "$slug"][0]{
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
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            posts,
        }
    }
}
