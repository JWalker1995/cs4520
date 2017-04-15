CREATE DATABASE newsdb;

DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
    id BIGSERIAL PRIMARY KEY,
    domain TEXT NOT NULL,
    url TEXT NOT NULL,
    body TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    saved BOOLEAN NOT NULL
) WITH (OIDS = FALSE);

CREATE USER server WITH password '9fee79b7f3172c1b20d35097b6bd5eb1';

GRANT SELECT ON articles TO server;
GRANT INSERT ON articles TO server;
GRANT UPDATE ON articles TO server;
GRANT DELETE ON articles TO server;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO server;

