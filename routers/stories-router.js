'use strict';

const express = require('express');
const router = express.Router();

var data = require('../db/dummy-data');

const { DATABASE } = require('../config');
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-blog-app'
  }
});

const Treeize   = require('treeize');
const stories   = new Treeize();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {
  // if (req.query.search) {
  //   const filtered = data.filter((obj) => obj.title.includes(req.query.search));
  //   res.json(filtered);
  // } else {
  //   res.json(data);
  // }
  knex
    .select('id', 'title', 'content')
    .from('stories')
    .limit(10)
    .then(results => {
      stories.grow(results);
      console.log(JSON.stringify(stories, null, 2));
    });
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/stories/:id', (req, res) => {
  // const id = Number(req.params.id);
  // const item = data.find((obj) => obj.id === id);
  // res.json(item);
  knex
    .select('stories.id', 'title', 'content')
    .from('stories')
    .then(results => {
      stories.grow(results);
      console.log(JSON.stringify(stories, null, 2))
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/stories', (req, res) => {
  const {title, content} = req.body;
  
  // /***** Never Trust Users! *****/
  
  const newItem = {
    id: data.nextVal++,
    title: title,
    content: content
  };
  // data.push(newItem);
  // res.location(`${req.originalUrl}/${newItem.id}`).status(201).json(newItem);
  
  // knex.select()
  //   .from('stories')
  //   .then(results =>{
  //     knex.insert({newItem}).into('stories');
  //   });
  
    knex.insert({newItem}).into('stories');
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/stories/:id', (req, res) => {
  const {title, content} = req.body;
  
  /***** Never Trust Users! *****/
  
  const id = Number(req.params.id);
  const item = data.find((obj) => obj.id === id);
  Object.assign(item, {title, content});
  res.json(item);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/stories/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = data.findIndex((obj) => obj.id === id);
  data.splice(index, 1);
  res.status(204).end();
});

module.exports = router;