import { compileMigrations } from './compile-migrations';
import { deleteFolderRecursive } from '../util/delete-folder-recursive';
import { copyConfig } from './copy-config';
import { runMigrations } from './run-migrations';

export async function cli(...args: string[]) {
    let binPath: string | null = null;
    try {
        binPath = await compileMigrations();
        if (copyConfig(binPath)) await runMigrations(binPath, ...args);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        if (binPath) deleteFolderRecursive(binPath);
    }
}

export function help(...args: string[]) {
    console.log(`Usage:
   miter migrate
OR miter migrate undo`);
}
