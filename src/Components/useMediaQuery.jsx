import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const handler = (e) => setMatches(e.matches);
        media.addEventListener("change", handler)
    }, [query]);

    return matches;
} 