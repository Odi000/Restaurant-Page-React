import { Link } from "react-router-dom";
import { Meals } from "./Homepage";
import { useContext } from "react";

function MainSection() {
    return (
        <section className="mainSection">
            <h1>Vietnamese street food</h1>
            <Buttons></Buttons>
        </section>
    )
}

function Buttons() {
    const { ourMenuRef } = useContext(Meals);

    function scrollToMenu() {
        ourMenuRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }

    return (
        <div className="buttons">
            <Link onClick={scrollToMenu} >Menu</Link>
            <Link>Book A Table</Link>
            <Link>Dzo to go</Link>
            <Link to="careers">Careers</Link>
        </div >
    )
}

export default MainSection;