import { Link } from "react-router-dom";

function MainSection() {
    return (
        <section className="mainSection">
            <h1>Vietnamese street food</h1>
            <Buttons></Buttons>
        </section>
    )
}

function Buttons() {
    return (
        <div className="buttons">
            <Link>Menu</Link>
            <Link>Book A Table</Link>
            <Link>Dzo to go</Link>
            <Link to="careers/careers">Careers</Link>
        </div >
    )
}

export default MainSection;