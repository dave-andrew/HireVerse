import {
    FaDiscord,
    FaEnvelopeOpenText,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";

interface Props {
    url: string;
}

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
        <a
            href={`https://${url}`}
            className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pe-3 font-bold text-blue-500 transition-colors *:cursor-pointer">
            {getIcon(url)}
            <label>{url}</label>
        </a>
    );
}
