import { Submodule } from './submodule';

import * as help from './help';
import * as generate from './generate';
import * as migrate from './migrate';

export function parseSubmodule(submodule: string | null): Submodule | null {
    switch (submodule) {
    case 'help':
        return help;
        
    case 'generate':
    case 'g':
        return generate;
        
    case 'migrate':
    case 'm':
        return migrate;
        
    default:
        return null;
    }
}
