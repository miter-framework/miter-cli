import path = require('path');
import fs = require('fs');
import { getTemplate } from './get-template';

export function createMigrationDirectory() {
    let dir = path.join(process.cwd(), 'migrations');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
    let tsconfigPath = path.join(dir, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
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
