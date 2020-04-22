CREATE TABLE public.publisher
(
    id serial NOT NULL,
    name varchar NOT NULL,
    CONSTRAINT publisher_pk PRIMARY KEY (id)
);

ALTER TABLE public.book ADD COLUMN publisher_id serial NOT NULL;
ALTER TABLE public.book ADD COLUMN language varchar NULL;
ALTER TABLE public.book ADD COLUMN translator varchar NULL;
ALTER TABLE public.book
    ADD CONSTRAINT book_publisher_fk FOREIGN KEY (id) REFERENCES public.publisher (id);