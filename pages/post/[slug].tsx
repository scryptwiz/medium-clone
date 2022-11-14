import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import PortableText from "react-portable-text";
import PostHeader from "../../components/PostHeader";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface importFormInput {
    _id: String;
    name: String;
    email: String;
    comment: String;
}

interface Props {
    post: Post
}

function posts({ post }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<importFormInput>();
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<importFormInput> = async (data) => {
        setLoading(true)
        await fetch('/api/createComment', {
            method: "POST",
            body: JSON.stringify(data),
        }).then(() => {
            setLoading(false)
            console.log(data);
            setSubmitted(true)
        }).catch(err => {
            setLoading(false)
            setSubmitted(false)
            console.log(err);
        })
        console.log(data);
    }
    return (
        <div>
            <Head>
                <title>{`${post.title}`}</title>
                <link rel="icon" href="/medium.svg" />
            </Head>

            <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto">
                <PostHeader />
                {/* Post Section     */}
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
                            <div className="mt-5">
                                <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} projectId={process.env.NEXT_PUBLIC_PROJECT_ID} content={post.body} serializers={{
                                    h1: (props: any) => <h1 className="text-3xl font-bold my-5" {...props} />,
                                    p: (props: any) => <p className="text-lg my-5" {...props} />,
                                    h2: (props: any) => <h2 className="text-2xl font-bold my-5" {...props} />,
                                    li: (props: any) => <li className="ml-4 list-disc" {...props} />,
                                    link: ({ href, children }: any) => <a href={href} className="text-blue-500 hover:underline">{children}</a>,
                                }} />
                            </div>
                            {/* Leave Comment Section */}
                            <hr className="max-w-lg mx-auto border-5 my-5 border-yellow-500" />
                            {submitted ? (
                                <div className="flex flex-col p-10 my-100 bg-yellow-500 text-white mx-w-2xl mx-auto">
                                    <h1 className="text-3xl font-bold">Thanks for commenting</h1>
                                    <p className="">Once it has been approved, it will appear below</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-2-2xl mx-auto">
                                    <h4 className="text-xl font-semibold mb-10">Leave a comment below</h4>
                                    <input {...register('_id')} type="hidden" name="_id" value={post._id} />
                                    <label className="block mb-5">
                                        <span className="text-gray-700">Name</span>
                                        <input {...register('name', { required: true })} className="shadow border rounded py-2 px-3 form-input mt-3 block w-full ring-yellow-500 focus:ring outline-none ring-0" type="text" placeholder="John Doe" />
                                        {errors.name && (<span className="text-red-500 mt-2">Name Field is required</span>)}
                                    </label>
                                    <label className="block mb-5">
                                        <span className="text-gray-700">Email</span>
                                        <input {...register('email', { required: true })} className="shadow border rounded py-2 px-3 form-input mt-3 block w-full ring-yellow-500 focus:ring outline-none ring-0" type="text" placeholder="example@gmail.com" />
                                        {errors.email && (<span className="text-red-500 mt-2">Email Field is required</span>)}
                                    </label>
                                    <label className="block mb-5">
                                        <span className="text-gray-700">Comment</span>
                                        <textarea {...register('comment', { required: true })} className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none ring-0" rows={8} placeholder="Leave a comment..." />
                                        {errors.comment && (<span className="text-red-500 mt-2">Comment Field is required</span>)}
                                    </label>
                                    {loading ? (
                                        <button disabled className="bg-yellow-400 focus:shadow-outline outline-none text-white py-2 px-4 rounded cursor-pointer font-bold">Loading...</button>
                                    ) : (
                                        <input type="submit" className="bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline outline-none text-white py-2 px-4 rounded cursor-pointer font-bold" />
                                    )}
                                </form>
                            )}
                            {/* Approved Comment Section */}
                            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-400 space-y-2">
                                <h3 className="text-4xl">Comments</h3>
                                <hr className="pb-2" />
                                {post.comments.map((Comment) => {
                                    return (
                                        <div key={Comment._id}>
                                            <p><span className="text-yellow-500">{Comment.name}</span>:{Comment.comment}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Right Info Section */}
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
        'comments': *[ _type=="comment"&& post._ref==^._id && approved==true ],
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
