import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Profile from "../components/navbar/Profile";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path="/Profile">
                <Profile />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
