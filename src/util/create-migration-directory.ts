import path = require('path');
import fs = require('fs');
import { getTemplate } from './get-template';
import { config } from './config';

export function createMigrationDirectory() {
    let dir = path.join(process.cwd(), 'migrations');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
    let tsconfigPath = path.join(dir, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
        if (!config.try<boolean>('migrations.recreateTsConfig', false)) return dir;
        fs.unlinkSync(tsconfigPath);
    }
    
    let tsconfigStream: fs.WriteStream | null = null;
    try {
        tsconfigStream = fs.createWriteStream(tsconfigPath);
        let template = getTemplate('migration-tsconfig.json');
        tsconfigStream.write(template);
    }
    finally {
        if (tsconfigStream) tsconfigStream.close();
    }
    
    return dir;
}
