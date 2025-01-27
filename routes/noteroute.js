const express = require('express')
const router = express.Router()

const noteControls = require('../controllers/notecontrol');
const modelnote = require('../models/modelnote');


router.post('/add-note', noteControls.addNote);

router.get('/get-note/:username', noteControls.getNotes);
router.get('/get-one-note/:id', noteControls.getNoteById);

router.put('/update-note/:id', noteControls.updateNote);

router.delete('/delete-note/:id', noteControls.deleteNote);

module.exports = router;

