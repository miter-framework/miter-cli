import path = require('path');
import fs = require('fs');
import { createMigrationDirectory } from '../util/create-migration-directory';
import { exec } from 'child_process';

function execAsync(cmd): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);
            resolve([stdout, stderr]);
        });
    });
}

export class MigrationCompiler {
    public static async compileMigrations(...args: string[]): Promise<string> {
        let migrationsDir = createMigrationDirectory();
        
        try {
            let cmd = `tsc --project "${migrationsDir}"`;
            let [stdout, stderr] = await execAsync(cmd);
            console.log('stdout:', stdout);
            console.error('stderr:', stderr);
        }
        catch (e) {
            console.error(e);
        }
        
        let binDir = path.join(migrationsDir, 'bin');
        return binDir;
    }
}
