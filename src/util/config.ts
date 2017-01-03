import * as configModule from 'config';

export type ConfigT = {
    <T>(setting: string): T,
    get<T>(setting: string): T,
    try<T>(setting: string): T | undefined,
    try<T>(setting: string, defaultValue: T): T
};

export const config: ConfigT = <any>function<T>(setting: string) {
    return configModule.get(setting);
}
config.get = config;
config.try = function<T>(setting: string, defaultValue?: T) {
    return (configModule.has(setting) && configModule.get<T>(setting)) || defaultValue;
}
