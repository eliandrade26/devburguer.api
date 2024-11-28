/* Metódo Antigo
const express = require('express')
const routes = require('./routes')
*/

import express from 'express';
import {resolve} from 'node:path';
import routes from './routes';

import './database'; //fazendo a conexão com database

class App {
    constructor() {
        this.app = express();

        this.middlewares();
        this.routes();

    }
    middlewares() {
        this.app.use(express.json());
        this.app.use('/product-file', express.static(resolve(__dirname,'..','uploads')),
    );
    }
    routes() {
        this.app.use(routes);
    }
}
export default new App().app

//  Metódo Antigo Module.exports = new App().app