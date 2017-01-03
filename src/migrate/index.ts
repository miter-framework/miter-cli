import { compileMigrations } from './compile-migrations';
import { runMigrations } from './run-migrations';
import { deleteFolderRecursive } from '../util/delete-folder-recursive';

export async function cli(...args: string[]) {
    let binPath = await compileMigrations();
    await runMigrations(binPath, ...args);
    deleteFolderRecursive(binPath);
}

export function help(...args: string[]) {
    console.log(`In miter help migrate ${args.join(' ')}`);
}
