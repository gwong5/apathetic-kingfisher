DROP DATABASE IF EXISTS walkman;
CREATE DATABASE walkman;
\c walkman

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  genre VARCHAR
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  album_id INTEGER,
  length INTEGER,
  track_no INTEGER
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER,
  title VARCHAR,
  year INTEGER
);

CREATE TABLE playlist (
  id SERIAL PRIMARY KEY,
  song_id INTEGER
);

CREATE TEMPORARY TABLE artist (VALUES TEXT);
COPY artist FROM '/absolute_path_on_your_machine';
INSERT INTO artists ("name", "genre")
SELECT VALUES->>'name' AS name,
VALUES->>'genre' AS genre
FROM (SELECT json_array_elements(replace(values,'\','\\')::json) AS VALUES FROM artist) a;

CREATE TEMPORARY TABLE song (VALUES TEXT);
COPY song FROM '/absolute_path_on_your_machine';
INSERT INTO songs ("title", "album_id", "length", "track_no") 
SELECT VALUES->>'title' AS title,
(CAST (VALUES->>'album_id' AS INTEGER)) AS album_id,
(CAST (VALUES->>'length' AS INTEGER)) AS length,
(CAST (VALUES->>'track_no' AS INTEGER)) AS track_no
FROM (SELECT json_array_elements(replace(values,'\','\\')::json) AS VALUES FROM song) a;

CREATE TEMPORARY TABLE album (VALUES TEXT);
COPY album FROM '/absolute_path_on_your_machine';
INSERT INTO albums ("artist_id", "title", "year")
SELECT (CAST (VALUES->>'artist_id' AS INTEGER)) AS artist_id,
VALUES->>'title' AS title,
(CAST (VALUES->>'year' AS INTEGER)) AS year
FROM (SELECT json_array_elements(replace(values,'\','\\')::json) AS VALUES FROM album) a;
