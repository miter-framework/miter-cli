

export function cli(...args: string[]) {
    console.log(`In miter migrate ${args.join(' ')}`);
}

export function help(...args: string[]) {
    console.log(`In miter help migrate ${args.join(' ')}`);
}
