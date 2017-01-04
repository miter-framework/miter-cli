import * as migration from './generate-migration';

export function cli(...args: string[]) {
    let gtype = args[0];
    switch (gtype) {
    case 'migration':
        migration.generate(...args.slice(1));
        break;
        
    default:
        console.error(`Failed to parse command line arguments: miter generate ${args.join(' ')}`);
        help();
    }
}

export function help(...args: string[]) {
    let type = args[0];
    if (type === 'migration') {
        migration.help(...args.slice(1));
        return;
    }
    
    console.log(`Usage: miter generate <type> [args...]
Valid types:
  - migration`);
}
