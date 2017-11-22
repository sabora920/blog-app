'use strict';

const DATABASE_URL = process.env.DATABASE_URL 
                    || global.DATABASE_URL
                    || 'postgresql://localhost/dev-blog-app'; //need to have the right url in place

exports.DATABASE = {
    client: 'pg',
    connection: DATABASE_URL,
    pool: {min: 0, max: 3}, // Fixes issue with ElephantSQL
    debug: true //outputs knex debugging information
}

exports.PORT = process.env.PORT || 8080; 