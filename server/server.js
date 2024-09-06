const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const {createProxyMiddleware} = require('http-proxy-middleware');

const appHost = express();
const appMfe = express();
const appMfe2 = express();
const appMfe3 = express();

const portHost = 4200; // host
const portMfe = 4201;  //  mfe
const portMfe2 = 4202;  //  mfe
const portMfe3 = 4303;  //  mfe

const mfeDirectory = path.join(__dirname, '../mfe1/dist/mfe1/browser');
const mfeDirectory2 = path.join(__dirname, '../mfe2/dist/mfe2/browser');
const mfeDirectory3 = path.join(__dirname, '../mfe3/dist');
const hostDirectory = path.join(__dirname, '../shell/dist/shell/browser');

appHost.use(cors());

appHost.use(
    '/mfe1',
    createProxyMiddleware({
            target: 'http://localhost:4201',
            changeOrigin: true,
            pathRewrite: {
                '^/mfe1/': '/',
            },
        }
    )
);

appHost.use(express.static(hostDirectory));

appHost.use((req, res, next) => {
    if (req.url.includes('.js')) {
        const filePath = path.join(hostDirectory, req.url);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                //send mfe js file
                res.sendFile(path.join(mfeDirectory, req.url));
            } else {
                res.sendFile(filePath);
            }
        });
    } else {
        next();
    }
});

appHost.get('/*', (req, res) => {
    res.sendFile(path.join(hostDirectory, 'index.html'));
});

appHost.listen(portHost, () => {
    console.log(`Host server is listening on http://localhost:${portHost}`);
});

appMfe.use(cors());
appMfe.use(express.static(mfeDirectory));
appMfe.listen(portMfe, () => {
    console.log(`MFE server is listening on http://localhost:${portMfe}`);
});


appMfe2.use(cors());
appMfe2.use(express.static(mfeDirectory2));
appMfe2.listen(portMfe2, () => {
    console.log(`MFE 2 server is listening on http://localhost:${portMfe2}`);
});


appMfe3.use(cors());
appMfe3.use(express.static(mfeDirectory3));
appMfe3.listen(portMfe3, () => {
    console.log(`MFE 3 server is listening on http://localhost:${portMfe3}`);
});
