const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const salt = crypto.randomBytes(32).toString('hex');
fs.writeFileSync(path.resolve('./config', 'salt'), salt);