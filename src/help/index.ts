import { parseSubmodule } from '../parse-submodule';

export function cli(...args: string[]) {
    if (args && args.length) {
        let submodule = parseSubmodule(args[0]);
        if (submodule) {
            submodule.help(...args.slice(1));
            return;
        }
        else {
            console.error(`Failed to parse command line arguments: miter help ${args.join(' ')}`);
        }
    }
    
    console.log(`Usage: miter help [<submodule>]
Valid submodules:
  - help
  - generate (g)
  - migrate (m)`);
}

export function help(...args: string[]) {
    console.log(`Usage: miter <submodule>
Valid submodules:
  - help
  - generate (g)
  - migrate (m)`);
}
