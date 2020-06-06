import { Unpack, composer } from "./state";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Full {
    a: Unpack<typeof initA>
    b: Unpack<typeof initB>
    c: Unpack<typeof initC>
    d: Unpack<typeof initD>
    e: {}
}

export const compose = composer<Full>();

async function initA() {
    await sleep(50);
    return 5;
}

async function initB() {
    await sleep(100);
    return { e: 0 }
}

const initC = compose<"b">()(state => {
    return { x: 1, y: 2, z: state.b }
});

const initD = compose<"a" | "c">()(async state => {
    await sleep(10);
    return new Array<Full["c"]>(state.a).fill(state.c)
});

export async function initFull(): Promise<Full> {
    const a = await initA()
    const b = await initB()
    const c = initC({ b })
    const d = await initD({ a, c })
    return { a, b, c, d, e: {} }
}
