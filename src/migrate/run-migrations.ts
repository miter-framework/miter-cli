import { execAsync } from '../util/exec-async';

export async function runMigrations(binDir: string, ...args: string[]) {
    //Steps:
    //  - Copy sequelize configuration into binPath
    //  - Run/undo the migration(s) by passing the arguments to sequelize-cli
    
    console.log('Running migrations...');
    
    try {
        let cmd = 'sequelize db:migrate';
        let [stdout, stderr] = await execAsync(cmd, { cwd: binDir });
        if (stdout.trim()) console.log('stdout:', stdout);
        if (stderr.trim()) console.error('stderr:', stderr);
    }
    catch (e) {
        if (e.stdout || e.stderr) {
            console.error((<Error>e.err).message);
            if (e.stdout && e.stdout.trim()) console.log('stdout:', e.stdout);
            if (e.stderr && e.stderr.trim()) console.error('stderr:', e.stderr);
        }
        else console.error(e);
    }
}
