import "server-only";
import { BOOLEAN_FLAGS, STRING_FLAGS, NUMBER_FLAGS } from "@/utils/Site/flags";

type Flag<T> = () => Promise<T | undefined>;

// Run a flag, fall back if it's undefined or throws
async function read<T>(flag: Flag<T>, fallback: T): Promise<T> {
    try {
        return (await flag()) ?? fallback;
    } catch {
        return fallback;
    }
}

export default class FlagSettings {
    public static GetBoolean(name: keyof typeof BOOLEAN_FLAGS, fallback = false) {
        return read<boolean>(BOOLEAN_FLAGS[name], fallback);
    }

    public static GetString(name: keyof typeof STRING_FLAGS, fallback = "") {
        return read<string>(STRING_FLAGS[name], fallback);
    }

    public static GetNumber(name: keyof typeof NUMBER_FLAGS, fallback = 0) {
        return read<number>(NUMBER_FLAGS[name], fallback);
    }
}