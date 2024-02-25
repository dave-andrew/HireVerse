import { useEffect, useRef } from "react";

export default function WorldMap() {
    const gRef = useRef<HTMLDivElement>(null);

    const randomColor = (path: SVGPathElement) => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        path?.setAttribute("fill", randomColor);

        console.log(randomColor);
    };

    useEffect(() => {
        if (gRef.current) {
            const div = gRef.current;
            const path = div.querySelector("path");

            // randomize the color
            randomColor(path as SVGPathElement);
        }
    }, []);

    return (
        <div>
            <img src="/backgrounds/world-map.svg" />
        </div>
    );
}
