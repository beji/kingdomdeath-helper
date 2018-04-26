export function clone<T>(arg: T): T {
    return JSON.parse(JSON.stringify(arg));
}
