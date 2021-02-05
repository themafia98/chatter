CREATE TABLE public."Users"
(
    create_date date NOT NULL,
    id_user uuid NOT NULL,
    name "char" NOT NULL,
    password "char" NOT NULL,
    phone "char",
    photo "char",
    PRIMARY KEY (id_user)
);

ALTER TABLE public."Users"
    OWNER to postgres;
COMMENT ON TABLE public."Users"
    IS 'Contain chat users';