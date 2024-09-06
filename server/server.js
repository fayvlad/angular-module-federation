const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const {createProxyMiddleware} = require('http-proxy-middleware');

const appHost = express();
const appMfe = express();

const portHost = 4200; // host
const portMfe = 4201;  //  mfe

const mfeDirectory = path.join(__dirname, '../mfe1/dist/mfe1');
const hostDirectory = path.join(__dirname, '../shell/dist/shell');

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
