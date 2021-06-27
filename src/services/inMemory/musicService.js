/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class songService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, year, performer, genre, duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    if (!title || !year || !performer || !genre || !duration) {
      throw new InvariantError('Lagu mu gagal ditambahkan');
    }

    const newSong = {
      title,
      year,
      performer,
      genre,
      duration,
      id,
      insertedAt,
      updatedAt,
    };
    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id).length > 0;
    if (!isSuccess) {
      throw new Error('Lagu mu gagal ditambahkan');
    }
    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.filter((n) => n.id === id)[0];

    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return song;
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (!title || !year || !performer || !genre || !duration) {
      const error = new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
      error.statusCode = 400;
      throw error;
    }

    if (index === -1) {
      const error = new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      const error = new NotFoundError('Gagal Menghapus lagu. Id tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    this._songs.splice(index, 1);
  }
}

module.exports = songService;
