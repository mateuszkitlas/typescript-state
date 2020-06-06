import { compose } from "./init";

const leaf1 = compose<"a" | "d">()(state => () => {
    console.log(state.a)
    console.log(state.d)
});

const leaf2 = compose<"a" | "c">()(state => () => {
    console.log(state.a)
    console.log(state.c)
})

const node = compose<typeof leaf1, typeof leaf2>()(state => () => {
    leaf1(state)
    leaf2(state)
})

export const root = compose<"e", typeof node>()(state => () => {
    console.log(state.e)
    node(state)
})
