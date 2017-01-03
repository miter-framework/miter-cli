import { execAsync } from '../util/exec-async';

export function runMigrations(binDir: string, ...args: string[]) {
    //Steps:
    //  - Copy sequelize configuration into binPath
    //  - Run/undo the migration(s) by passing the arguments to sequelize-cli
}
