import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import OurMenu from "./OurMenu";
import Careers from "./Careers";


function HomePage() {
    return (
        <div className="homePage">
            <Navbar></Navbar>
            <MainSection></MainSection>
            <OurMenu></OurMenu>
        </div>
    )
}

export default HomePage;