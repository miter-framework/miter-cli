

export function cli(...args: string[]) {
    console.log(`In miter generate ${args.join(' ')}`);
}

export function help(...args: string[]) {
    console.log(`In miter help generate ${args.join(' ')}`);
}
