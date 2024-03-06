"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import useMobile from "../../hooks/useMobile";

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
            className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
            ref={containerRef}
        >
            <div
                className="py-10 md:py-40 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
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
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
                         rotate,
                         scale,
                         translate,
                     }: {
    rotate: any;
    scale: any;
    translate: any;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate, // rotate in X-axis
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="max-w-5xl -mt-12 mx-auto h-[20rem] md:h-[30rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
        >
            <div
                className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden">
                <img
                    className="h-full w-full object-cover rounded-2xl col-span-1 md:col-span-3 lg:col-span-5"
                    alt="Preview"
                    src={"https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"} />
            </div>
        </motion.div>
    );
};
