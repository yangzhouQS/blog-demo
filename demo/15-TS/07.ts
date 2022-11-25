function remove<T>(set: Set<T>, i: T): Set<T> {
    const newSet = new Set<T>([...set]);
    newSet.delete(i);
    return newSet;
}


function permutation(str: string): Array<string> {
    function R(set: Set<string>): Array<string> {
        if (set.size === 1) {
            return [set.values().next().value];
        }
        return flatter([...set].map((char) =>
            R(remove(set, char)).map((perm) => char + perm)
        ));
    }

    return R(new Set([...str]));
}

function flatter(arr: Array<any>): Array<any> {
    if (!Array.isArray(arr)) {
        return arr;
    }
    return ([] as Array<any>).concat(...arr.map(flatter));
}

// console.log(flatter([1, 2, 3, [2, 3, 4, [4, 5]]]));
console.log(permutation('abc'));
