import {FaCheck, FaRegEdit} from "react-icons/fa";
import {Dispatch, SetStateAction} from "react";


/**
 * Props interface for ProfileEditButton component
 * @interface
 * @property {string} [className] - The CSS classes for the component
 * @property {object} [editStateProps] - The state and setter for the edit state
 * @property {boolean} editStateProps.editState - The current edit state
 * @property {Dispatch<SetStateAction<boolean>>} editStateProps.setEditState - The setter for the edit state
 * @property {() => void} [onClick] - The onClick event handler
 */
interface Props {
    className?: string;
    editStateProps?: {
        editState: boolean;
        setEditState: Dispatch<SetStateAction<boolean>>;
    };
    onClick?: () => void;
}


/**
 * ProfileEditButton component
 * @param {Props} props - The properties passed to the component
 * @returns {JSX.Element} - The rendered component
 */
export default function ProfileEditButton({className, editStateProps, onClick}: Props) {
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
                <button
                    className="text-blue-primary hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white transition-colors p-1.5 2xl:p-2">
                    <FaRegEdit className="xl:text-md 2xl:text-xl"/>
                </button>
            ) : (
                <>
                    {editStateProps?.editState ? (
                        <button
                            className="text-blue-primary hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white p-2 transition-colors">
                            <FaRegEdit className="xl:text-md 2xl:text-xl"/>
                        </button>
                    ) : (
                        <button
                            className="hover:bg-signature-gray z-50 rounded-lg border-[1px] bg-white p-2 text-green-500 transition-colors">
                            <FaCheck className="xl:text-md 2xl:text-xl"/>
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
