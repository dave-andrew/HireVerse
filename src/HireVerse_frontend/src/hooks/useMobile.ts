import { useEffect, useState } from "react";


export default function useMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768 || window.innerHeight < 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { isMobile };
}