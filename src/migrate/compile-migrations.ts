import path = require('path');
import fs = require('fs');
import { createMigrationDirectory } from '../util/create-migration-directory';
import { execAsync } from '../util/exec-async';

export async function compileMigrations(): Promise<string> {
    let migrationsDir = createMigrationDirectory();
    
    try {
        let cmd = `tsc --project "${migrationsDir}"`;
        let [stdout, stderr] = await execAsync(cmd);
        if (stdout.trim()) console.log('stdout:', stdout);
        if (stderr.trim()) console.error('stderr:', stderr);
    }
    catch (e) {
        console.error(e);
    }
    
    let binDir = path.join(migrationsDir, 'bin');
    return binDir;
}
