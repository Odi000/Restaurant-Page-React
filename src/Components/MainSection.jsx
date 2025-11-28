import { Link, NavLink } from "react-router-dom";
import { Meals } from "./Homepage";
import { useContext } from "react";
import styles from "./css_modules/MainSection.module.css";


function MainSection() {
    return (
        <section className={styles.mainSection}>
            <h1>Vietnamese street food</h1>
            <Buttons></Buttons>
            <div className={styles.imgWrapper}>
                <img src="/images/hero-image.jpg" />
            </div>
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
        <div className={styles.buttons}>
            <Link onClick={scrollToMenu} >Menu</Link>
            <Link>Book A Table</Link>
            <Link>Dzo to go</Link>
            <NavLink to="/careers" end>Careers</NavLink>
            <Link>Nutrition</Link>
        </div >
    )
}

export default MainSection;