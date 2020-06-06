import { root } from "./funs";
import { initFull } from "./init";

export async function main(){
    const { a, c, d, e} = await initFull();
    root({ a, c, d, e });
}

main()
