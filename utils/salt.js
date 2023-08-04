const fs = require('fs');
const path = require('path');

const getSalt = () => {
    return fs.readFileSync(path.resolve('./config', 'salt'));
};

module.exports = { getSalt };
