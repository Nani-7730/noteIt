const notes = require('../models/modelnote');

const addNote = async(req, res)=>
{
    const {username,title, content, notename} = req.body;

    try
    {
        const newNote = new notes({username,title, content, notename});
        const result = await newNote.save();
        res.status(201).json(result);
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
}

const getNotes = async(req, res) =>
{
    try
    {
        const notesList = await notes.find({"username":req.params.username});
        res.status(201).json(notesList);
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
}

const getNoteById = async(req, res) =>
{
    try
    {
        const note = await notes.findById(req.params.id);

        if(note)
        {
            res.status(200).json(note);
        }
        else
        {
            res.status(404).json({message: 'Note not found'});
        }
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
}

    const updateNote = async(req, res) =>
    {
        try
        {
            const note = await notes.findByIdAndUpdate(req.params.id, req.body, {new: true});

            if(note)
            {
                res.status(200).json(note);
            }
            else
            {
                res.status(404).json({message: 'Note not found'});
            }
        }
        catch(error)
        {
            res.status(400).json({message: error.message});
        }
    }

const deleteNote = async(req, res) =>
{
    try
    {
        const note = await notes.findByIdAndDelete((req.params.id));

        if(note)
        {
            res.status(200).json({message: 'Note deleted successfully'});
        }
        else
        {
            res.status(404).json({message: 'Note not found'});
        }
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
}

module.exports = {addNote, getNotes, getNoteById, updateNote, deleteNote};