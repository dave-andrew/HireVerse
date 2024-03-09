// from ui.aceaterntity :D thank you
"use client";

import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import { createNoise3D } from "simplex-noise";
import cn from "../../utils/cn";

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 5,
    speed = "fast",
    waveOpacity = 0.4,
    ...props
}: {
    children?: any;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) => {
    const noise = createNoise3D();
    let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    };

    const init = () => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        nt = 0;
        window.onresize = function () {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };
        render();
    };

    const waveColors = colors ?? ["#007FFF", "#A8D4FF", "#F2994A", "#F27171", "#572484"];
    const drawWave = (n: number) => {
        nt += getSpeed();
        for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 10;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            for (x = 0; x < w; x += 5) {
                var y = noise(x / 800, 0.2 * i, nt) * 100;
                ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
            }
            ctx.stroke();
            ctx.closePath();
        }
    };

    let animationId: number;
    const render = () => {
        ctx.fillStyle = backgroundFill || "transparent";
        ctx.globalAlpha = waveOpacity || 0.01;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
    };

    useEffect(() => {
        init();
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(typeof window !== "undefined" && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"));
    }, []);

    return (
        <div className={cn("relative flex h-screen flex-col items-center justify-center", containerClassName)}>
            <canvas
                className="absolute left-[-4rem] inset-0 z-0"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}></canvas>
            <div
                className={cn("relative z-10", className)}
                {...props}>
                {children}
            </div>
        </div>
    );
};
