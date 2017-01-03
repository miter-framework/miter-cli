import path = require('path');
import fs = require('fs');
import { createMigrationDirectory } from './create-migration-directory';
import { getTemplate } from './get-template';
import * as moment from 'moment';

function generateMigration(...args: string[]) {
    let migrationName = args[0];
    if (!migrationName) {
        console.error('Failed to provide new migration name.');
        help();
        return;
    }
    args = args.slice(1);
    if (args.length) console.error(`Migration parameters are not yet supported. Ignoring them...`);
    
    let migrationsDir = createMigrationDirectory();
    let migrationFileName = `${moment().utc().format('YYYYMMDDHHmmss')}-${migrationName}.ts`;
    let migrationPath = path.join(migrationsDir, migrationFileName);
    
    let outStream = fs.createWriteStream(migrationPath);
    let template = getTemplate('migration.ts');
    outStream.write(template);
    outStream.close();
    
    console.log(`Successfully created migration: ${migrationFileName}`);
}

export function cli(...args: string[]) {
    let gtype = args[0];
    switch (gtype) {
    case 'migration':
        generateMigration(...args.slice(1));
        break;
        
    default:
        console.error(`Failed to parse command line arguments: miter generate ${args.join(' ')}`);
        help();
    }
}

export function help(...args: string[]) {
    console.log(`In miter help generate ${args.join(' ')}`);
}
