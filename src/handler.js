const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteshandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNotes);

  const isSucces = notes.filter((note) => note.id === id).length > 0;
  if (isSucces) {
    const response = h.response({
      status: "succes",
      message: "Note Berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.header(
      "Access-Control-Allow-Origin",
      "http://notesapp-v1.dicodingacademy.com"
    );
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "succes",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: "Succes",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: `Notes dengan Id ${id} tidak ditemukan`,
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  if (request.payload === null) {
    const response = h.response({
      status: "fail",
      message: `Body harus diisi`,
    });
    response.code(400);
    return response;
  }
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
    const Data = notes[index];
    const response = h.response({
      status: "success",
      message: "Note berhasil diperbarui",
      data: {
        Data,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: `gagal update note! Id ${id} tidak ditemukan`,
  });
  response.code(404);
  return response;
};

const deleteNotesByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((item) => item.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: `Noted gagal dihapus!, Id ${id} tidak ditemukan`,
  });
  response.code(404);
  return response;

};

module.exports = {
  addNoteshandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNotesByIdHandler,
};
