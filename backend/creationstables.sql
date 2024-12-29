
-- Users
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    movieId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

--Movies 
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    released_year INTEGER,
    imdb_rating DOUBLE PRECISION,
    meta_score INTEGER,
    no_of_votes INTEGER,
    gross BIGINT,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    rating DOUBLE PRECISION,
    star4 VARCHAR(255),
    director VARCHAR(255),
    star1 VARCHAR(255),
    poster_link TEXT,
    series_title VARCHAR(255) NOT NULL,
    star2 VARCHAR(255),
    certificate VARCHAR(255),
    runtime VARCHAR(255),
    genre VARCHAR(255),
    star3 VARCHAR(255),
    overview TEXT
);


-- ratings
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    movieId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);


--comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    movieId INTEGER,
    userId INTEGER,
    content TEXT NOT NULL,
    username VARCHAR(255)
);

