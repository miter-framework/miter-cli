
import { parseSubmodule } from './parse-submodule';

export function cli(...args: string[]) {
    let submodule = parseSubmodule(args[0]);
    if (!submodule) {
        console.error(`Failed to parse command line arguments: ${args.join(' ')}`);
        parseSubmodule('help')!.cli();
        return;
    }
    submodule.cli(...args.slice(1));
}
