const fs = require('fs');
const path = require('path');

const regAcces = (req, res, next) => {
  const currentTime = new Date().toISOString();
  const rawHeaders = req.rawHeaders;
  const logMessage = `${currentTime} - ${rawHeaders.join(', ')}\n`;
  const filePath = path.join(__dirname, '../access.log');

  try {
    fs.appendFileSync(filePath, logMessage);
  } catch (error) {
    console.error('Error al escribir en el archivo access.log:', error);
  }

  next();
};

module.exports = regAcces;