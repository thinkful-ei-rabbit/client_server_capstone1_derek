BEGIN;

TRUNCATE songs_sets;

TRUNCATE sets, songs, users RESTART IDENTITY CASCADE;

COMMIT;