const express = require('express');
const common = require('../lib/common');
const { restrict } = require('../lib/auth');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const { validateJson } = require('../lib/schema');
const router = express.Router();

