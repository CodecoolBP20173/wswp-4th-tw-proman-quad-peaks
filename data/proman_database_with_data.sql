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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_groups; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE account_groups (
    id integer NOT NULL,
    account_id integer,
    group_id integer
);


ALTER TABLE account_groups OWNER TO grobadam;

--
-- Name: account_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: grobadam
--

CREATE SEQUENCE account_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_groups_id_seq OWNER TO grobadam;

--
-- Name: account_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grobadam
--

ALTER SEQUENCE account_groups_id_seq OWNED BY account_groups.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE accounts (
    id integer NOT NULL,
    username character varying(50),
    password character varying(255)
);


ALTER TABLE accounts OWNER TO grobadam;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: grobadam
--

CREATE SEQUENCE accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE accounts_id_seq OWNER TO grobadam;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grobadam
--

ALTER SEQUENCE accounts_id_seq OWNED BY accounts.id;


--
-- Name: boards; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE boards (
    id integer NOT NULL,
    title character varying(30),
    is_active boolean DEFAULT true,
    group_id integer
);


ALTER TABLE boards OWNER TO grobadam;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: grobadam
--

CREATE SEQUENCE boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boards_id_seq OWNER TO grobadam;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grobadam
--

ALTER SEQUENCE boards_id_seq OWNED BY boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE cards (
    id integer NOT NULL,
    title character varying(100),
    board_id integer,
    status_id integer DEFAULT 1,
    "order" integer
);


ALTER TABLE cards OWNER TO grobadam;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: grobadam
--

CREATE SEQUENCE cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cards_id_seq OWNER TO grobadam;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grobadam
--

ALTER SEQUENCE cards_id_seq OWNED BY cards.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE groups (
    id integer NOT NULL,
    name character varying(30)
);


ALTER TABLE groups OWNER TO grobadam;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: grobadam
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE groups_id_seq OWNER TO grobadam;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grobadam
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: grobadam
--

CREATE TABLE statuses (
    id integer NOT NULL,
    name character varying(15)
);


ALTER TABLE statuses OWNER TO grobadam;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY account_groups ALTER COLUMN id SET DEFAULT nextval('account_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY boards ALTER COLUMN id SET DEFAULT nextval('boards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Data for Name: account_groups; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY account_groups (id, account_id, group_id) FROM stdin;
48	4	23
49	5	23
61	3	25
63	5	25
\.


--
-- Name: account_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grobadam
--

SELECT pg_catalog.setval('account_groups_id_seq', 63, true);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY accounts (id, username, password) FROM stdin;
3	AdamHero	$2b$12$xmDbsrrVCj0lALNaHdfX/u28Fe28tM2H8vWjZtTHYWkYO.xxYu5o2
4	Ivan	$2b$12$CbmyO9rxwbYSlfAR1lnSw.zbc9o6X/F0fvd3RWvcxRb6i/Tbdzdki
5	Bela	$2b$12$DrpMmgR3IlLih3QcpNV6Lu0osX4LJFpLmM6Jh0Jtk/n924ilUMB7K
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grobadam
--

SELECT pg_catalog.setval('accounts_id_seq', 5, true);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY boards (id, title, is_active, group_id) FROM stdin;
57	asdfdasf	t	20
56	asdfasdfadsf	t	20
63	asdfasfd	t	18
59	asdfsadfsadf	t	18
58	asdfsadfdsa	t	18
53	asdfasdfasd	f	18
64	asdfadsffdas	t	24
49	adsfadssadfsadf	t	1
77	fsdgdsfggdsf	t	25
76	sdfgsdfgsdf	t	25
75	sdfgsdfggsfd	t	25
62	dgfhdfghfgd	t	19
61	dfghdfghdfhg	t	19
51	sdfdsf	t	19
65	asdasd	t	23
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grobadam
--

SELECT pg_catalog.setval('boards_id_seq', 77, true);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY cards (id, title, board_id, status_id, "order") FROM stdin;
116	asdfdsafdsaf	63	1	\N
130	sdfgsdfg	76	1	0
118	asdsadas	61	1	0
\.


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grobadam
--

SELECT pg_catalog.setval('cards_id_seq', 130, true);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY groups (id, name) FROM stdin;
1	asdfdasfsadf
14	asdfdsafsadf
15	asdfdsafsadfasdfasdfsad
16	asdfsfdasafd
17	asdfsdfa
18	asdfsdfaasdfasdfadsf
19	asdfasdfsadfsad
20	dsafsadfasdfasd
21	New Group
22	sdfgsdgsdfgdsfg
23	sdgsdfgfsd
24	asdasdasdsa
25	sadasdsa
\.


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grobadam
--

SELECT pg_catalog.setval('groups_id_seq', 25, true);


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: grobadam
--

COPY statuses (id, name) FROM stdin;
1	planned
2	in progress
3	testing
4	done
\.


--
-- Name: account_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_pkey PRIMARY KEY (id);


--
-- Name: accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: account_groups_accounts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_accounts_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE;


--
-- Name: account_groups_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY account_groups
    ADD CONSTRAINT account_groups_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: boards_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: cards_boards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: grobadam
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_boards_id_fk FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;


--
-- Name: cards_statuses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: grobadam
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

