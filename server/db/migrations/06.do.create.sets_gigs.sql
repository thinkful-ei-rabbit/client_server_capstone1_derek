DROP TABLE IF EXISTS sets_gigs;

CREATE TABLE sets_gigs (
  gig_id INTEGER REFERENCES gigs(id) ON DELETE CASCADE,
  set_id INTEGER REFERENCES sets(id) ON DELETE CASCADE,
  PRIMARY KEY (gig_id, set_id)
);