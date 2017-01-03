import { MigrationCompiler } from './compile';

export async function cli(...args: string[]) {
    await MigrationCompiler.compileMigrations(...args);
    
    //Steps:
    //  - Create temp folder for configuration and migrations
    //  - Compile typescript migrations to .js counterparts
    //  - Run/undo the migration(s) by passing the arguments to sequelize-cli
}

export function help(...args: string[]) {
    console.log(`In miter help migrate ${args.join(' ')}`);
}
