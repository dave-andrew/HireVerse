import { FaDiscord, FaEnvelopeOpenText, FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


/**
 * Props interface for SocialMediaItem component
 * @interface
 * @property {string} url - The URL of the social media platform
 */
interface Props {
    url: string;
}

/**
 * Icons object containing the social media icons
 * @type {Object}
 */
const Icons = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    discord: <FaDiscord />,
    whatsapp: <FaWhatsapp />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    tiktok: <FaYoutube />,
    default: <FaEnvelopeOpenText />,
};


/**
 * SocialMediaItem component
 * @param {Props} props - The properties passed to the component
 * @returns {JSX.Element} - The rendered component
 */
export default function SocialMediaItem({ url }: Props) {
    const getIcon = (message: string) => {
        for (const key in Icons) {
            if (message.includes(key)) {
                return Icons[key as keyof typeof Icons];
            }
        }
        return Icons.default;
    };

    return (
        <Link
            to={`https://${url}`}
            className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pe-3 font-bold text-blue-500 transition-colors *:cursor-pointer">
            {getIcon(url)}
            <label>{url}</label>
        </Link>
    );
}
