import { useEffect, useMemo, useRef } from "react";
import throttle from "lodash.throttle";

export interface DebounceOptions {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
}

interface ControlFunctions {
    cancel: () => void;
    flush: () => void;
    isPending: () => boolean;
}

export interface DebouncedState<T extends (...args: any) => ReturnType<T>>
    extends ControlFunctions {
    (...args: Parameters<T>): ReturnType<T> | undefined;
}

export function useThrottleCallback<T extends (...args: any) => ReturnType<T>>(
    func: T,
    delay = 500,
    options?: DebounceOptions,
): DebouncedState<T> {
    const debouncedFunc = useRef<ReturnType<typeof throttle>>();

    useEffect(() => {
        return () => {
            if (debouncedFunc.current) {
                debouncedFunc.current.cancel();
            }
        };
    }, []);

    const debounced = useMemo(() => {
        const debouncedFuncInstance = throttle(func, delay, options);

        const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
            return debouncedFuncInstance(...args);
        };

        wrappedFunc.cancel = () => {
            debouncedFuncInstance.cancel();
        };

        wrappedFunc.isPending = () => {
            return !!debouncedFunc.current;
        };

        wrappedFunc.flush = () => {
            return debouncedFuncInstance.flush();
        };

        return wrappedFunc;
    }, [func, delay, options]);

    // Update the debounced function ref whenever func, wait, or options change
    useEffect(() => {
        debouncedFunc.current = throttle(func, delay, options);
    }, [func, delay, options]);

    return debounced;
}
