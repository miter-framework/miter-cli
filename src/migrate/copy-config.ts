import path = require('path');
import fs = require('fs');
import { Charset } from 'miter';
import { config } from '../util/config';

type DbConfig = {
    host: string | { domain: string, port: number },
    port?: string,
    user: string,
    password: string,
    name: string,
    dialect?: string,
    charset: Charset
};

export function copyConfig(binPath: string) {
    let dbConfig = config.try<DbConfig | null>('connections.db', null);
    if (!dbConfig) {
        console.error('Failed to get config value: connections.db');
        return false;
    }
    
    let host = dbConfig.host;
    let port: number | undefined = undefined;
    if (typeof host !== 'string') {
        port = host.port;
        host = host.domain;
    }
    
    let charset = dbConfig.charset || 'utf8mb4';
    let collate = `${charset}_general_ci`;
    
    let sqlConfig = {};
    sqlConfig[process.env.NODE_ENV || 'development'] = {
        database: dbConfig.name,
        username: dbConfig.user,
        password: dbConfig.password,
        host: host,
        port: port,
        dialect: dbConfig.dialect || 'mysql',
        dialectOptions: {
            charset: charset
        },
        define: {
            charset: charset,
            collate: collate
        }
    };
    
    let configStream: fs.WriteStream | null = null;
    try {
        let configDir = path.join(binPath, 'config');
        if (!fs.exists(configDir)) fs.mkdirSync(configDir);
        
        let configPath = path.join(configDir, 'config.json');
        if (fs.exists(configPath)) fs.unlinkSync(configPath);
        configStream = fs.createWriteStream(configPath);
        configStream.write(JSON.stringify(sqlConfig));
    }
    catch (e) {
        console.error(`Failed to copy database connection configuration!`);
        return false;
    }
    finally {
        if (configStream) configStream.close();
    }
    
    return true;
}
