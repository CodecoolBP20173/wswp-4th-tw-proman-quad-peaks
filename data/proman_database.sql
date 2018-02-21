--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.11
-- Dumped by pg_dump version 9.5.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_statuses_id_fk;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_boards_id_fk;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS boards_groups_id_fk;
ALTER TABLE IF EXISTS ONLY public.account_groups DROP CONSTRAINT IF EXISTS account_groups_groups_id_fk;
ALTER TABLE IF EXISTS ONLY public.account_groups DROP CONSTRAINT IF EXISTS account_groups_accounts_id_fk;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS statuses_pkey;
ALTER TABLE IF EXISTS ONLY public.groups DROP CONSTRAINT IF EXISTS groups_pkey;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pkey;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS boards_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS accounts_pkey;
ALTER TABLE IF EXISTS ONLY public.account_groups DROP CONSTRAINT IF EXISTS account_groups_pkey;
ALTER TABLE IF EXISTS public.groups ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.boards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.accounts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.account_groups ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.groups_id_seq;
DROP TABLE IF EXISTS public.groups;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.accounts_id_seq;
DROP TABLE IF EXISTS public.accounts;
DROP SEQUENCE IF EXISTS public.account_groups_id_seq;
DROP TABLE IF EXISTS public.account_groups;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_groups; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE account_groups (
    id integer NOT NULL,
    account_id integer,
    group_id integer
);


ALTER TABLE account_groups OWNER TO andris;

--
-- Name: account_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: andris
--

CREATE SEQUENCE account_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_groups_id_seq OWNER TO andris;

--
-- Name: account_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andris
--

ALTER SEQUENCE account_groups_id_seq OWNED BY account_groups.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE accounts (
    id integer NOT NULL,
    username character varying(50),
    password character varying(255)
);


ALTER TABLE accounts OWNER TO andris;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: andris
--

CREATE SEQUENCE accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE accounts_id_seq OWNER TO andris;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andris
--

ALTER SEQUENCE accounts_id_seq OWNED BY accounts.id;


--
-- Name: boards; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE boards (
    id integer NOT NULL,
    title character varying(30),
    is_active boolean DEFAULT true,
    group_id integer
);


ALTER TABLE boards OWNER TO andris;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: andris
--

CREATE SEQUENCE boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boards_id_seq OWNER TO andris;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andris
--

ALTER SEQUENCE boards_id_seq OWNED BY boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE cards (
    id integer NOT NULL,
    title character varying(100),
    board_id integer,
    status_id integer DEFAULT 1,
    "order" integer
);


ALTER TABLE cards OWNER TO andris;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: andris
--

CREATE SEQUENCE cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cards_id_seq OWNER TO andris;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andris
--

ALTER SEQUENCE cards_id_seq OWNED BY cards.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE groups (
    id integer NOT NULL,
    name character varying(30)
);


ALTER TABLE groups OWNER TO andris;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: andris
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE groups_id_seq OWNER TO andris;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andris
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: andris
--

CREATE TABLE statuses (
    id integer NOT NULL,
    name character varying(15)
);


ALTER TABLE statuses OWNER TO andris;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andris
--

ALTER TABLE ONLY account_groups ALTER COLUMN id SET DEFAULT nextval('account_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andris
--

ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andris
--

ALTER TABLE ONLY boards ALTER COLUMN id SET DEFAULT nextval('boards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andris
--

ALTER TABLE ONLY cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andris
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Data for Name: account_groups; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY account_groups (id, account_id, group_id) FROM stdin;
\.


--
-- Name: account_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andris
--

SELECT pg_catalog.setval('account_groups_id_seq', 13, true);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY accounts (id, username, password) FROM stdin;
2	andris	$2b$12$jYPtNrKz1dmHidpSu/GCyuaIQ2F.C4bBUebG9a5cy6xOhoClllfHy
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andris
--

SELECT pg_catalog.setval('accounts_id_seq', 2, true);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY boards (id, title, is_active, group_id) FROM stdin;
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andris
--

SELECT pg_catalog.setval('boards_id_seq', 39, true);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY cards (id, title, board_id, status_id, "order") FROM stdin;
\.


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andris
--

SELECT pg_catalog.setval('cards_id_seq', 29, true);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY groups (id, name) FROM stdin;
\.


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andris
--

SELECT pg_catalog.setval('groups_id_seq', 13, true);


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: andris
--

COPY statuses (id, name) FROM stdin;
1	New
2	In progress
3	Testing
4	Done
\.


--
-- Name: account_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_pkey PRIMARY KEY (id);


--
-- Name: accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: account_groups_accounts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_accounts_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE;


--
-- Name: account_groups_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: boards_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: cards_boards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_boards_id_fk FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;


--
-- Name: cards_statuses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: andris
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_statuses_id_fk FOREIGN KEY (status_id) REFERENCES statuses(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

