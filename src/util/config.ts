import * as configModule from 'config';

export type ConfigT = {
    <T>(setting: string): T,
    get<T>(setting: string): T,
    try<T>(setting: string): T | undefined,
    try<T>(setting: string, defaultValue: T): T
};

export const config: ConfigT = <any>function<T>(setting: string) {
    return configModule.get<T>(setting);
}
config.get = config;
config.try = function<T>(setting: string, defaultValue?: T) {
    if (configModule.has(setting)) return configModule.get<T>(setting);
    return defaultValue;
}
