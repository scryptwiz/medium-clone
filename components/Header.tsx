import Link from "next/link"

const Header = () => {
    return (
        <header className="flex items-center justify-between p-5 max-w-7xl mx-auto w-full">
            <div>
                <Link href="/">
                    <img className="w-32 md:w-44 object-contain cursor-pointer" src="/logos/header.png" alt="Medium" />
                </Link>
            </div>
            <div className="flex w-fit space-x-5 items-center capitalize">
                <h3 className="hidden md:inline-flex">Our Story</h3>
                <h3 className="hidden md:inline-flex">Membership</h3>
                <h3 className="hidden md:inline-flex">write</h3>
                <h3 className="hidden md:inline-flex">sign in</h3>
                <h3 className="text-white bg-black px-4 py-2 rounded-full">Get Started</h3>
            </div>
        </header>
    )
}

export default Header