"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import cn from "../../utils/cn";
import { FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";

export const TextRevealCard = ({
                                   text,
                                   revealText,
                                   children,
                                   className,
                               }: {
    text: string;
    revealText: string;
    children?: React.ReactNode;
    className?: string;
}) => {
    const [widthPercentage, setWidthPercentage] = useState(0);
    const cardRef = useRef<HTMLDivElement | any>(null);
    const [left, setLeft] = useState(0);
    const [localWidth, setLocalWidth] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);

    useEffect(() => {
        if (cardRef.current) {
            const { left, width: localWidth } =
                cardRef.current.getBoundingClientRect();
            setLeft(left);
            setLocalWidth(localWidth);
            console.log("left", left, "localWidth", localWidth);
        }
    }, []);

    function mouseMoveHandler(event: any) {
        event.preventDefault();

        const { clientX } = event;
        if (cardRef.current) {
            const relativeX = clientX - left;
            setWidthPercentage((relativeX / localWidth) * 100);
        }
    }

    function mouseLeaveHandler() {
        setIsMouseOver(false);
        setWidthPercentage(0);
    }

    function mouseEnterHandler() {
        setIsMouseOver(true);
    }

    const rotateDeg = (widthPercentage - 50) * 0.1;
    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            onMouseMove={mouseMoveHandler}
            ref={cardRef}
            className={cn(
                "bg-[#1d1c20] w-full py-24 relative overflow-hidden flex flex-col gap-5 snap-end",
                className,
            )}
        >

            <div className="px-24 flex flex-col text-white">
                <div className="text-xl font-semibold">
                    Created for:
                </div>
                <div className="relative flex items-center overflow-hidden">
                    <motion.div
                        style={{
                            width: "100%",
                        }}
                        animate={
                            isMouseOver
                                ? {
                                    opacity: widthPercentage > 0 ? 1 : 0,
                                    clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                                }
                                : {
                                    clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                                }
                        }
                        transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
                        className="absolute bg-[#1d1c20] z-20  will-change-transform"
                    >
                        <p
                            style={{
                                textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
                            }}
                            className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
                        >
                            {revealText}
                        </p>
                    </motion.div>
                    <motion.div
                        animate={{
                            left: `${widthPercentage}%`,
                            rotate: `${rotateDeg}deg`,
                            opacity: widthPercentage > 0 ? 1 : 0,
                        }}
                        transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
                        className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
                    ></motion.div>

                    <div
                        className=" overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
                        <p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
                            {text}
                        </p>
                        <MemoizedStars />
                    </div>
                </div>
            </div>

            <div className=" px-24 mt-24 flex flex-col gap-4 text-gray-500">
                <div className="text-xl font-semibold flex flex-row gap-2 place-items-center">
                    Developed with <FaHeart /> by:
                </div>
                <div className="grid grid-cols-3 py-8 gap-4 ">
                    <a
                        target="_blank"
                        href="https://github.com/dave-andrew"
                        className="hover:bg-[#27262d] cursor-pointer p-6 text-center rounded-lg flex flex-col gap-4 place-items-center justify-center">
                        <div className="text-5xl">Dave Andrew Nathaniel</div>
                        <div className="flex flex-col gap-1 text-center place-items-center">
                            <div className="flex flex-row gap-2 place-items-center">
                                <FaLinkedin /> dave-andrew-nathaniel-54a99b251
                            </div>
                            <div className="flex flex-row gap-2 place-items-center"><FaGithub /> dave-andrew</div>
                        </div>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/yahkerobertkertasnya"
                        className="hover:bg-[#27262d] cursor-pointer p-6 text-center rounded-lg flex flex-col gap-4 place-items-center justify-center">
                        <div className="text-5xl">Robert William</div>
                        <div className="flex flex-col gap-1 text-center place-items-center">
                            <div className="flex flex-row gap-2 place-items-center">
                                <FaLinkedin /> in/robert-wiliam-b1a69b252
                            </div>
                            <div className="flex flex-row gap-2 place-items-center"><FaGithub /> yahkerobertkertasnya
                            </div>
                        </div>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/vncnttan"
                        className="hover:bg-[#27262d] cursor-pointer p-6 text-center rounded-lg flex flex-col gap-4 place-items-center justify-center">
                        <div className="text-5xl">Vincent Tanjaya</div>
                        <div className="flex flex-col gap-1 text-center place-items-center">
                            <div className="flex flex-row gap-2 place-items-center"><FaLinkedin /> in/vincent-tanjaya
                            </div>
                            <div className="flex flex-row gap-2 place-items-center"><FaGithub /> vncnttan</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};


const Stars = () => {
    const randomMove = () => Math.random() * 4 - 2;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();
    return (
        <div className="absolute inset-0">
            {[...Array(140)].map((_, i) => (
                <motion.span
                    key={`star-${i}`}
                    animate={{
                        top: `calc(${random() * 100}% + ${randomMove()}px)`,
                        left: `calc(${random() * 100}% + ${randomMove()}px)`,
                        opacity: randomOpacity(),
                        scale: [1, 1.2, 0],
                    }}
                    transition={{
                        duration: random() * 10 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: `${random() * 100}%`,
                        left: `${random() * 100}%`,
                        width: `2px`,
                        height: `2px`,
                        backgroundColor: "white",
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                    className="inline-block"
                ></motion.span>
            ))}
        </div>
    );
};

export const MemoizedStars = memo(Stars);
