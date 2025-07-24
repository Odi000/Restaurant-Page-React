import { Link } from "react-router-dom";

function OurMenu() {
    return (
        <section className="ourMenu">
            <h1>Our Menu</h1>
            <Dropdown></Dropdown>
        </section>
    )
}

function Dropdown() {
    return (
        <select name="categoryList" id="categoryList">
            <option value="kar">kari n P</option>
        </select>
    )
}

export default OurMenu;