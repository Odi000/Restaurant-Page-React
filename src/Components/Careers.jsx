import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import staffImg from "/images/careers.jpg";
import Navbar from "./Navbar";
import { NewsAndOffers, FooterLinks } from "./Footer";
import styles from "./css_modules/Careers.module.css"


export default function Careers() {
    const [openVacancies, setOpenVacancies] = useState(false);
    const videoRef = useRef(null);

    function handleClick() {
        setOpenVacancies(true);
    }
    useEffect(() => {
        const video = videoRef.current;

        function handleVideoReady(e) {
            alert("video is loaded")
        }

        video.addEventListener("canplay", handleVideoReady)

        return () => video.removeEventListener("canplay",handleVideoReady)

    }, [])


    return (
        <>
            <Navbar />
            <section className={styles.hero}>
                <div className="left">
                    <h1>Careers</h1>
                    <div className={styles.buttons}>
                        <button className={`${styles.button} ${styles.redButton}`}>Careers</button>
                        <button className={`${styles.button} ${styles.white}`}>Our Culture</button>
                        <button className={`${styles.button} ${styles.white}`}>Pay & Benefits</button>
                        <button className={`${styles.button} ${styles.white}`}>Vacancies</button>
                    </div>
                </div>
                <div className={styles.video}>
                    <video ref={videoRef} autoPlay muted loop src="/videos/pho-recruitment.mp4"></video>
                </div>
            </section>
            <section className={styles.information}>
                <div className={styles.container}>
                    <h2>Careers</h2>
                    <p>We pride ourselves on not being a corporate chain. We’re a family-run business, and we want this to shine through in everything we do – from the food we cook fresh daily in each restaurant, to the teams we employ and train, to the way we greet and engage with our customers.</p>
                    <p>We don’t employ robots, and we encourage our staff to be themselves at work, so they can feel happy, relaxed and give our customers the best possible Pho experience when they dine with us.</p>
                    <p>If you think like you’d be a good fit for Pho, you can read more about our benefits and explore our vacancies below.</p>
                    <button className={`${styles.redButton} ${styles.button}`} onClick={handleClick}>View Vacancies</button>
                </div>
            </section>
            <NewsAndOffers styleModule={styles} />
            <FooterLinks />
            <Background />
            {openVacancies ?
                <Vacancies openVacancies={openVacancies} setOpenVacancies={setOpenVacancies} />
                : ""
            }
        </>
    )
}

function Vacancies({ openVacancies, setOpenVacancies }) {
    return (
        <div className={openVacancies ? "open container" : "container"}>
            <h2>No vacancies available!</h2>
            <button onClick={() => setOpenVacancies(prevState => false)}>×</button>
        </div>
    )
}

function Background() {
    const backgroundRef = useRef(null);

    useEffect(() => {
        function manageScroll() {
            const width = window.innerWidth;
            const scrolledFromTop = document.documentElement.scrollTop;
            const totalScrollable = document.documentElement.scrollHeight;
            const p = scrolledFromTop / totalScrollable;
            const range = 300;
            const initialTop = -354;
            backgroundRef.current.style.top = `${(initialTop - range * p).toFixed(0)}px`;
        }

        window.addEventListener("scroll", manageScroll)

        return () => window.removeEventListener("scroll", manageScroll);
    }, [])


    return (
        <div ref={backgroundRef} className={styles.background} >
            <img onLoad={()=>alert("img is loaded")} src="/images/background-careers.jpg" />
        </div>
    )
}

export function CareersHomePage() {
    return (
        <div className={styles.careersHomePage}>
            <div className={styles.image}>
                <div>
                    <img src={staffImg} />
                </div>
            </div>
            <div className={styles.info}>
                <h2>CAREERS</h2>
                <h1>We are hiring!</h1>
                <div className={styles.description}>
                    <p>Pho is so much more than a bowl of noodle soup. It’s an obsession – the soul of a nation. Working at Pho is much the same. It’s more than a job, it’s a career. No experience needed, we'd love to hear from you!</p>
                    <Link to="careers" className={styles.redButton}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}