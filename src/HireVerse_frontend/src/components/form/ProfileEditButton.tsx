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
            className={`absolute flex flex-row gap-3 justify-center items-center ${className}`}>
            {!editStateProps ? (
                <button className="bg-white border-[1px] text-blue-primary rounded-lg xl:p-1.5 2xl:p-2 z-50 transition-colors hover:bg-signature-gray">
                    <FaRegEdit className="text-sm" />
                </button>
            ) : (
                <>
                    {editStateProps?.editState ? (
                        <button className="bg-white border-[1px] text-blue-primary rounded-lg p-2 z-50 transition-colors hover:bg-signature-gray">
                            <FaRegEdit size="1.25rem" />
                        </button>
                    ) : (
                        <button className="bg-white border-[1px] text-green-500 rounded-lg p-2 z-50 transition-colors hover:bg-signature-gray">
                            <FaCheck size="1.25rem" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
