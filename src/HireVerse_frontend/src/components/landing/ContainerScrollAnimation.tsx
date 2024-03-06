"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useMobile from "../../hooks/useMobile";
import canisterInjector from "../../utils/canisterInjector";

export const ContainerScroll = ({
    titleComponent,
    parentRef,
}: {
    titleComponent: string | React.ReactNode;
    parentRef: React.MutableRefObject<HTMLElement | null>;
}) => {
    const containerRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        container: parentRef,
        target: containerRef,
    });

    const { isMobile } = useMobile();

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
            ref={containerRef}>
            <div
                className="relative w-full py-10 md:py-40"
                style={{
                    perspective: "1000px",
                }}>
                <Header
                    translate={translate}
                    titleComponent={titleComponent}
                />
                <Card
                    rotate={rotate}
                    translate={translate}
                    scale={scale}
                />
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: any) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div mx-auto max-w-5xl text-center">
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({ rotate, scale, translate }: { rotate: any; scale: any; translate: any }) => {
    return (
        <motion.div
            style={{
                rotateX: rotate, // rotate in X-axis
                scale,
                boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="mx-auto -mt-12 h-[20rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-6 shadow-2xl md:h-[30rem]">
            <div className="grid h-full w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-gray-100 md:grid-cols-3 lg:grid-cols-5">
                <img
                    className="col-span-1 h-full w-full rounded-2xl object-cover md:col-span-3 lg:col-span-5"
                    alt="Preview"
                    src={canisterInjector(
                        "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
                    )}
                />
            </div>
        </motion.div>
    );
};
