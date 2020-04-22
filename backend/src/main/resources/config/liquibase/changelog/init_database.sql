CREATE TABLE public.genre
(
    id     serial  NOT NULL,
    "name" varchar NOT NULL,
    CONSTRAINT genre_pk PRIMARY KEY (id)
);

CREATE TABLE public.category
(
    id     serial  NOT NULL,
    "name" varchar NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE public.author
(
    id          serial      NOT NULL,
    first_name  varchar     NOT NULL,
    last_name   varchar     NOT NULL,
    birthday    timestamp   NULL,
    died_on     timestamp   NULL,
    nationality varchar(50) NULL,
    CONSTRAINT author_pk PRIMARY KEY (id)
);
CREATE INDEX author_first_name_idx ON public.author (first_name, last_name);

CREATE TABLE public.book
(
    id                   serial       NOT NULL,
    title                varchar      NOT NULL,
    page_count           smallint     NULL,
    publish_date         timestamp    NULL,
    description          varchar(150) NULL,
    excerpt              varchar(100) NULL,
    book_identifier      varchar(13)  NULL,
    book_identifier_type varchar(10)  NULL,
    category_id          serial       NOT NULL,
    CONSTRAINT book_pk PRIMARY KEY (id)
);
CREATE INDEX book_title_idx ON public.book (title);

-- Column comments

COMMENT ON COLUMN public.book.id IS 'the book''s id
';
COMMENT ON COLUMN public.book.excerpt IS 'excerpt from the book';

ALTER TABLE public.book
    ADD CONSTRAINT book_fk FOREIGN KEY (id) REFERENCES public.category (id);

CREATE TABLE public.book_genre
(
    book_id  serial NOT NULL,
    genre_id serial NOT NULL,
    CONSTRAINT book_genre_fk FOREIGN KEY (book_id) REFERENCES public.book (id),
    CONSTRAINT book_genre_fk_1 FOREIGN KEY (genre_id) REFERENCES public.genre (id)
);

CREATE TABLE public.author_genre
(
    author_id serial NOT NULL,
    genre_id  serial NOT NULL,
    CONSTRAINT book_genre_fk FOREIGN KEY (author_id) REFERENCES public.author (id),
    CONSTRAINT book_genre_fk_1 FOREIGN KEY (genre_id) REFERENCES public.genre (id)
);

CREATE TABLE public.book_author
(
    book_id  serial NOT NULL,
    author_id serial NOT NULL,
    CONSTRAINT book_genre_fk FOREIGN KEY (book_id) REFERENCES public.book (id),
    CONSTRAINT book_genre_fk_1 FOREIGN KEY (author_id) REFERENCES public.author (id)
);