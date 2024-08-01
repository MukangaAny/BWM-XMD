const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1BuT2R1RFBtb1JJcjFCT3BQaVdQVHFqWEpBVzBzUmltVEFnM0hCTWsyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTVNdHRMS05MMzlUVDlOc0VZQ2lUNm5FdEVNY3VjK0MwbHBLZmp5ZVlYdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RDN1N2RUZ2JjaVVqRTE1L0pCelFaT2pkL3ZyM2NJUkVMYU1vZktLNlVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvcGpZTzNBSlorUnlUb1hpc2lKS2MyUHo2QURDMVErMThIOFlxRTVoMFVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9PTEp4RWdhZ0hPM0tNVFlqRXplYUt6Ky9YREowOHBWUkI5MTgxeTIya1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZxcU5JbjJZemdWcXNPNFhGazEybW1jZGJFb0twdTg0MXhORjAzMUxiMkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxuSVFCcXRqejNUMFhYYkNLYjBQY2ZDSlNuUXo1N2IrSm54Tm9KVnFsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0xuZjduQVRqN1JGMzBmcC9sSGRKRW5lNWQ5Um1Pd29oVDd3c1hNSVBtQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkEzeXdnUFNWK3ovU0xsQUZmZk94SUNGTkQ1VUQxL0ltYkdOeHhZNzdNb1NGcElFcE53dDdkK0gxbjNUc0dWY3Q5Ym5URkM4U2d2TEtMelJKNDEvTGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM3LCJhZHZTZWNyZXRLZXkiOiJSNDRCMHRmeUp5OVJQVFh5bWpvdlB4b0hqazN6ekVBbHo4bCt3c1hlTUw4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYZnktbVpHMFNaT0VsTktReFVXTEFnIiwicGhvbmVJZCI6IjNjNThjYmY2LTM0MWItNGM2Yy1hMGRkLTViMDcwNmYyNDM1MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzQ2RYUHIwQWc0azNxeGtyWDVndnpmWkJYc3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM253M3JsZlp2ZnhOcStHa1YvODdXVGoyQUVVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlGUVQ5S1NDIiwibWUiOnsiaWQiOiIyNjM3ODUzOTYwMTA6MzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiREogREVMQk9ZIEFOSUVZIE1JWFRBUEVTIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMS1Vsc3dFRUluaHJiVUdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJjSk9VNUh1WFVFeThFODRVSzBrTXFrRUsxdnIyZ25DNXdTVlpNUmhGTG1BPSIsImFjY291bnRTaWduYXR1cmUiOiJQc1lHd3BLKzdNTXV4RCtyZlByUENNZnNlYVlwTkVhWnZTc0JFeW93RTEvL1UvaWJxWVNsQzBXNVJlV0h5N3lueWhPdlZVR0pJaUFuZ1J0ZEZjVW1Ddz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR2YyV1dBY0tTUXVsV1BqQWVhaEREb0FkTEZBUTJLRS9NY1laYjE4LzhUZ0IzRFVnN1JWRnBCSC9ocEMvaldNazBJazdnbkRyTWs5b1EwSENYVi94aXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODUzOTYwMTA6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWENUbE9SN2wxQk12QlBPRkN0SkRLcEJDdGI2OW9Kd3VjRWxXVEVZUlM1ZyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjUxMTUxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBRUwifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Delboy Aniey",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263 78 539 6010",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

