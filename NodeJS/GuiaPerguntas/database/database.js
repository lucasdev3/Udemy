const Sequelize = require('sequelize');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config()

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT;

const connection = new Sequelize(`${DB_DATABASE}`, `${DB_USER}`, `${DB_PASSWD}`, {
    host: `${DB_HOST}`,
    port: `${DB_PORT}`,
    dialect: `${DB_DIALECT}`
});

module.exports = connection;