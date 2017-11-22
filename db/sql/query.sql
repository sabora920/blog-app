DROP TABLE IF EXISTS stories;

CREATE TABLE stories(
    id serial PRIMARY KEY,
    title text NOT NULL,
    content text,
    published timestamp DEFAULT now()
);

ALTER SEQUENCE stories_id_seq RESTART WITH 1000;

INSERT INTO stories (title, content) VALUES
('First Entry', 'FIRST ENTRY CONTENT'),
('Second Entry', 'SECOND ENTRY CONTENT'),
('Third Entry', 'THIRD ENTRY CONTENT'),
('Fourth Entry', 'FOURTH ENTRY CONTENT'),
('Fifth Entry', 'FIFTH ENTRY CONTENT')
