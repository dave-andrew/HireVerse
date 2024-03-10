import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from "./useEventListener";
import { Principal } from "@dfinity/principal";

declare global {
    interface WindowEventMap {
        "local-storage": CustomEvent;
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    const readValue = useCallback((): T => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue: SetValue<T> = useCallback(
        (value) => {
            if (typeof window == "undefined") {
                console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
            }

            try {
                const newValue = value instanceof Function ? value(storedValue) : value;

                window.localStorage.setItem(key, stringifyJSON(newValue));

                setStoredValue(newValue);

                window.dispatchEvent(new Event("local-storage"));
            } catch (error) {
                console.warn(`Error setting localStorage key “${key}”:`, error);
            }
        },
        [key, storedValue],
    );

    useEffect(() => {
        setStoredValue(readValue());
    }, []);

    const handleStorageChange = useCallback(() => {
        setStoredValue(readValue());
    }, [readValue]);

    useEventListener("storage", handleStorageChange);

    useEventListener("local-storage", handleStorageChange);

    return [storedValue, setValue];
}
const stringifyJSON = <T>(value: T): string => {
    try {
        return JSON.stringify(value, (key, value) => {
            if (typeof value === "bigint") {
                return `bigint|${value}`;
            }
            if (typeof value === "object" && value instanceof Uint8Array) {
                const arr = Array.from(value);
                return `blob|${JSON.stringify(arr)}`;
            }

            return value;
        });
    } catch (e) {
        console.error(e);
        console.error("stringify error on", { value });
        return "";
    }
};

const parseJSON = <T>(value: string | null): T | undefined => {
    try {
        if (value === "undefined") {
            return undefined;
        }

        return JSON.parse(value ?? "", (key, value) => {
            if (typeof value === "string" && value.startsWith("bigint|")) {
                return BigInt(value.slice(7));
            }
            if (typeof value === "string" && value.startsWith("blob|")) {
                const arr = JSON.parse(value.slice(5));
                return new Uint8Array(arr);
            }
            if (key === "__principal__") {
                return Principal.fromText(value);
            }
            return value;
        });
    } catch {
        console.error("parsing error on", { value });
        return undefined;
    }
};
