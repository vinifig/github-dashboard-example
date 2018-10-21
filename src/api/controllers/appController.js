import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import express, { Router } from 'express';
import App from '../../app/App';
import buildStore from '../../app/store/builder';

const appController = Router();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const store = buildStore();

appController.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

appController.get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
    );
        
    if (context.url) {
        res.redirect(context.url);
    } else {
        res.status(200).send(
            `<!doctype html>
            <html lang="">
                <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>Github Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${
                    assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                }
                ${
                    process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
            </head>
            <body>
                <div id="root">${markup}</div>
            </body>
            </html>`
            );
    }
})
    
export default appController;