import { exec, ExecOptions } from 'child_process';

export function execAsync(cmd, options: ExecOptions = {}): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                reject({
                    err: err,
                    stdout: stdout,
                    stderr: stderr
                });
            }
            resolve([stdout, stderr]);
        });
    });
}
