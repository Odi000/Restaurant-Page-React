import { Link, useParams } from "react-router-dom";
import staffImg from "/images/careers.jpg";
import { useReducer } from "react";


function Careers() {
    const { name } = useParams();
    let text = "Feature Coming Soon!";

    if (name === "careers") text = "We are not hiring."
    else if (name === "DzoToGo") text = "Store options"

return (
    <>
        <Link to="/">Back</Link>
        <div>{text}</div>
    </>
)
}

export function CareersHomePage() {
    return (
        <div className="careersHomePage">
            <div className="info">
                <h2>CAREERS</h2>
                <h1>We are hiring!</h1>
                <div className="description">
                    <p>Pho is so much more than a bowl of noodle soup. It’s an obsession – the soul of a nation. Working at Pho is much the same. It’s more than a job, it’s a career. No experience needed, we'd love to hear from you!</p>
                    <Link className="button red">Careers</Link>
                </div>
            </div>
            <div className="image">
                <img src={staffImg} />
            </div>
        </div>
    )
}

export default Careers;