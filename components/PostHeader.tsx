import Link from "next/link";
import { AiOutlineHome } from 'react-icons/ai';
import { BsBookmarks, BsMedium } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TfiWrite } from 'react-icons/tfi';
import { VscListSelection } from 'react-icons/vsc';

export default function PostHeader() {
    return (
        <nav>
            {/* Medium screen */}
            <header className="flex lg:hidden items-center justify-between p-5 max-w-7xl mx-auto w-full">
                <div>
                    <Link href="/">
                        <img className="w-32 md:w-44 object-contain cursor-pointer" src="/logos/header.png" alt="Medium" />
                    </Link>
                </div>
                <div className="flex w-fit items-center capitalize">
                    <h3 className="text-white bg-black px-4 py-2 rounded-full">Get Started</h3>
                </div>
            </header>
            {/* Large Screen */}
            <header className="border-r border-gray-200 w-fit h-screen lg:inline-flex hidden flex-col items-left justify-between py-9 mx-auto items-center">
                <Link href="/" className="px-5">
                    <BsMedium className="text-5xl" />
                </Link>
                <div className="flex w-fit flex-col gap-10 items-center capitalize px-5">
                    <Link href='/'><AiOutlineHome className="font-thin text-2xl" /></Link>
                    <Link href='/'><IoMdNotificationsOutline className="font-thin text-2xl" /></Link>
                    <Link href='/'><BsBookmarks className="font-thin text-2xl" /></Link>
                    <Link href='/'><VscListSelection className="font-thin text-2xl" /></Link>
                </div>
                <div className="flex w-fit flex-col gap-10 items-center capitalize border-t border-gray-200 px-5 py-10">
                    <Link href='/'><TfiWrite className="font-thin text-2xl" /></Link>
                </div>
            </header>
        </nav>
    )
}