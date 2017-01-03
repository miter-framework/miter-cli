import path = require('path');
import fs = require('fs');

export function getTemplate(name: string): string {
    let templatesDir = path.join(__dirname, '../../templates');
    let templateFileName = `${name}.tmpl`;
    let templatePath = path.join(templatesDir, templateFileName);
    
    return fs.readFileSync(templatePath).toString();
}
