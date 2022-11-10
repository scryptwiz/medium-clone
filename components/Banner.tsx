const Banner = () => {
    return (
        <div className="flex items-center justify-between py-20 lg:py-5 px-5 max-w-7xl mx-auto">
            <div className="flex flex-col gap-10 py-5">
                <h1 className="text-6xl md:text-8xl max-w-xl font-serif">Stay curious.</h1>
                <h2 className="text-2xl font-medium">Discover stories, thinking, and expertise from writers on any topic.</h2>
                <h3 className="px-9 py-2.5 bg-black text-white w-fit rounded-full text-xl font-semi">Start reading</h3>
            </div>
            <img src="/images/hero.svg" alt="medium animation" className="hidden md:inline-flex md:max-w-xs lg:max-w-lg" />
        </div>
    )
}

export default Banner