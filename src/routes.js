const { addNoteshandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNotesByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteshandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
    },
    {
        method: 'GET',
        path: '/notes',
        handler:getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler:getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler:editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesByIdHandler,
    }
];


module.exports = routes;
