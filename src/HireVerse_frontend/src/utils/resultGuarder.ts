export function isOk<T>(result: any): result is { ok: T } {
    return result.hasOwnProperty("ok");
}

export function isErr(result: any): result is { err: string } {
    return result.hasOwnProperty("err");
}
