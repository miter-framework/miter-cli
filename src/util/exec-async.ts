import { exec } from 'child_process';

export function execAsync(cmd): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);
            resolve([stdout, stderr]);
        });
    });
}
