export function isOk<T>(result: any): result is { ok: T } {
    if (result.hasOwnProperty("ok")) {
        return true;
    }
    if (result.hasOwnProperty("err")) {
        console.log(result.err);
    }
    return false;
}

export function isErr(result: any): result is { err: string } {
    return result.hasOwnProperty("err");
}
