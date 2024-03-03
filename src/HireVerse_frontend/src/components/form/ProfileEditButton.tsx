import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

interface Props {
    className?: string;
    editStateProps?: {
        editState: boolean;
        setEditState: Dispatch<SetStateAction<boolean>>;
    };
    onClick?: () => void;
}

export default function ProfileEditButton({
    className,
    editStateProps,
    onClick,
}: Props) {
    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
        if (editStateProps) {
            editStateProps.setEditState((prev) => !prev);
        }
    };

    return (
        <div
            onClick={handleOnClick}
            className={`absolute z-10 flex flex-row items-center justify-center gap-3 ${className}`}>
            {!editStateProps ? (
                <button className="text-blue-primary hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white transition-colors xl:p-1.5 2xl:p-2">
                    <FaRegEdit className="xl:text-md 2xl:text-xl" />
                </button>
            ) : (
                <>
                    {editStateProps?.editState ? (
                        <button className="text-blue-primary hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white p-2 transition-colors">
                            <FaRegEdit className="xl:text-md 2xl:text-xl" />
                        </button>
                    ) : (
                        <button className="hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white p-2 text-green-500 transition-colors">
                            <FaCheck className="xl:text-md 2xl:text-xl" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
