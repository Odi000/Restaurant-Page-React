import Navbar from "./Navbar";
import MainSection from "./MainSection";
import OurMenu from "./OurMenu";
import { CareersHomePage } from "./Careers";
import Footer from "./Footer";

function HomePage() {
    return (
        <div className="homePage">
            <Navbar></Navbar>
            <MainSection></MainSection>
            <OurMenu></OurMenu>
            <CareersHomePage></CareersHomePage>
            <Footer></Footer>
        </div>
    )
}

export default HomePage;