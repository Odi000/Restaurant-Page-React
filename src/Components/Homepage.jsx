import { useState, useEffect, useContext, createContext, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import OurMenu from "./OurMenu";
import Careers from "./Careers";
import useMenu from "./useMenu";
import { CareersHomePage } from "./Careers";
import Footer from "./Footer";
import styles from "./css_modules/Homepage.module.css";

export const Meals = createContext({ meals: [], error: null, loading: true });

function HomePage() {
    const { data: meals, error: errorMeals, loading: loadingMeals } = useMenu('/dishes.json');
    const ourMenuRef = useRef(null)


    return (
        <div className="homePage">
            <Meals value={{ meals, errorMeals, loadingMeals, ourMenuRef }}>
                <Navbar></Navbar>
                <MainSection></MainSection>
                <OurMenu></OurMenu>
            </Meals>
            <CareersHomePage></CareersHomePage>
            <Footer></Footer>
        </div>

    )
}

export default HomePage;