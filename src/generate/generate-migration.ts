import path = require('path');
import fs = require('fs');
import * as moment from 'moment';
import { createMigrationDirectory } from '../util/create-migration-directory';
import { getTemplate } from '../util/get-template';

export function generate(...args: string[]) {
    let migrationName = args[0];
    if (!migrationName) {
        console.error('Failed to provide new migration name.');
        help();
        return false;
    }
    args = args.slice(1);
    if (args.length) console.error(`Migration parameters are not yet supported. Ignoring them...`);
    
    let migrationsDir = createMigrationDirectory();
    let migrationFileName = `${moment().utc().format('YYYYMMDDHHmmss')}-${migrationName}.ts`;
    let migrationPath = path.join(migrationsDir, migrationFileName);
    
    let outStream: fs.WriteStream | null = null;
    try {
        outStream = fs.createWriteStream(migrationPath);
        let template = getTemplate('migration.ts');
        outStream.write(template);
    }
    finally {
        if (outStream) outStream.close();
    }
    
    console.log(`Successfully created migration: ${migrationFileName}`);
}

export function help(...args: string[]) {
    console.log(`Usage: miter generate migration <name>`);
}
