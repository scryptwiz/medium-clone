import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
    posts: [Post];
}

export default function Posts({ posts }: Props) {
    return (
        <div className="max-w-7xl w-full mx-auto py-10 lg:py-7 gap-5 px-5 md:px-10 lg:px-5 flex">
            <div className="lg:max-w-3xl w-full md:max-w-2xl">
                {posts.map((post) => {
                    return (
                        <Link key={post._id} href={`/post/${post.slug.currnet}`}>
                            <div className="flex items-center gap-2 md:gap-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <img src={urlFor(post.author.image).url()} alt="PostImage" className="object-cover w-6 h-6 rounded-full" />
                                        <p className="text-sm font-medium tracking-wide">{`${post.author.name}`}</p>
                                    </div>
                                    <h2 className="font-bold text-sm md:text-xl text-gray-800">{`${post.title}`}</h2>
                                    <p className="text-md text-gray-600">{`${post.description}`}</p>
                                </div>
                                <img src={urlFor(post.mainImage).url()} alt="PostImage" className="md:w-52 object-cover md:h-32 w-24 h-24" />
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="lg:max-w-sm w-full hidden lg:inline-flex flex-col sticky top-0">
                <h6 className="font-bold text-sm uppercase">discover more of what matters to you</h6>
                <div className="mt-2 flex flex-wrap gap-4">
                    <button className="border border-gray-300 px-3 py-2 rounded">NextJS</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">NextTS</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">ReactJS</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">Tailwind CSS</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">Redux</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">Node Js</button>
                    <button className="border border-gray-300 px-3 py-2 rounded">WEB3 Js</button>
                </div>
            </div>
        </div>
    )
}
