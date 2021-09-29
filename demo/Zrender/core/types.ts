export type Dictionary<T> = {
    [key: string]: T
}


// See https://www.staging-typescript.org/docs/handbook/advanced-types.html#distributive-conditional-types
// For the case:
// `keyof A | B` does not equals to `Keyof A | Keyof B`
// KeyOfDistributive<A | B> equals to `KeyOfDistributive<A> | KeyOfDistributive<B>`
export type KeyOfDistributive<T> = T extends unknown ? keyof T : never;
