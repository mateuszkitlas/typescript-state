type FlattenPromise<T> = T extends PromiseLike<infer R> ? R : T
export type Unpack<Init extends (...arga: any[]) => any> = FlattenPromise<ReturnType<Init>>
type MonadFun<Full extends object, Keys, R> = (deps: { [k in Keys & keyof Full]: Full[k] } ) => R
type ToKey<Full extends object, M> = M extends MonadFun<Full, infer K, any> ? K : M extends keyof Full ? M : never
export const composer =
    <Full extends object>() =>
        <S1, S2 = never, S3 = never, S4 = never, S5 = never>() =>
            <R>(fn: MonadFun<Full, ToKey<Full, S1> | ToKey<Full, S2> | ToKey<Full, S3> | ToKey<Full, S4> | ToKey<Full, S5>, R>) =>
                fn
