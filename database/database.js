const pgp = require('pg-promise')
const connectionString = { database:'walkman' }
const db = pgp(connectionString)

const records = {}

records.getPlayList = () => db.any('SELECT * FROM playlist')
records.getSongs = () => db.any('SELECT * FROM songs ORDER BY title')
records.getAlbums = () => db.any('SELECT * FROM albums ORDER BY title')
records.getArtists = () => db.any('SELECT * FROM artists ORDER BY name')
records.getOneArtist = (id) => db.one('SELECT * FROM artists WHERE id = $1', [id])
records.getAlbumOfArtist = (artist_id) => db.any('SELECT * FROM albums WHERE artist_id = $1', [artist_id])
records.getSongsOfArtist = (artist_id) => db.any('SELECT * FROM songs WHERE artist_id = (SELECT id FROM albums WHERE artist_id = $1)', [artist_id])

records.addToPlayList = (id) => db.none('INSERT INTO playlist (song_id) VALUES ($1)', [id])
records.removeFromPlayList = (id) => db.none('DELETE FROM playlist WHERE id = $1', [id])


module.exports = records
