import { execAsync } from '../util/exec-async';

export async function runMigrations(binDir: string, ...args: string[]) {
    let cmd = 'db:migrate';
    
    if (args[0] == 'undo') {
        console.log('Reverting migrations...');
        cmd = 'db:migrate:undo';
        args = args.slice(1);
    }
    else {
        console.log('Running migrations...');
    }
    
    if (args.length > 0) {
        console.error(`Unable to parse extra command line arguments: ${args.join(' ')}. Ignoring them...`);
    }
    
    try {
        let [stdout, stderr] = await execAsync(`sequelize ${cmd}`, { cwd: binDir });
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
