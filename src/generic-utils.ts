export interface HasId{
    id : string;
}

export function findById<T extends HasId>(
    items : T[],
    id : string
): T | undefined {
    return items.find(item => item.id === id);
}

export function getProperty< T , K extends keyof T >(
    object : T,
    key : K
): T[K] {
    return object[key];
}

export function updateProperty<
    T,
    K extends keyof T
>(
    object: T,
    key: K,
    value: T[K]
): T {
    return {
        ...object,
        [key]: value
    };
}