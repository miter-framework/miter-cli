import path = require('path');
import fs = require('fs');

export function createMigrationDirectory() {
    let dir = path.join(process.cwd(), 'migrations');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    return dir;
}
