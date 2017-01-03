import { compileMigrations } from './compile-migrations';
import { deleteFolderRecursive } from '../util/delete-folder-recursive';
import { copyConfig } from './copy-config';
import { runMigrations } from './run-migrations';

export async function cli(...args: string[]) {
    let binPath = await compileMigrations();
    if (copyConfig(binPath)) await runMigrations(binPath, ...args);
    // deleteFolderRecursive(binPath);
}

export function help(...args: string[]) {
    console.log(`In miter help migrate ${args.join(' ')}`);
}
