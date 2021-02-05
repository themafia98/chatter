CREATE DATABASE chatter
    WITH 
    OWNER = postgres
    TEMPLATE = template0
    ENCODING = 'UTF8'
    CONNECTION LIMIT = 1000;

COMMENT ON DATABASE chatter
    IS 'db for chatter';