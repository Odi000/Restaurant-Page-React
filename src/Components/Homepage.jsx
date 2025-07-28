import { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import OurMenu from "./OurMenu";
import Careers from "./Careers";
import useMenu from "./useMenu";

export const Meals = createContext({ meals: [], error: null, loading: true });

function HomePage() {
    const { data:meals, error:errorMeals, loading:loadingMeals } = useMenu('/dishes.json');

    return (
        <div className="homePage">
            <Meals value={{ meals, errorMeals, loadingMeals }}>
                <Navbar></Navbar>
                <MainSection></MainSection>
                <OurMenu></OurMenu>
            </Meals>
        </div>

    )
}

export default HomePage;