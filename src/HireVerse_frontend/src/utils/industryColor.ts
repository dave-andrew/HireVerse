export default function getIndustryColor(industry: string, type: string = "bg") {
    const firstChar = industry.charAt(0).toLowerCase();
    const charCode = firstChar.charCodeAt(0);
    if (charCode >= 97 && charCode <= 122) {
        let hue = ((charCode - 97) / 26) * 360;
        let lightness = 90;
        if (type === "text" || type === "border") {
            // hue = (hue + 180) % 360;
            lightness -= 70;
        }
        return `hsl(${hue}, 100%, ${lightness}%)`;
    }
    return "hsl(0, 100%, 90%)";
}