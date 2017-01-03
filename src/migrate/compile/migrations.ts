import path = require('path');
import fs = require('fs');
import { createMigrationDirectory } from '../../util/create-migration-directory';

export function migrations(...args: string[]) {
    let migrationsDir = createMigrationDirectory();
    
    let binDir = path.join(migrationsDir, 'bin');
    if (fs.exists(binDir)) fs.rmdirSync(binDir);
    fs.mkdirSync(binDir);
    
    
}
