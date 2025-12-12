import styles from "./css_modules/pullOutComingSoon.module.css"

export default function pullOutComingSoon(e, message="Cooming soon!") {
    const body = document.body;
    const p = document.createElement("p");
    const offset = 26;
    const ascend = offset + 54;

    p.textContent = message;
    p.classList.add(styles.comingSoon)
    p.style.left = e.pageX + "px";
    p.style.top = (e.pageY - offset) + "px";

    body.appendChild(p);

    setTimeout(() => {
        p.classList.add(styles.fade);
        p.style.top = (e.pageY - ascend) + "px";
    }, 10)

    function handleTransition(e) {
        if (!(e.currentTarget === p)) return;
        body.removeChild(p);
        p.removeEventListener("transitionend", handleTransition);
    }

    p.addEventListener("transitionend", handleTransition)
}
