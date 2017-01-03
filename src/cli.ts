#!/usr/bin/env node

import * as miter from '.';

let args = process.argv.slice(2);
miter.cli(...args);
