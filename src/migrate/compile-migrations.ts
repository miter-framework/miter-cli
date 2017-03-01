import path = require('path');
import fs = require('fs');
import { createMigrationDirectory } from '../util/create-migration-directory';
import { execAsync } from '../util/exec-async';

export async function compileMigrations(): Promise<string> {
    let migrationsDir = createMigrationDirectory();
    
    console.log('Compiling migrations...');
    
    try {
        let [stdout, stderr] = await execAsync('tsc', { cwd: migrationsDir });
        if (stdout.trim()) console.log('stdout:', stdout.trim());
        if (stderr.trim()) console.error('stderr:', stderr.trim());
    }
    catch (e) {
        if (e.stdout || e.stderr) {
            console.error((<Error>e.err).message);
            if (e.stdout && e.stdout.trim()) console.log('stdout:', e.stdout.trim());
            if (e.stderr && e.stderr.trim()) console.error('stderr:', e.stderr.trim());
        }
        else console.error(e);
    }
    
    let binDir = path.join(migrationsDir, 'bin');
    return binDir;
}
