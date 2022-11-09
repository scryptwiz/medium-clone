import Banner from "./Banner"
import Header from "./Header"

const Hero = () => {
    return (
        <div className="bg-yellow-400 border-b border-black">
            <Header />
            <hr className="border-black" />
            <Banner />
        </div>
    )
}

export default Hero