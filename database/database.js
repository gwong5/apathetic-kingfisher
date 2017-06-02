const pgp = require('pg-promise')()
const connectionString = { database:'walkman' }
const db = pgp(connectionString)

const records = {}

// General GET requests
records.getPlayList = () => db.any('SELECT * FROM playlist')
records.getArtists = () => db.any('SELECT * FROM artists ORDER BY name')
records.getAlbums = () => db.any('SELECT * FROM albums ORDER BY title')
records.getSongs = () => db.any('SELECT * FROM songs ORDER BY title')
records.getSongById = (id) => db.any('SELECT * FROM songs WHERE id = $1', [id])
records.getSongsAndAlbumsOfArtists = () => db.any('SELECT song.id AS song_id, artist.id AS artist_id, artist.name AS artist, album.title AS album, song.track_no AS track, song.title AS song, song.length AS duration FROM artists artist INNER JOIN albums album ON album.artist_id = artist.id INNER JOIN songs song ON song.album_id = album.id GROUP BY song.id, artist.id, song, album, artist, duration, track ORDER BY artist, album, track;')
records.getSongsAndAlbumOfSpecificArtist = (artist_name) => db.any('BEGIN; WITH info AS (SELECT artist.name AS artist, song.title AS song, album.title AS album FROM artists artist INNER JOIN albums album ON album.artist_id = artist.id INNER JOIN songs song ON song.album_id = album.id GROUP BY song.title, album.title, artist.name) SELECT * FROM info WHERE artist ~* $1; COMMIT;', [artist_name])

// Album specific GET requests
records.getAlbumById = (id) => db.any('SELECT * FROM albums WHERE id ~* $1', [id])
records.getAlbumByTitle = (title) => db.any('SELECT * FROM albums WHERE title ~* $1', [title])
records.getAlbumOfArtist = (artist_id) => db.any('SELECT * FROM albums WHERE artist_id = $1', [artist_id])
records.getSongsOfAlbum = (album_title) => db.any('SELECT * FROM songs WHERE album_id = (SELECT id FROM albums WHERE title ~* $1)', [album_title])

// Artist Specific GET requests
records.getArtistById = (id) => db.one('SELECT * FROM artists WHERE id = $1', [id])
records.getArtistByName = (name) => db.any('SELECT * FROM artists WHERE name ~* $1', [name])
records.getSongsOfArtist = (name) => db.any('SELECT songs.id, songs.track_no, songs.title, songs.length, songs.album_id, albums.id, artists.name, artists.genre, artists.id FROM artists INNER JOIN albums ON albums.artist_id = artists.id INNER JOIN songs ON songs.album_id = albums.id WHERE artists.name ~* $1 GROUP BY songs.id, songs.track_no, songs.title, songs.length, songs.album_id, albums.id, artists.name, artists.genre, artists.id;', [name])

// INSERT requests
records.addNewArtist = (name, genre) => db.none('INSERT INTO artists (name, genre) VALUES ($1, $2)', [name, genre])
records.addNewAlbum = (artist_name, title, year) => db.none('INSERT INTO albums (artist_id, title, year) VALUES ((SELECT id FROM artists WHERE name ~* $1), title, year)', [artist_name, title, year])
records.addNewSong = (title, album_name, length, track_no) => db.none('INSERT INTO songs (title, album_id, length, track_no) VALUES ($1, (SELECT id FROM albums WHERE title ~* $2), $3, $4)', [title, album_name, length, track_no])
records.addToPlayList = (id) => db.none('INSERT INTO playlist (song_id) VALUES ($1)', [id])

// DELETE requests
records.removeSong = (id) => db.none('DELETE FROM songs WHERE id = $1', [id])
records.removeArtist = (id) => db.none('DELETE FROM artists WHERE id = $1', [id])
records.removeAlbum = (id) => db.none('DELETE FROM albums WHERE id = $1', [id])
records.removeAlbumSongs = (album_id) => db.none('DELETE FROM songs WHERE album_id = $1', [id])
records.removeAlbumAndSongs = (id) => db.none('BEGIN; WITH deleteAlbum AS (DELETE FROM albums WHERE id = $1 RETURNING id) DELETE FROM songs USING deleteAlbum WHERE songs.album_id = deleteAlbum.id; COMMIT;', [id])
records.removeFromPlayList = (id) => db.none('DELETE FROM playlist WHERE id = $1', [id])

// UPDATE REQUESTS
records.updateArtist = (id, name, genre) => db.none('UPDATE artists (name, genre) VALUES ($2, $3) WHERE id = $1', [id, name, genre])
records.updateAlbum = (id, artist_name, title, year) => db.none('UPDATE albums (artist_id, title, year) VALUES ($2, $3) WHERE id = $1', [id, artist_name, name, genre])

module.exports = records
