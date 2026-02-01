--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (DBngin.app)
-- Dumped by pg_dump version 17.0 (DBngin.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_settings (
    setting_key character varying(100) NOT NULL,
    setting_value text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.app_settings OWNER TO postgres;

--
-- Name: dosen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dosen (
    id integer NOT NULL,
    nik character varying(50) NOT NULL,
    nama character varying(255) NOT NULL,
    prodi character varying(255),
    fakultas character varying(10) NOT NULL,
    excluded boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    exclude boolean DEFAULT false
);


ALTER TABLE public.dosen OWNER TO postgres;

--
-- Name: dosen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dosen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dosen_id_seq OWNER TO postgres;

--
-- Name: dosen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dosen_id_seq OWNED BY public.dosen.id;


--
-- Name: libur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.libur (
    id integer NOT NULL,
    date character varying(20),
    "time" character varying(20),
    room character varying(100),
    reason character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    nik character varying(50)
);


ALTER TABLE public.libur OWNER TO postgres;

--
-- Name: libur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.libur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.libur_id_seq OWNER TO postgres;

--
-- Name: libur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.libur_id_seq OWNED BY public.libur.id;


--
-- Name: mahasiswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mahasiswa (
    id integer NOT NULL,
    nim character varying(50) NOT NULL,
    nama character varying(255) NOT NULL,
    prodi character varying(255) NOT NULL,
    pembimbing character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mahasiswa OWNER TO postgres;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mahasiswa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mahasiswa_id_seq OWNER TO postgres;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mahasiswa_id_seq OWNED BY public.mahasiswa.id;


--
-- Name: master_dosen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_dosen (
    id integer NOT NULL,
    nik character varying(50) NOT NULL,
    nama character varying(255) NOT NULL,
    status character varying(50),
    kategori character varying(100),
    nidn character varying(50),
    jenis_kelamin character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.master_dosen OWNER TO postgres;

--
-- Name: master_dosen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_dosen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_dosen_id_seq OWNER TO postgres;

--
-- Name: master_dosen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_dosen_id_seq OWNED BY public.master_dosen.id;


--
-- Name: slot_examiners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slot_examiners (
    id integer NOT NULL,
    slot_id integer NOT NULL,
    examiner_name character varying(255) NOT NULL,
    examiner_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.slot_examiners OWNER TO postgres;

--
-- Name: slot_examiners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slot_examiners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.slot_examiners_id_seq OWNER TO postgres;

--
-- Name: slot_examiners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slot_examiners_id_seq OWNED BY public.slot_examiners.id;


--
-- Name: slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slots (
    id integer NOT NULL,
    date character varying(20) NOT NULL,
    "time" character varying(20) NOT NULL,
    room character varying(100) NOT NULL,
    student character varying(255) NOT NULL,
    mahasiswa_nim character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.slots OWNER TO postgres;

--
-- Name: slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.slots_id_seq OWNER TO postgres;

--
-- Name: slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slots_id_seq OWNED BY public.slots.id;


--
-- Name: dosen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dosen ALTER COLUMN id SET DEFAULT nextval('public.dosen_id_seq'::regclass);


--
-- Name: libur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libur ALTER COLUMN id SET DEFAULT nextval('public.libur_id_seq'::regclass);


--
-- Name: mahasiswa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa ALTER COLUMN id SET DEFAULT nextval('public.mahasiswa_id_seq'::regclass);


--
-- Name: master_dosen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_dosen ALTER COLUMN id SET DEFAULT nextval('public.master_dosen_id_seq'::regclass);


--
-- Name: slot_examiners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_examiners ALTER COLUMN id SET DEFAULT nextval('public.slot_examiners_id_seq'::regclass);


--
-- Name: slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots ALTER COLUMN id SET DEFAULT nextval('public.slots_id_seq'::regclass);


--
-- Data for Name: app_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_settings (setting_key, setting_value, updated_at) FROM stdin;
\.


--
-- Data for Name: dosen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dosen (id, nik, nama, prodi, fakultas, excluded, created_at, updated_at, exclude) FROM stdin;
1	190302174	Akhmad Dahlan , S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
2	190302483	Dewi Anisa Istiqomah, S.Pd., M.Cs	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
3	190302250	Dina Maulina, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
4	190302491	Eko Rahmat Slamet Hidayat Saputra, M.Kom	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
5	190302688	Eko Tri Anggono, S.E., M.M	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
6	190302057	Heri Sismoro, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
7	190302068	Jaeni , S.Kom., M.Eng.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
8	190302288	Lilis Dwi Farida, S.Kom., M.Eng.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
9	190302151	Lukman, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
10	190302408	M. Nuraminudin, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
11	190302455	Melany Mustika Dewi, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
12	190302722	Rendy Mahardika, S.Kom., M.Kom	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
13	190302239	Supriatin, A.Md., S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
14	190302146	Yuli Astuti, S.Kom., M.Kom.	D3 Manajemen Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
15	190302148	Ahlihi Masruro, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
16	190302495	Arvin C Frobenius, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
17	190302618	Bahrun Ghozali, S.Kom., M.Kom	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
18	190302126	Barka Satya, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
19	190302457	Dwi Rahayu, S.Kom., M.Kom	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
20	190302315	Firman Asharudin, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
21	190302230	Hastari Utama, S.Kom., M.Cs.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
22	190302161	Nila Feby Puspitasari, S.Kom., M.Cs.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
23	190302409	Pramudhita Ferdiansyah, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
24	190302458	Ria Andriani, S.Kom., M.Kom.	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
25	190302481	Surya Tri Atmaja Ramadhani, S.Kom.,M.Eng	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
26	190302407	Toto Indriyatmoko, M.Kom	D3 Teknik Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
28	190302494	Ade Pujianto, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
29	190302356	Agit Amrullah, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
30	190302012	Agung Pambudi, S.T., M.A.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
31	190302708	Ahmad Ridwan, S.Tr.T., M.T	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
32	190302459	Ahmad Sa`di, S.Kom, M.Eng	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
33	190302255	Ainul Yaqin, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
34	190302705	Ajie Kusuma Wardhana, S.Kom., M.Eng	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
35	190302679	Amirudin Khorul Huda, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
36	190302109	Andika Agus Slameto, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
37	190302290	Anna Baita, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
38	190302287	Arif Akbarul Huda, S.Si., M.Eng.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
39	190302150	Arif Dwi Laksito, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
40	190302289	Arifiyanto Hadinegoro, S.Kom., M.T.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
41	190302707	Bambang Pilu Hartato, S.Kom., M.Eng	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
42	190302484	Bayu Nadya Kusuma, S.T., M.Eng	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
43	190302216	Bayu Setiaji, M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
44	190302226	Dr. Emigawaty, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
45	190302232	Dr. Hartatik, S.T., M.Cs.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
46	190302575	Dr. Kumara Ari Yuana, ST, MT	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
47	190302152	Drs. Asro Nasiri, M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
48	190302236	Dwi Nurani, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
49	190302706	Enda Putri Atika, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
50	190302683	Fauzia Anis Sekarningrum, S.T., M.T	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
51	190302276	Ferian Fauzi Abdulloh, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
52	190302703	Hendri Kurniawan Prakosa, S.Kom., M.Cs	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
53	190302509	Herda Dicky Ramandita, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
54	190302237	Ike Verawati, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
55	190302690	Irma Suwarning D, S.Psi., M.Psi	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
56	190302420	Juarisman, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
57	190302159	Kamarudin, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
58	190302112	Kusnawi, S.Kom., M.Eng.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
59	190302393	Majid Rahardi, S.Kom., M.Eng.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
60	190302108	Mardhiya Hayaty, S.T., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
61	190302098	Muhammad Rudyanto Arief, S.T., M.T	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
62	190302281	Muhammad Tofa Nurcholis, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
63	190302492	Mujiyanto, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
64	190302248	Mulia Sulistiyono, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
65	190302524	Nafiatun Sholihah, S,Kom., M.Cs	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
66	190302526	Novi Prisma Yunita, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
67	190302066	Nur Aini, A.Md., S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
68	190302278	Nuri Cahyono, M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
69	190302711	Prasetyo Purnomo, S.Kom., M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
70	190302208	Raditya Wardhana, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
71	190302392	Rifda Faticha Alfa Aziza, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
72	190302215	Rizqi Sukma Kharisma, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
73	190302246	Rumini, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
74	190302413	Subektiningsih, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
75	190302035	Sudarmawan, S.T., M.T.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
76	190302375	Theopilus Bayu Sasongko, S.Kom., M.Eng.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
77	190302115	Tri Susanto, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
78	190302110	Tristanto Ariaji, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
79	190302419	Uyock Anggoro Saputro, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
80	190302185	Windha Mega Pradnya Dhuhita, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
81	190302271	Yogi Piskonata, S.S, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
82	190302702	Yudha Riwanto, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
83	190302039	Yudi Sutanto, S.Kom., M.Kom.	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
84	190302238	Acihmah Sidauruk, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
85	190302348	Aditya Rizki Yudiantika, S.T., M.Eng	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
86	190302351	Afrig Aminuddin, S.Kom., M.Eng., Ph.D.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
87	190302242	Agung Nugroho, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
88	190302249	Agus Fatkhurohman, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
89	190302240	Alfie Nur Rahmi, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
90	190302192	Ali Mustopa, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
91	190302270	Andriyan Dwi Putra, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
92	190302163	Anggit Dwi Hartanto, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
93	190302684	Arif Nur Rohman, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
94	190302354	Atik Nurmasani, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
95	190302209	Azis Catur Laksono, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
96	190302254	Bety Wulan Sari, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
97	190302704	Deni Kurnianto Nugroho, S.Pd., M.Eng	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
98	190302154	Devi Wulandari, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
99	190302253	Donni Prabowo, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
100	190302029	Drs. Bambang Sudaryatno, M.M.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
101	190302227	Eli Pujastuti, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
102	190302231	Erni Seniwati, S.Kom, M.Cs	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
103	190302710	Fitriansyah, S.Si., M.Eng.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
104	190302676	Fiyas Mahananing Puri, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
105	190302244	Hendra Kurniawan, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
106	190302685	Ichsan Wasiso, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
107	190302391	Ika Asti Astuti, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
108	190302268	Ika Nur Fajri, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
109	190302282	Ikmah, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
110	190302011	Ir. Rum Mohamad Andri K Rasyid, M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
111	190302329	Irma Rofni Wulandari, S.Pd., M.Eng.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
112	190302415	Irwan Setiawanto, S.Kom, M.Eng	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
113	190302675	Kardilah Rohmat Hidayat, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
114	190302038	Krisnawati, S.Si., M.T.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
115	190302686	Marwan Noor Fauzy, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
116	190302187	Mei Parwanto Kurniawan, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
117	190302284	Moch Farid Fauzi, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
118	190302257	Netci Hesvindrati, SE, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
119	190302345	Niken Larasati, S.Kom, M.Eng	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
120	190302330	Ninik Tri Hartanti, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
121	190302245	Norhikmah, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
122	190302425	Nur Widjiyati, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
123	190302285	Sharazita Dyah Anggita, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
124	190302582	Stevi Ema Wijayanti, M.Kom	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
125	190302256	Sumarni Adi, S.Kom., M.Cs.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
126	190302258	Wiji Nurastuti, S.E., M.T.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
127	190302272	Wiwi Widayani, S.Kom., M.Kom.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
128	190302412	Yoga Pristyanto, S.Kom., M.Eng.	S1 Sistem Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
129	190302480	Anggit Ferdita Nugraha, S.T., M.Eng.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
130	190302327	Banu Santoso, A.Md., S.T., M.Eng.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
131	190302128	Dr. Dony Ariyus, S.S., M.Kom.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
132	190302580	Eko Pramono, S.Si, M.T	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
133	190302456	Jeki Kuswanto, S.Kom., M.Kom.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
134	190302181	Joko Dwi Santoso, S.Kom., M.Kom.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
135	190302105	Melwin Syafrizal, S.Kom., M.Eng., Ph.D.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
136	190302671	Miko Kastomo Putro, M.Kom.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
137	190302454	Muhammad Koprawi, S.Kom., M.Eng.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
138	190302335	Rina Pramitasari, S.Si., M.Cs.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
139	190302312	Senie Destya, S.T., M.Kom.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
140	190302452	Wahid Miftahul Ashari, S.Kom., M.T.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
141	190302328	Wahyu Sukestyastama Putra, S.T., M.Eng.	S1 Teknik Komputer	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
142	555169	Adi Djayusman, S.Kom., M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
143	190302631	Afifah Nur Aini, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
144	190302229	Agus Purwanto, A.Md., S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
145	190302467	Ahmad Zaid Rahman, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
146	190302031	Aryanto Yuniawan, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
147	190302243	Bernadhed, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
148	190302164	Bhanu Sri Nugraha, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
149	190302652	Buyut Khoirul Umri, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
150	190302687	Caraka Aji Pranata, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
151	190302427	Dhimas Adi Satria, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
152	190302350	Dwi Miyanto, S.ST., M.T	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
153	190302286	Haryoko, S.Kom., M.Cs.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
154	190302390	Ibnu Hadi Purwanto, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
155	190302421	Ifraweri Raja Mangkuto HP, S. Pd., M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
156	190302504	Imam Ainudin Pirmansah, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
157	190302584	Lia Ayu Ivanjelita, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
158	190302332	Muhammad Fairul Filza, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
159	190302497	Muhammad Misbahul Munir, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
160	190302418	Muzakki Ahmad, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
161	190302551	Nadea Cipta Laksmita, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
162	190302552	Rifai Ahmad Musthofa, M.Kom	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
163	190302311	Rizky, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
164	190302277	Rokhmatullah Batik Firmansyah, S.Kom., M.Kom.	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
165	190302482	Vikky Aprelia Windarni, S.Kom., M.Cs	S1 Teknologi Informasi	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
166	190302197	Dhani Ariatmanto, S.Kom., M.Kom., Ph.D.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
167	190302052	Dr. Andi Sunyoto, S.Kom., M.Kom.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
168	190302004	Dr. Drs. Muhamad Idris Purwanto, M.M.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
169	190302060	Dr. Sri Ngudi Wahyuni, S.T., M.Kom.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
170	190302125	Emha Taufiq Luthfi, S.T., M.Kom., Ph.D.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
171	190302182	Tonny Hidayat, S.Kom., M.Kom., Ph.D.	S2 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
172	190302493	Alva Hendi Muhammad, A.Md., S.T., M.Eng., Ph.D.	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
173	190302024	Hanafi, S.Kom., M.Eng., Ph.D.	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
174	190302096	Hanif Al Fatta, S.Kom., M.Kom., Ph.D.	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
175	190302352	I Made Artha Agastya, S.T., M.Eng., Ph.D.	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
176	190302498	Raden Muhammad Agung Harimurti P., Dr., M.Kom	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
177	190302228	Robert Marco, S.T., M.T., Ph.D.	S2 PJJ Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
178	190302235	Dr. Ferry Wahyu Wibowo, S.Si., M.Cs.	S3 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
179	190302036	Prof. Arief Setyanto, S.Si., M.T., Ph.D.	S3 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
180	190302037	Prof. Dr. Ema Utami, S.Si., M.Kom.	S3 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
181	190302106	Prof. Dr. Kusrini, S.Kom., M.Kom.	S3 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
182	190302001	Prof. Dr. Mohammad Suyanto, M.M.	S3 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
184	190302359	Alfriadi Dwi Atmoko, S.E., Ak., M.Si.	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
185	190302382	Edy Anan, S.E., M.Ak., Ak., CA	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
186	190302295	Fahrul Imam Santoso, S.E., M.Akt.	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
187	190302579	Irton, S.E, M.Si	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
189	190302574	Uswatun Khasanah, S.Si, M.Pd.Si	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
190	190302027	Widiyanti Kurnianingsih, S.E., M.Ak.	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
191	190302520	Yola Andesta Valenty, S.E., M.Ak.	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
192	190302307	Anggrismono, S.E., M.Ec.Dev.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
193	190302041	Anik Sri Widawati, S.Sos., M.M.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
194	190302366	Atika Fatimah, S.E., M.Ec.Dev.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
197	190302639	Dr. Moch. Hamied Wijaya, M.M	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
198	190302333	Fitri Juniwati Ayuningtyas, S.E., M.Ec.Dev.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
199	190302021	Istiningsih, S.E., M.M.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
200	190302260	Sri Mulyatun, Dra.,M.M	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
201	190302367	Aditya Maulana Hasymi, S.IP., M.A.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
202	190302577	Edy Musoffa, S.Ag, M.H	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
203	190302731	Isti Nur Rahmahwati, S.IP., Ll.M., Ph.D.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
204	190302438	Muh. Ayub Pramana, S.H., M.H.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
205	190302323	Rezki Satris, S.I.P., M.A.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
207	190302695	Tunggul Wicaksono, S.I.P., M.A	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
208	190302294	Yoga Suharman, S.IP., M.A.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
209	190302696	Yohanes William Santoso, S.Hub.Int., M.Hub.Int.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
210	190302259	Achmad Fauzan., Dr., S.Psi., M.Psi., MM	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
195	190302022	Dr. Achmad Fauzi, S.E., M.M.	S1 Ekonomi	FES	t	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
212	190302522	Andreas Tri Pamungkas, S.Sos., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
213	190302339	Angga Intueri Mahendra Purbakusuma, S.Sos., M.I.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
214	190302661	Anggun Anindya Sekarningrum, M.I.Kom	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
215	190302627	Arrizqi Qonita Apriliana, S.I.Kom, M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
216	555200	Ayuni Fitria, S.Pd., M.A	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
218	190302655	Devi Wening Astari, M.I.Kom	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
219	190302363	Dr. Nurbayti, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
220	190302360	Dwi Pela Agustina, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
221	190302389	Dwiyono Iriyanto, Drs., M.M.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
222	190302017	Eny Nurnilawati, S.E., M.M.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
233	190302444	Kartika Sari Yudaninggar, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
224	190302107	Erik Hadi Saputra, S.Kom., M.Eng.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
225	190302443	Estiningsih, SE, MM	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
226	190302656	Etik Anjar Fitriarti, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
227	190302697	Feri Ludiyanto, S.Sn., M.Sn.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
229	190302673	Hermenegildus Agus Wibowo, S.S., M.Hum.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
230	190302599	Junaidi, S.Ag., M.Hum, Dr.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
231	190302445	Kadek Kiki Astria, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
232	190302357	Kalis Purwanto, Dr, MM	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
237	190302521	Novita Ika Purnama Sari, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
234	190302672	Marita Nurharjanti, S.Pd., M.Pd	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
235	190302478	Monika Pretty Aprilia, S.I.P., M.Si.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
236	190302571	Mulyadi Erman, S.Ag, MA	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
250	190302448	Zahrotus Sa'idah, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
239	190302660	Raden Arditya Mutwara Lokita, M.I.Kom	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
240	190302475	Riski Damastuti, S.Sos., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
241	190302319	Rivga Agusta, S.I.P., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
242	190302266	Rosyidah Jayanti Vijaya, S.E, M.Hum	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
243	190302476	Rr. Pramesthi Ratnaningtyas, S.Sos., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
244	190302657	Rufki Ade Vinanda, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
245	190302437	Sheila Lestari Giza Pudrianisa, S.I.Kom., M.I.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
246	190302364	Stara Asrita, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
247	190302506	Wajar Bimantoro Suminto, Sn., M.Des	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
248	190302477	Wiwid Adiyanto, A.Md., S.I.Kom., M.I.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
270	190302340	Ani Hastuti Arthasari, S.T., M.Sc.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
251	190302326	Agustina Rahmawati, S.A.P., M.Si.	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
252	190302304	Ardiyati, S.I.P., M.P.A	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
253	190302321	Ferri Wicaksono, S.I.P., M.A.	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
254	190302316	Hanantyo Sri Nugroho, S.IP., M.A.	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
255	190302042	Mei Maemunah, S.H., M.M.	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
256	190302318	Muhammad Zuhdan, S.I.P., M.A.	S1 Ilmu Pemerintahan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
257	190302291	Ahmad Sumiyanto, SE, M.Si	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
258	190302663	Dinda Sukmaningrum, S.T., M.M	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
259	190302573	Dodi Setiawan R, S.Psi, MBA, Dr.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
260	190302587	Dr. Reza Widhar Pahlevi, S.E., M.M.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
262	190302334	Laksmindra Saptyawati, S.E., M.B.A.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
263	190302581	Narwanto Nurcahyo, SH, MM	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
264	190302578	Nurhayanto, SE, MBA	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
265	190302013	Rahma Widyawati, S.E., M.M.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
266	190302019	Suyatmi, S.E., M.M.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
267	190302303	Tanti Prita Hapsari, S.E., M.Si	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
268	190302308	Yusuf Amri Amrullah, S.E., M.M.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
271	190302621	Dr. Ir. Hamdi Buldan, M.T.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
273	190302301	Prasetyo Febriarto, S.T., M.Sc.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
274	190302309	Rhisa Aidilla Suprapto, S.T., M.Sc.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
275	190302292	Rr. Sophia Ratna Haryati, S.T., M.Sc.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
276	190302310	Septi Kurniawati Nurhadi, S.T., M.T.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
277	190302297	Afrinia Lisditya Permatasari, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
278	190302300	Dr. Ika Afianita Suherningtyas, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
279	190302674	Efrat Tegris, S.S., M.Pd	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
269	190302047	Amir Fatah Sofyan, S.T., M.Kom.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
294	12345678	Dr. Purwo Andanu	S3 Informatika	FIK	t	2026-02-01 22:11:07.543666	2026-02-01 22:11:07.543666	f
27	190302682	Abd. Mizwar A. Rahim, M.Kom	S1 Informatika	FIK	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
183	555253	Agung Wijanarko, S.Sos, MM	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
188	190302588	Sutarni, S.E., M.M.	S1 Akuntansi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
196	190302293	Dr. Ismadiyanti Purwaning Astuti, S.E., M.Sc.	S1 Ekonomi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
206	190302305	Seftina Kuswardini, S.IP., M.A.	S1 Hubungan Internasional	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
211	190302486	Alvian Alrasid Ajibulloh, S.I.Kom., M.I.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
217	190302659	Bela Fataya Azmi, S.Kom.I., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
228	190302518	Haile Qudrat Djojodibroto, S.H., CMBA	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
238	190302435	Nurfian Yudhistira, S.I.Kom., M.A.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
249	190302485	Yulinda Erlistyarini, S.I.Kom., M.Med.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
261	190302713	Eny Ariyanto, S.E., M.Si., Dr.	S1 Kewirausahaan	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
223	190302361	Erfina Nurussa'adah, S.Kom.I., M.I.Kom.	S1 Ilmu Komunikasi	FES	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
272	190302324	Nurizka Fidali, S.T., M.Sc.	S1 Arsitektur	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
280	190302299	Fitria Nucifera, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
281	190302320	Fitria Nuraini Sekarsih, S.Si, M.Sc	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
282	190302302	Sadewa Purba Sejati, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
283	190302298	Vidyana Arsanti, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
284	190302338	Widiyana Riasasi, S.Si., M.Sc.	S1 Geografi	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
285	190302317	Bagus Ramadhan, S.T., M.Eng.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
286	190302365	Gardyas Bidari Adninda, S.T., M.A.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
287	190302729	Ibnul Muntaza, S.P.W.K., M.URP	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
288	190302730	Muhammad Najih Fasya, S.P.W.K., M.PAR.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	t
289	190302383	Ni'mah Mahnunah, S.T., M.T.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
290	190302370	Renindya Azizza Kartikakirana, S.T., M.Eng.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
291	190302362	Rivi Neritarani, S.Si., M.Eng.	S1 Perencanaan Wilayah Kota	FST	f	2026-02-01 13:07:15.757962	2026-02-01 13:07:15.757962	f
\.


--
-- Data for Name: libur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.libur (id, date, "time", room, reason, created_at, updated_at, nik) FROM stdin;
184	2026-02-16	\N	\N	Blocked date	2026-02-01 23:28:09.123029	2026-02-01 23:28:09.123029	190302047
185	2026-02-17	\N	\N	Blocked date	2026-02-01 23:28:09.123887	2026-02-01 23:28:09.123887	190302047
186	2026-02-18	\N	\N	Blocked date	2026-02-01 23:28:09.124328	2026-02-01 23:28:09.124328	190302047
187	2026-02-19	\N	\N	Blocked date	2026-02-01 23:28:09.124684	2026-02-01 23:28:09.124684	190302047
188	2026-02-23	\N	\N	Blocked date	2026-02-01 23:28:09.12503	2026-02-01 23:28:09.12503	190302047
189	2026-02-24	\N	\N	Blocked date	2026-02-01 23:28:09.125455	2026-02-01 23:28:09.125455	190302047
190	2026-02-25	\N	\N	Blocked date	2026-02-01 23:28:09.125808	2026-02-01 23:28:09.125808	190302047
191	2026-02-26	\N	\N	Blocked date	2026-02-01 23:28:09.126161	2026-02-01 23:28:09.126161	190302047
192	2026-02-27	\N	\N	Blocked date	2026-02-01 23:28:09.126467	2026-02-01 23:28:09.126467	190302047
193	2026-02-20	08:30	\N	Blocked time	2026-02-01 23:28:09.126755	2026-02-01 23:28:09.126755	190302047
194	2026-02-20	11:30	\N	Blocked time	2026-02-01 23:28:09.127046	2026-02-01 23:28:09.127046	190302047
195	2026-02-20	13:30	\N	Blocked time	2026-02-01 23:28:09.127309	2026-02-01 23:28:09.127309	190302047
\.


--
-- Data for Name: mahasiswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mahasiswa (id, nim, nama, prodi, pembimbing, created_at, updated_at) FROM stdin;
1003	TEST001	Purwo Dwi Andanu	S1 Arsitektur	Amir Fatah Sofyan, S.T., M.Kom.	2026-02-01 23:28:09.121493	2026-02-01 23:28:09.121493
\.


--
-- Data for Name: master_dosen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_dosen (id, nik, nama, status, kategori, nidn, jenis_kelamin, created_at, updated_at) FROM stdin;
3	190302001	Prof. Dr. Mohammad Suyanto, M.M.	DOSEN	Dosen Karyawan	0520026001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
4	190302004	Dr. Drs. Muhamad Idris Purwanto, M.M.	DOSEN	Dosen Tetap Khusus	0503066001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
5	190302011	Ir. Rum Mohamad Andri K Rasyid, M.Kom.	DOSEN	Dosen Karyawan	0521076702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
6	190302012	Agung Pambudi, S.T., M.A.	DOSEN	Dosen Karyawan	0512126503	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
7	190302013	Rahma Widyawati, S.E., M.M.	DOSEN	Dosen Karyawan	0522026702	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
8	190302017	Eny Nurnilawati, S.E., M.M.	DOSEN	Dosen Karyawan	0519057102	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
9	190302019	Suyatmi, S.E., M.M.	DOSEN	Dosen Karyawan	0531127101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
10	190302021	Istiningsih, S.E., M.M.	DOSEN	Dosen Karyawan	0521076901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
11	190302022	Dr. Achmad Fauzi, S.E., M.M.	DOSEN	Dosen Karyawan	0514106702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
12	190302024	Hanafi, S.Kom., M.Eng., Ph.D.	DOSEN	Dosen Karyawan	0519127303	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
13	190302027	Widiyanti Kurnianingsih, S.E., M.Ak.	DOSEN	Dosen Karyawan	0503086601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
14	190302029	Drs. Bambang Sudaryatno, M.M.	DOSEN	Dosen Freelance	0505096001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
15	190302031	Aryanto Yuniawan, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0518067701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
16	190302035	Sudarmawan, S.T., M.T.	DOSEN	Dosen Karyawan	0512047201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
17	190302036	Prof. Arief Setyanto, S.Si., M.T., Ph.D.	DOSEN	Dosen Karyawan	0522077501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
18	190302037	Prof. Dr. Ema Utami, S.Si., M.Kom.	DOSEN	Dosen Karyawan	0521027501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
19	190302038	Krisnawati, S.Si., M.T.	DOSEN	Dosen Karyawan	0505057501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
20	190302039	Yudi Sutanto, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0505077501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
21	190302041	Anik Sri Widawati, S.Sos., M.M.	DOSEN	Dosen Karyawan	0515077302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
22	190302042	Mei Maemunah, S.H., M.M.	DOSEN	Dosen Karyawan	0508057401	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
23	190302047	Amir Fatah Sofyan, S.T., M.Kom.	DOSEN	Dosen Karyawan	0519076901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
24	190302052	Dr. Andi Sunyoto, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0507027701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
25	190302057	Heri Sismoro, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0523057401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
26	190302060	Dr. Sri Ngudi Wahyuni, S.T., M.Kom.	DOSEN	Dosen Karyawan	0511127701	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
27	190302066	Nur Aini, A.Md., S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0520067901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
28	190302068	Jaeni , S.Kom., M.Eng.	DOSEN	Dosen Karyawan	0523077601	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
29	190302096	Hanif Al Fatta, S.Kom., M.Kom., Ph.D.	DOSEN	Dosen Karyawan	0517027901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
30	190302098	Muhammad Rudyanto Arief, S.T., M.T	DOSEN	Dosen Karyawan	0518037801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
31	190302105	Melwin Syafrizal, S.Kom., M.Eng., Ph.D.	DOSEN	Dosen Karyawan	0511057202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
32	190302106	Prof. Dr. Kusrini, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0513127901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
33	190302107	Erik Hadi Saputra, S.Kom., M.Eng.	DOSEN	Dosen Karyawan	0501117801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
34	190302108	Mardhiya Hayaty, S.T., M.Kom.	DOSEN	Dosen Tetap Fulltime	0527077801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
35	190302109	Andika Agus Slameto, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0522088001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
36	190302110	Tristanto Ariaji, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0507048001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
37	190302112	Kusnawi, S.Kom., M.Eng.	DOSEN	Dosen Karyawan	0528097501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
38	190302115	Tri Susanto, M.Kom	DOSEN	Dosen Tetap Khusus	0526077801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
39	190302125	Emha Taufiq Luthfi, S.T., M.Kom., Ph.D.	DOSEN	Dosen Karyawan	0524067901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
40	190302126	Barka Satya, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0505067902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
41	190302128	Dr. Dony Ariyus, S.S., M.Kom.	DOSEN	Dosen Karyawan	0524037901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
42	190302146	Yuli Astuti, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0521018302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
43	190302148	Ahlihi Masruro, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0519067602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
44	190302150	Arif Dwi Laksito, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0529098202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
45	190302151	Lukman, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0505128101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
46	190302152	Drs. Asro Nasiri, M.Kom.	DOSEN	Dosen Karyawan	0407106704	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
47	190302154	Devi Wulandari, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0526078501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
48	190302156	Tahajudin Sudibyo, Drs. M.A	DOSEN	Dosen Tetap Khusus	9990643154	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
49	190302159	Kamarudin, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0525038203	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
50	190302161	Nila Feby Puspitasari, S.Kom., M.Cs.	DOSEN	Dosen Tetap Fulltime	0510118101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
51	190302163	Anggit Dwi Hartanto, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0513098601	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
52	190302164	Bhanu Sri Nugraha, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0530048001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
53	190302174	Akhmad Dahlan , S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0514078401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
54	190302181	Joko Dwi Santoso, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0511038302	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
55	190302182	Tonny Hidayat, S.Kom., M.Kom., Ph.D.	DOSEN	Dosen Karyawan	0524088501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
56	190302185	Windha Mega Pradnya Dhuhita, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0517038501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
57	190302187	Mei Parwanto Kurniawan, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0512058501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
58	190302192	Ali Mustopa, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0512108501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
59	190302197	Dhani Ariatmanto, S.Kom., M.Kom., Ph.D.	DOSEN	Dosen Tetap Fulltime	0527028001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
60	190302208	Raditya Wardhana, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0527078603	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
61	190302209	Azis Catur Laksono, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0519018701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
62	190302215	Rizqi Sukma Kharisma, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0511068701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
63	190302216	Bayu Setiaji, M.Kom.	DOSEN	Dosen Tetap Fulltime	0526048401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
64	190302226	Dr. Emigawaty, M.Kom	DOSEN	Dosen Tetap Khusus	0206087501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
1	12345678	Dr. Purwo Andanu	DOSEN	Dosen Tetap		L	2026-02-01 22:20:37.544632	2026-02-01 22:20:37.544632
65	190302227	Eli Pujastuti, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0524078901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
66	190302228	Robert Marco, S.T., M.T., Ph.D.	DOSEN	Dosen Karyawan	0510048202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
67	190302229	Agus Purwanto, A.Md., S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0618118002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
68	190302230	Hastari Utama, S.Kom., M.Cs.	DOSEN	Dosen Karyawan	0520058701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
69	190302231	Erni Seniwati, S.Kom, M.Cs	DOSEN	Dosen Tetap Khusus	0109118101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
70	190302232	Dr. Hartatik, S.T., M.Cs.	DOSEN	Dosen Tetap Fulltime	0506018401	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
71	190302235	Dr. Ferry Wahyu Wibowo, S.Si., M.Cs.	DOSEN	Dosen Karyawan	0521058101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
72	190302236	Dwi Nurani, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0519088901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
73	190302237	Ike Verawati, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0512118802	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
74	190302238	Acihmah Sidauruk, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0505078701	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
75	190302239	Supriatin, A.Md., S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0515108801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
76	190302240	Alfie Nur Rahmi, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0522088801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
77	190302242	Agung Nugroho, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0524088801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
78	190302243	Bernadhed, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0514028702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
79	190302244	Hendra Kurniawan, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0529108901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
80	190302245	Norhikmah, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0512108901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
81	190302246	Rumini, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0521058702	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
82	190302248	Mulia Sulistiyono, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0525118601	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
83	190302249	Agus Fatkhurohman, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0519088902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
84	190302250	Dina Maulina, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0517018201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
85	190302251	Satya Abdul Halim Bahtiar, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
86	190302253	Donni Prabowo, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0518128901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
87	190302254	Bety Wulan Sari, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0507019201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
88	190302255	Ainul Yaqin, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0511119001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
89	190302256	Sumarni Adi, S.Kom., M.Cs.	DOSEN	Dosen Karyawan	0512068602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
90	190302257	Netci Hesvindrati, SE, M.Kom	DOSEN	Dosen Tetap Khusus	0517097901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
91	190302258	Wiji Nurastuti, S.E., M.T.	DOSEN	Dosen Tetap Khusus	0520067801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
92	190302259	Achmad Fauzan., Dr., S.Psi., M.Psi., MM	DOSEN	Dosen Tetap Khusus	0523116702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
93	190302260	Sri Mulyatun, Dra.,M.M	DOSEN	Dosen Tetap Khusus	0513027201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
94	190302266	Rosyidah Jayanti Vijaya, S.E, M.Hum	DOSEN	Dosen Tetap Khusus	0520097202	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
95	190302268	Ika Nur Fajri, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0525058602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
96	190302270	Andriyan Dwi Putra, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0526079001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
97	190302271	Yogi Piskonata, S.S, M.Kom	DOSEN	-	0517036801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
98	190302272	Wiwi Widayani, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0619028301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
99	190302276	Ferian Fauzi Abdulloh, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0511029001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
100	190302277	Rokhmatullah Batik Firmansyah, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0522089001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
101	190302278	Nuri Cahyono, M.Kom.	DOSEN	Dosen Karyawan	0513039101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
102	190302281	Muhammad Tofa Nurcholis, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0526078901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
103	190302282	Ikmah, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0515019201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
104	190302284	Moch Farid Fauzi, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0501088701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
105	190302285	Sharazita Dyah Anggita, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0526118801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
106	190302286	Haryoko, S.Kom., M.Cs.	DOSEN	Dosen Karyawan	0510038602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
107	190302287	Arif Akbarul Huda, S.Si., M.Eng.	DOSEN	Dosen Karyawan	0506058901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
108	190302288	Lilis Dwi Farida, S.Kom., M.Eng.	DOSEN	Dosen Karyawan	0503088602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
109	190302289	Arifiyanto Hadinegoro, S.Kom., M.T.	DOSEN	Dosen Karyawan	0513018701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
110	190302290	Anna Baita, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0517098801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
111	190302291	Ahmad Sumiyanto, SE, M.Si	DOSEN	-	0508067002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
112	190302292	Rr. Sophia Ratna Haryati, S.T., M.Sc.	DOSEN	Dosen Tetap Fulltime	0525058303	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
113	190302293	Dr. Ismadiyanti Purwaning Astuti, S.E., M.Sc.	DOSEN	Dosen Tetap Fulltime	0514088601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
114	190302294	Yoga Suharman, S.IP., M.A.	DOSEN	Dosen Tetap Fulltime	0518108502	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
115	190302295	Fahrul Imam Santoso, S.E., M.Akt.	DOSEN	Dosen Karyawan	0517058801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
116	190302297	Afrinia Lisditya Permatasari, S.Si., M.Sc.	DOSEN	Dosen Tetap Fulltime	0501058604	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
117	190302298	Vidyana Arsanti, S.Si., M.Sc.	DOSEN	Dosen Tetap Fulltime	0502058604	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
118	190302299	Fitria Nucifera, S.Si., M.Sc.	DOSEN	Dosen Karyawan	0529049002	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
119	190302300	Dr. Ika Afianita Suherningtyas, S.Si., M.Sc.	DOSEN	Dosen Tetap Fulltime	0502018902	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
120	190302301	Prasetyo Febriarto, S.T., M.Sc.	DOSEN	Dosen Tetap Fulltime	0506028402	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
121	190302302	Sadewa Purba Sejati, S.Si., M.Sc.	DOSEN	Dosen Tetap Fulltime	0525018702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
122	190302303	Tanti Prita Hapsari, S.E., M.Si	DOSEN	Dosen Tetap Fulltime	0518058302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
123	190302304	Ardiyati, S.I.P., M.P.A	DOSEN	Dosen Tetap Fulltime	0525078101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
124	190302305	Seftina Kuswardini, S.IP., M.A.	DOSEN	Dosen Karyawan	0506088801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
125	190302307	Anggrismono, S.E., M.Ec.Dev.	DOSEN	Dosen Tetap Fulltime	0524028101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
126	190302308	Yusuf Amri Amrullah, S.E., M.M.	DOSEN	Dosen Tetap Fulltime	0518048702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
127	190302309	Rhisa Aidilla Suprapto, S.T., M.Sc.	DOSEN	Dosen Tetap Fulltime	0520108602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
128	190302310	Septi Kurniawati Nurhadi, S.T., M.T.	DOSEN	Dosen Tetap Fulltime	0504099001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
129	190302311	Rizky, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0529098803	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
130	190302312	Senie Destya, S.T., M.Kom.	DOSEN	Dosen Tetap Fulltime	0524129001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
131	190302315	Firman Asharudin, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0527039002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
132	190302316	Hanantyo Sri Nugroho, S.IP., M.A.	DOSEN	Dosen Tetap Fulltime	0509048902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
133	190302317	Bagus Ramadhan, S.T., M.Eng.	DOSEN	Dosen Karyawan	0517049002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
134	190302318	Muhammad Zuhdan, S.I.P., M.A.	DOSEN	Dosen Tetap Fulltime	0511048201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
135	190302319	Rivga Agusta, S.I.P., M.A.	DOSEN	Dosen Karyawan	0518089102	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
136	190302320	Fitria Nuraini Sekarsih, S.Si, M.Sc	DOSEN	Dosen Tetap Khusus	0510038603	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
137	190302321	Ferri Wicaksono, S.I.P., M.A.	DOSEN	Dosen Karyawan	0531108802	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
138	190302322	Khoirunnisa Cahya Firdani, SE, M.Si	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
139	190302323	Rezki Satris, S.I.P., M.A.	DOSEN	Dosen Tetap Fulltime	0528048801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
140	190302324	Nurizka Fidali, S.T., M.Sc.	DOSEN	Dosen Tetap Fulltime	0502058003	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
141	190302326	Agustina Rahmawati, S.A.P., M.Si.	DOSEN	Dosen Tetap Fulltime	0621089101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
142	190302327	Banu Santoso, A.Md., S.T., M.Eng.	DOSEN	Dosen Tetap Fulltime	0506017801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
143	190302328	Wahyu Sukestyastama Putra, S.T., M.Eng.	DOSEN	Dosen Tetap Fulltime	0511069101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
144	190302329	Irma Rofni Wulandari, S.Pd., M.Eng.	DOSEN	Dosen Tetap Fulltime	0515039001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
145	190302330	Ninik Tri Hartanti, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0505067901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
146	190302332	Muhammad Fairul Filza, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0504098603	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
147	190302333	Fitri Juniwati Ayuningtyas, S.E., M.Ec.Dev.	DOSEN	Dosen Karyawan	0522058503	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
148	190302334	Laksmindra Saptyawati, S.E., M.B.A.	DOSEN	Dosen Karyawan	0505038101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
149	190302335	Rina Pramitasari, S.Si., M.Cs.	DOSEN	Dosen Tetap Fulltime	0525068601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
150	190302338	Widiyana Riasasi, S.Si., M.Sc.	DOSEN	Dosen Tetap Fulltime	0520018901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
151	190302339	Angga Intueri Mahendra Purbakusuma, S.Sos., M.I.Kom.	DOSEN	Dosen Tetap Fulltime	1015018501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
152	190302340	Ani Hastuti Arthasari, S.T., M.Sc.	DOSEN	Dosen Karyawan	0503088004	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
153	190302345	Niken Larasati, S.Kom, M.Eng	DOSEN	Dosen Tetap Khusus	0514119102	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
154	190302348	Aditya Rizki Yudiantika, S.T., M.Eng	DOSEN	Dosen Tetap Khusus	0518038902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
155	190302350	Dwi Miyanto, S.ST., M.T	DOSEN	Dosen Tetap Khusus	0519058401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
156	190302351	Afrig Aminuddin, S.Kom., M.Eng., Ph.D.	DOSEN	Dosen Tetap Fulltime	0512089201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
157	190302352	I Made Artha Agastya, S.T., M.Eng., Ph.D.	DOSEN	Dosen Tetap Fulltime	0523088802	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
158	190302354	Atik Nurmasani, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0515019202	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
159	190302356	Agit Amrullah, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0510089101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
160	190302357	Kalis Purwanto, Dr, MM	DOSEN	Dosen Tetap Khusus	0506036001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
161	190302359	Alfriadi Dwi Atmoko, S.E., Ak., M.Si.	DOSEN	Dosen Tetap Fulltime	0526059301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
162	190302360	Dwi Pela Agustina, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0520088901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
163	190302361	Erfina Nurussa'adah, S.Kom.I., M.I.Kom.	DOSEN	Dosen Tetap Fulltime	0517129201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
164	190302362	Rivi Neritarani, S.Si., M.Eng.	DOSEN	Dosen Tetap Fulltime	0502048901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
165	190302363	Dr. Nurbayti, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0504048702	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
166	190302364	Stara Asrita, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0509069101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
167	190302365	Gardyas Bidari Adninda, S.T., M.A.	DOSEN	Dosen Tetap Fulltime	0501049201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
168	190302366	Atika Fatimah, S.E., M.Ec.Dev.	DOSEN	Dosen Tetap Fulltime	0519088903	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
169	190302367	Aditya Maulana Hasymi, S.IP., M.A.	DOSEN	Dosen Tetap Fulltime	0514059201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
170	190302370	Renindya Azizza Kartikakirana, S.T., M.Eng.	DOSEN	Dosen Tetap Fulltime	0528129002	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
171	190302375	Theopilus Bayu Sasongko, S.Kom., M.Eng.	DOSEN	Dosen Tetap Fulltime	0627029001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
172	190302376	Afiuddin Ahmadi, S.T.	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
173	190302380	Ermambang Bendung Wijaya, S.Sn	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
174	190302381	Dida Karisma, S.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
175	190302382	Edy Anan, S.E., M.Ak., Ak., CA	DOSEN	-	0510107302	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
176	190302383	Ni'mah Mahnunah, S.T., M.T.	DOSEN	Dosen Tetap Fulltime	0523118801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
177	190302386	S. L Harjanta, S.IP, M.Si	DOSEN	-	0520058003	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
178	190302387	Raditya Maulana Anuraga, M.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
179	190302388	Elita Ariani, A.Md	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
180	190302389	Dwiyono Iriyanto, Drs., M.M.	DOSEN	Dosen Tetap Khusus	0512016201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
181	190302390	Ibnu Hadi Purwanto, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0524119201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
182	190302391	Ika Asti Astuti, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0515089301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
183	190302392	Rifda Faticha Alfa Aziza, S.Kom., M.Kom.	DOSEN	Dosen Karyawan	0518129301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
184	190302393	Majid Rahardi, S.Kom., M.Eng.	DOSEN	Dosen Karyawan	0524119202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
185	190302394	Emil haryanto, S.E., ME	DOSEN	Dosen Tetap Fulltime	0519067001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
186	190302395	Widhiarta, M.Kom	DOSEN	-	0506088501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
187	190302398	Wahyu Sudarmawan, SE., SH., M.Si	DOSEN	-	0512036801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
188	190302400	El Johan Kristama, S.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
189	190302402	Ari Kusmiatun, Dr	DOSEN	-	0015077806	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
190	190302407	Toto Indriyatmoko, M.Kom	DOSEN	Dosen Tetap Khusus	0513099201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
191	190302408	M. Nuraminudin, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0506099301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
192	190302409	Pramudhita Ferdiansyah, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0516028502	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
193	190302412	Yoga Pristyanto, S.Kom., M.Eng.	DOSEN	Dosen Tetap Fulltime	0514049301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
194	190302413	Subektiningsih, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0530058902	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
195	190302415	Irwan Setiawanto, S.Kom, M.Eng	DOSEN	Dosen Tetap Khusus	0502108901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
196	190302418	Muzakki Ahmad, M.Kom	DOSEN	Dosen Tetap Khusus	0522069101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
197	190302419	Uyock Anggoro Saputro, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0521048702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
198	190302420	Juarisman, M.Kom	DOSEN	-	0523128403	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
199	190302421	Ifraweri Raja Mangkuto HP, S. Pd., M.Kom	DOSEN	-	0510027201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
200	190302422	Maulana Brama Shandy, S.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
201	190302424	Lalu Agam Pramdya Syalabi, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
202	190302425	Nur Widjiyati, M.Kom	DOSEN	Dosen Tetap Khusus	0521107702	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
203	190302426	Rafsanjani Arroisi, S.IKom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
204	190302427	Dhimas Adi Satria, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0501109301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
205	190302428	Rahmi Arifiana Dewi, S.Si	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
206	190302429	Dewi Nur Indahsari Esti Rahayu, S.Si, MM	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
207	190302430	Sunar Handari, S.Pd	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
208	190302431	Halimatus Sadiyah, M.I.Kom	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
209	190302432	Hans Hermang Mintana, S.Sos, M.A	DOSEN	-	0516128301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
210	190302433	Dwi Nurrahmi Kusumastuti, M.I.Kom	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
211	190302434	Susari Nugraheni, S.S, M. Sc	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
212	190302435	Nurfian Yudhistira, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0521119101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
213	190302437	Sheila Lestari Giza Pudrianisa, S.I.Kom., M.I.Kom.	DOSEN	Dosen Tetap Fulltime	0521059201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
214	190302438	Muh. Ayub Pramana, S.H., M.H.	DOSEN	Dosen Tetap Khusus	0528056203	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
215	190302439	Hennry Poerwanto B, Ir, MM, M.Kom	DOSEN	Dosen Freelance	0001065602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
216	190302443	Estiningsih, SE, MM	DOSEN	Dosen Tetap Khusus	0520106801	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
217	190302444	Kartika Sari Yudaninggar, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0509029101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
218	190302445	Kadek Kiki Astria, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0515038901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
219	190302448	Zahrotus Sa'idah, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	2109059003	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
220	190302452	Wahid Miftahul Ashari, S.Kom., M.T.	DOSEN	Dosen Tetap Fulltime	0514129002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
221	190302453	Fredi Satya Candra Rosaji, S.Si., M.Sc	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
222	190302454	Muhammad Koprawi, S.Kom., M.Eng.	DOSEN	Dosen Tetap Fulltime	0506019201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
223	190302455	Melany Mustika Dewi, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0526079301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
224	190302456	Jeki Kuswanto, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0526059501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
225	190302457	Dwi Rahayu, S.Kom., M.Kom	DOSEN	Dosen Tetap Khusus	0501029501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
226	190302458	Ria Andriani, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0531129401	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
227	190302459	Ahmad Sa`di, S.Kom, M.Eng	DOSEN	-	0513039002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
228	190302460	Sri Ekodoso Noworini, Dra., M.Hum	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
229	190302461	Desi Hernila, S.Psi., MA	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
230	190302462	Ali Sofwan, Dr., SE., M.Si., CAAT	DOSEN	Dosen Freelance	0609017301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
231	190302463	Khairullah Zikri, S.Ag., M.A., St. Rel	DOSEN	Dosen Freelance	2025057401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
232	190302464	Siti Khuzaimah, S.Th.I.,M.A	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
233	190302465	M. Akbar Maulana, M.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
234	190302467	Ahmad Zaid Rahman, M.Kom	DOSEN	Dosen Tetap Khusus	0518039701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
235	190302469	Ardian Yuligar Safagi, S.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
236	190302470	M. Syaiful Anam, S.Kom	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
237	190302471	Krisharyono, M.Sn	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
238	190302472	Hernandes Saranela, S.Sn	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
239	190302475	Riski Damastuti, S.Sos., M.A.	DOSEN	Dosen Tetap Fulltime	0525058803	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
240	190302476	Rr. Pramesthi Ratnaningtyas, S.Sos., M.A.	DOSEN	Dosen Tetap Fulltime	0503098602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
241	190302477	Wiwid Adiyanto, A.Md., S.I.Kom., M.I.Kom.	DOSEN	Dosen Tetap Fulltime	0528078903	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
242	190302478	Monika Pretty Aprilia, S.I.P., M.Si.	DOSEN	Dosen Tetap Fulltime	0526048503	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
243	190302480	Anggit Ferdita Nugraha, S.T., M.Eng.	DOSEN	Dosen Tetap Fulltime	0525029301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
244	190302481	Surya Tri Atmaja Ramadhani, S.Kom.,M.Eng	DOSEN	Dosen Tetap Khusus	0525048903	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
245	190302482	Vikky Aprelia Windarni, S.Kom., M.Cs	DOSEN	Dosen Tetap Khusus	0523049301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
246	190302483	Dewi Anisa Istiqomah, S.Pd., M.Cs	DOSEN	Dosen Tetap Khusus	0522019201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
247	190302484	Bayu Nadya Kusuma, S.T., M.Eng	DOSEN	Dosen Tetap Khusus	0505028902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
248	190302485	Yulinda Erlistyarini, S.I.Kom., M.Med.Kom.	DOSEN	Dosen Tetap Fulltime	0518079301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
249	190302486	Alvian Alrasid Ajibulloh, S.I.Kom., M.I.Kom.	DOSEN	Dosen Tetap Fulltime	0502109001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
250	190302491	Eko Rahmat Slamet Hidayat Saputra, M.Kom	DOSEN	Dosen Tetap Khusus	0517129501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
251	190302492	Mujiyanto, M.Kom	DOSEN	Dosen Tetap Fulltime	0515109301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
252	190302493	Alva Hendi Muhammad, A.Md., S.T., M.Eng., Ph.D.	DOSEN	Dosen Tetap Fulltime	0518078401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
253	190302494	Ade Pujianto, M.Kom	DOSEN	Dosen Tetap Khusus	0521049501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
254	190302495	Arvin C Frobenius, S.Kom., M.Kom.	DOSEN	Dosen Tetap Fulltime	0508109302	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
255	190302497	Muhammad Misbahul Munir, M.Kom	DOSEN	Dosen Tetap Khusus	0530069401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
256	190302498	Raden Muhammad Agung Harimurti P., Dr., M.Kom	DOSEN	Dosen Tetap Khusus	8884011019	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
257	190302499	Yuniar Istiyani, S.IP., M.Sc	DOSEN	-	0509068001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
258	190302500	Anggit Tiyas Fitra Romadani, M.Pd	DOSEN	Dosen Freelance	0519039101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
259	190302501	Halim Bayu Aji Sumarna, S.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
260	190302502	Winarja, S.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
261	190302503	Hary Budianto, S.Pd	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
262	190302504	Imam Ainudin Pirmansah, M.Kom	DOSEN	Dosen Tetap Khusus	0504059401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
263	190302505	Demi Lidya Landau, S.Pd., M.Hum	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
264	190302506	Wajar Bimantoro Suminto, Sn., M.Des	DOSEN	Dosen Tetap Khusus	0303047703	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
265	190302507	Winda Sekar Dewi, M.Kom	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
266	190302509	Herda Dicky Ramandita, M.Kom	DOSEN	Dosen Freelance	0518068702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
267	190302510	Weka Kusumastiti, M.Pd.	DOSEN	Dosen Freelance	0518128703	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
268	190302513	Najib Cahyo Aji, S.Ds	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
269	190302514	Budi Setiawan, S.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
270	190302516	Jalu Trangga Laksita, S.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
271	190302517	Aryo Wiryawan, S.T	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
272	190302518	Haile Qudrat Djojodibroto, S.H., CMBA	DOSEN	-	0501028503	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
273	190302519	Yeni Wulandari, S.S., M.A.	DOSEN	Dosen Freelance	0504068501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
274	190302520	Yola Andesta Valenty, S.E., M.Ak.	DOSEN	Dosen Tetap Fulltime	0504119302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
275	190302521	Novita Ika Purnama Sari, S.I.Kom., M.A.	DOSEN	Dosen Tetap Fulltime	0526118902	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
276	190302522	Andreas Tri Pamungkas, S.Sos., M.A.	DOSEN	Dosen Tetap Fulltime	0503068602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
277	190302524	Nafiatun Sholihah, S,Kom., M.Cs	DOSEN	Dosen Tetap Khusus	0506129001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
278	190302526	Novi Prisma Yunita, M.Kom	DOSEN	Dosen Tetap Khusus	0516119201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
279	190302534	Reisita Monica Astrid Cintha, M.A	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
280	190302547	Andre Kussuma Adiputra, SE, M.Si	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
281	190302548	Auliya Shoffi, SE, M.Ak	DOSEN	Dosen Freelance	9905005316	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
282	190302549	Muhammad Sofyan Indrajaya, SE, M.Acc	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
283	190302550	Dedy Hariyadi, ST, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
284	190302551	Nadea Cipta Laksmita, M.Kom	DOSEN	Dosen Tetap Khusus	0504109601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
285	190302552	Rifai Ahmad Musthofa, M.Kom	DOSEN	Dosen Tetap Khusus	0508079501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
286	190302553	Hamid Muzaki, MM	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
287	190302554	Miski, SHI, M.Sos	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
288	190302555	I Gede Eka Susanto, ST, MM	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
289	190302556	Theresia Sumartini, SIP, MPA	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
290	190302557	Sugiyatno, S.Kom, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
291	190302558	Hana Nimashita, M.A	DOSEN	Dosen Freelance	0002027901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
292	190302559	Patisina, Dr., ST., M.Eng.	DOSEN	Dosen Freelance	1030127901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
293	190302561	Elin Nur Rachmawati, M.Pd	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
294	190302564	Yoga Darmajati, M.Sc	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
295	190302565	Annisa Hertami Kusumastuti Yudhomo, M.Sn	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
296	190302566	Dr. Ari Sulistyo, S.Pd, M.Sc	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
297	190302567	Komang Aryasa, S.Kom.,M.T	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
298	190302568	Erfan Hasmin, S.Kom, M.T	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
299	190302569	Rismayani, S.Kom, MT	DOSEN	Dosen Freelance	0908048702	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
300	190302570	M. Syukri Mustafa, S.Si.,MMSI	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
301	190302571	Mulyadi Erman, S.Ag, MA	DOSEN	Dosen Tetap Khusus	0520037201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
302	190302573	Dodi Setiawan R, S.Psi, MBA, Dr.	DOSEN	Dosen Tetap Khusus	0505088303	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
303	190302574	Uswatun Khasanah, S.Si, M.Pd.Si	DOSEN	Dosen Tetap Khusus	0518128201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
304	190302575	Dr. Kumara Ari Yuana, ST, MT	DOSEN	Dosen Tetap Khusus	0515067101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
305	190302577	Edy Musoffa, S.Ag, M.H	DOSEN	Dosen Tetap Khusus	0525026902	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
306	190302578	Nurhayanto, SE, MBA	DOSEN	Dosen Tetap Khusus	0528096901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
307	190302579	Irton, S.E, M.Si	DOSEN	Dosen Tetap Khusus	0502026403	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
308	190302580	Eko Pramono, S.Si, M.T	DOSEN	Dosen Tetap Khusus	0522067101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
309	190302581	Narwanto Nurcahyo, SH, MM	DOSEN	Dosen Tetap Khusus	0509076301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
310	190302582	Stevi Ema Wijayanti, M.Kom	DOSEN	Dosen Tetap Khusus	0519039001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
311	190302584	Lia Ayu Ivanjelita, M.Kom	DOSEN	Dosen Tetap Fulltime	0528069101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
312	190302585	Rizki Tri Puji Wanggono, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
313	190302587	Dr. Reza Widhar Pahlevi, S.E., M.M.	DOSEN	Dosen Tetap Khusus	0501119001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
314	190302588	Sutarni, S.E., M.M.	DOSEN	Dosen Tetap Fulltime	0206078301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
315	190302590	Fadeyanto Prabowo, S.Sos, M.A	DOSEN	Dosen Freelance	0510128502	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
316	190302591	Fernan Rahadi, S.I.P., M.A.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
317	190302592	Latifaestrelita Indi Pramesti Aji, S.Kom	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
318	190302593	Reny Triwardani, M.A	DOSEN	Dosen Freelance	0510058401	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
319	190302594	Rizky Fauziah, M.Kom, M.Ikom	DOSEN	Dosen Freelance	0112039501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
320	190302595	Muhammad Manar Barmawi, Ak., M.Ak.	DOSEN	Dosen Freelance	0519047602	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
321	190302597	Artha Tri Hastutiningsih, S.Kom, MM	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
322	190302598	Ira Ida Yustina, S.Pd, M.Pd	DOSEN	Dosen Freelance	0518077602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
323	190302599	Junaidi, S.Ag., M.Hum, Dr.	DOSEN	Dosen Tetap Khusus	0504077201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
324	190302601	Adrianto Mahendra Wijaya, S.Si, MT	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
325	190302602	Yesaya Tommy Paulus, S.Kom., MT., Ph.D	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
326	190302618	Bahrun Ghozali, S.Kom., M.Kom	DOSEN	Dosen Tetap Fulltime	0510079001	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
327	190302621	Dr. Ir. Hamdi Buldan, M.T.	DOSEN	Dosen Tetap Khusus	0508057002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
328	190302622	Hendry Sugara, S.Pd., M.Pd.	DOSEN	Dosen Freelance	0408049101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
329	190302623	Oktafiani Herlina, S.S., M.A	DOSEN	Dosen Freelance	0504108201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
330	190302624	Agus Susanto S.Pd., M.I.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
331	190302625	Dewa Made Budi Swardana,S.E., M.M.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
332	190302626	Dr. Irsasri, M.Pd,	DOSEN	Dosen Freelance	0623078501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
333	190302627	Arrizqi Qonita Apriliana, S.I.Kom, M.A.	DOSEN	Dosen Tetap Khusus	0529049601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
334	190302630	Dessy Riana Sari, S.Pd, M.Kom	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
335	190302631	Afifah Nur Aini, M.Kom	DOSEN	Dosen Tetap Khusus	0519049602	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
336	190302639	Dr. Moch. Hamied Wijaya, M.M	DOSEN	Dosen Tetap Khusus	0512076703	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
337	190302643	Achmad Djunaedi, Ir., MUP., Ph.D., Prof	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
338	190302645	Dian Utami, SE, M.Ak, CLI, CPA	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
339	190302652	Buyut Khoirul Umri, M.Kom	DOSEN	Dosen Tetap Khusus	0529119701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
340	190302653	Yoga Sahria, S.Kom., M.Kom., Ir., Dr.	DOSEN	Dosen Tetap Khusus	0511079501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
341	190302655	Devi Wening Astari, M.I.Kom	DOSEN	Dosen Tetap Khusus	0503048803	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
342	190302656	Etik Anjar Fitriarti, S.I.Kom., M.A.	DOSEN	Dosen Tetap Khusus	0530039302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
343	190302657	Rufki Ade Vinanda, S.I.Kom., M.A.	DOSEN	Dosen Tetap Khusus	0502119301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
344	190302659	Bela Fataya Azmi, S.Kom.I., M.A.	DOSEN	Dosen Tetap Khusus	0517039501	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
345	190302660	Raden Arditya Mutwara Lokita, M.I.Kom	DOSEN	Dosen Tetap Khusus	0511028904	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
346	190302661	Anggun Anindya Sekarningrum, M.I.Kom	DOSEN	Dosen Tetap Khusus	0529099001	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
347	190302663	Dinda Sukmaningrum, S.T., M.M	DOSEN	Dosen Tetap Fulltime	0512098301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
348	190302664	Cicilia Dwi Setyorini, S.Pd., M.Hum	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
349	190302665	Riza Pahlevi, S.Tr.I.Kom., M.Sn	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
350	190302666	Rafi Kurnia Rachbini, S.Kom., M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
351	190302667	Vicki Hanim Roiva, S.E., M.B.A	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
352	190302668	Ika Destina Puspita S.S., M.A.	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
353	190302669	April Purwanto, S.Ag., M.E.I	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
354	190302670	Rizki Mintari, M.Pd	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
355	190302671	Miko Kastomo Putro, M.Kom.	DOSEN	Dosen Tetap Khusus	0516039701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
356	190302672	Marita Nurharjanti, S.Pd., M.Pd	DOSEN	Dosen Tetap Khusus	0518037201	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
357	190302673	Hermenegildus Agus Wibowo, S.S., M.Hum.	DOSEN	Dosen Tetap Khusus	0513048101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
358	190302674	Efrat Tegris, S.S., M.Pd	DOSEN	Dosen Tetap Khusus	0519097801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
359	190302675	Kardilah Rohmat Hidayat, M.Kom	DOSEN	Dosen Tetap Fulltime	0501069101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
360	190302676	Fiyas Mahananing Puri, M.Kom	DOSEN	Dosen Tetap Fulltime	0512029203	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
361	190302677	Eva Budiana, S.Ak., M.Ak	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
362	190302678	Lutfi Windayani, S.E., M.Ak., Ak., CA., ACPA	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
363	190302679	Amirudin Khorul Huda, M.Kom	DOSEN	Dosen Tetap Khusus	0123099402	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
364	190302682	Abd. Mizwar A. Rahim, M.Kom	DOSEN	Dosen Tetap Khusus	0531109901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
365	190302683	Fauzia Anis Sekarningrum, S.T., M.T	DOSEN	Dosen Tetap Khusus	0530069601	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
366	190302684	Arif Nur Rohman, M.Kom	DOSEN	Dosen Tetap Fulltime	0525109202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
367	190302685	Ichsan Wasiso, M.Kom	DOSEN	Dosen Tetap Khusus	0510088501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
368	190302686	Marwan Noor Fauzy, M.Kom	DOSEN	Dosen Tetap Khusus	0507099401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
369	190302687	Caraka Aji Pranata, M.Kom	DOSEN	Dosen Tetap Khusus	0508129302	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
370	190302688	Eko Tri Anggono, S.E., M.M	DOSEN	Dosen Tetap Fulltime	0502077804	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
371	190302689	Yana Hendriana, S.T., M.Eng	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
372	190302690	Irma Suwarning D, S.Psi., M.Psi	DOSEN	Dosen Tetap Fulltime	0507118302	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
373	190302695	Tunggul Wicaksono, S.I.P., M.A	DOSEN	Dosen Tetap Khusus	0506129501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
374	190302696	Yohanes William Santoso, S.Hub.Int., M.Hub.Int.	DOSEN	Dosen Tetap Fulltime	0514099701	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
375	190302697	Feri Ludiyanto, S.Sn., M.Sn.	DOSEN	Dosen Tetap Khusus	0515018102	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
376	190302702	Yudha Riwanto, M.Kom	DOSEN	Dosen Tetap Khusus	0518039702	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
377	190302703	Hendri Kurniawan Prakosa, S.Kom., M.Cs	DOSEN	Dosen Tetap Khusus	0530079002	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
378	190302704	Deni Kurnianto Nugroho, S.Pd., M.Eng	DOSEN	Dosen Tetap Khusus	0505089401	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
379	190302705	Ajie Kusuma Wardhana, S.Kom., M.Eng	DOSEN	Dosen Freelance	0515129501	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
380	190302706	Enda Putri Atika, M.Kom	DOSEN	Dosen Tetap Khusus	0524089901	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
381	190302707	Bambang Pilu Hartato, S.Kom., M.Eng	DOSEN	Dosen Tetap Khusus	0609069202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
382	190302708	Ahmad Ridwan, S.Tr.T., M.T	DOSEN	Dosen Tetap Khusus	9990631364	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
383	190302710	Fitriansyah, S.Si., M.Eng.	DOSEN	Dosen Tetap Fulltime	0509107504	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
384	190302711	Prasetyo Purnomo, S.Kom., M.Kom	DOSEN	Dosen Tetap Fulltime	0523108601	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
385	190302712	Dyah Ayu Kusumawardani, S. Pd., M. Pd.	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
386	190302713	Eny Ariyanto, S.E., M.Si., Dr.	DOSEN	Dosen Tetap Khusus	8992090024	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
387	190302714	David Agustriawan, S.Kom., M.Sc., Ph.D.	DOSEN	Dosen Freelance	0525088601	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
388	190302715	Arli Aditya Parikesit, S.Si., M.Si, Dr.rer.nat.	DOSEN	Dosen Freelance	2127067901	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
389	190302722	Rendy Mahardika, S.Kom., M.Kom	DOSEN	Dosen Tetap Khusus	0511069202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
390	190302723	Hayati, SS., M.A	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
391	190302724	Alfian Muhazir, S.Sos., M.A	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
392	190302725	Dian Lestari, S.Pd., M.Pd	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
393	190302726	Achmad Djatmiko, M.A., Dr.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
394	190302727	Cucut Susanto, S.Kom., M.Si., Dr.	DOSEN	Dosen Freelance	0927117301	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
395	190302729	Ibnul Muntaza, S.P.W.K., M.URP	DOSEN	Dosen Tetap Khusus	4145776677130133	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
396	190302730	Muhammad Najih Fasya, S.P.W.K., M.PAR.	DOSEN	Dosen Tetap Khusus	0506019801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
397	190302731	Isti Nur Rahmahwati, S.IP., Ll.M., Ph.D.	DOSEN	Dosen Tetap Fulltime	0531079301	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
398	190302733	Kusumaningdiah Retno Setiorini, S.E., Ak., M.Ak., CA., Dr.	DOSEN	Dosen Freelance	0519058101	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
399	190302734	Lubna, M.Kom	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
400	190302735	Anip Moniva, M.Kom	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
401	190302736	Herin Dwibima Aprianto, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
402	190302737	Danu Prawira Utama, M.Kom	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
403	190302738	Ir. Erik Febriarta, S.Si., M.Sc.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
404	190302741	Linda Hijriyah, S.T., M.Arch., Ph.D.	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
405	190302743	Dr. Mohamad Ilyas Abas, S.SI., M.Kom	DOSEN	Dosen Freelance	0926089101	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
406	190302744	Muhammad Alfian Hermawan, S.Pd., M.Pd.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
407	190302745	Amanah, S.Pd., M.Pd	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
408	190302746	Fitria Wiyarti Nindyaningrum, M.Pd.	DOSEN	Dosen Freelance	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
409	190302747	Dr. Mawaidi, S.S., M.Pd.	DOSEN	Dosen Freelance	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
410	190302748	Qorib Munajat, S.Kom., M.Kom.	DOSEN	Dosen Tetap Khusus	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
411	555124	Eko Boedijanto, M.T.	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
412	555125	Baldric Siregar, Prof., Dr., MBA., CMA., CA.Ak.,	DOSEN	Dosen Freelance	0520096903	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
413	555169	Adi Djayusman, S.Kom., M.Kom	DOSEN	Dosen NIDN	0514058202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
414	555195	Wing Wahyu Winarno, Dr., MAFIS., Ak.	DOSEN	-	0525016201	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
415	555200	Ayuni Fitria, S.Pd., M.A	DOSEN	Dosen Freelance	0520068503	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
416	555218	Sukoco, S.Si, M.Si, M.Kom	DOSEN	-	0611086801	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
417	555221	Evans Fuad, S.Kom, M.Eng	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
418	555227	Retantyo Wardoyo, Drs., M.Sc., Ph.D.	DOSEN	-	0011035906	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
419	555228	Dian Pertiwi, M.Kom	DOSEN	-	-	P	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
420	555253	Agung Wijanarko, S.Sos, MM	DOSEN	-	0513066803	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
421	88826	Bambang Suseno, Drs	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
422	88827	Sholeh, M.T	DOSEN	-	-	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
423	88896	Petra Surya Mega Wijaya, M.Si	DOSEN	Dosen Freelance	0501127202	L	2026-02-01 22:31:41.325236	2026-02-01 22:31:41.325236
\.


--
-- Data for Name: slot_examiners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slot_examiners (id, slot_id, examiner_name, examiner_order, created_at) FROM stdin;
1855	619	Ani Hastuti Arthasari, S.T., M.Sc.	0	2026-02-01 23:41:55.678134
1856	619	Dr. Ir. Hamdi Buldan, M.T.	1	2026-02-01 23:41:55.678134
1857	619	Amir Fatah Sofyan, S.T., M.Kom.	2	2026-02-01 23:41:55.678134
\.


--
-- Data for Name: slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slots (id, date, "time", room, student, mahasiswa_nim, created_at, updated_at) FROM stdin;
619	2026-02-20	10:00	6.3.A	Purwo Dwi Andanu	TEST001	2026-02-01 23:41:55.678134	2026-02-01 23:41:55.678134
\.


--
-- Name: dosen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dosen_id_seq', 294, true);


--
-- Name: libur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.libur_id_seq', 195, true);


--
-- Name: mahasiswa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mahasiswa_id_seq', 1003, true);


--
-- Name: master_dosen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_dosen_id_seq', 423, true);


--
-- Name: slot_examiners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slot_examiners_id_seq', 1857, true);


--
-- Name: slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slots_id_seq', 619, true);


--
-- Name: app_settings app_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_settings
    ADD CONSTRAINT app_settings_pkey PRIMARY KEY (setting_key);


--
-- Name: dosen dosen_nik_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT dosen_nik_key UNIQUE (nik);


--
-- Name: dosen dosen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT dosen_pkey PRIMARY KEY (id);


--
-- Name: libur libur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libur
    ADD CONSTRAINT libur_pkey PRIMARY KEY (id);


--
-- Name: mahasiswa mahasiswa_nim_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_nim_key UNIQUE (nim);


--
-- Name: mahasiswa mahasiswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_pkey PRIMARY KEY (id);


--
-- Name: master_dosen master_dosen_nik_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_dosen
    ADD CONSTRAINT master_dosen_nik_key UNIQUE (nik);


--
-- Name: master_dosen master_dosen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_dosen
    ADD CONSTRAINT master_dosen_pkey PRIMARY KEY (id);


--
-- Name: slot_examiners slot_examiners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_examiners
    ADD CONSTRAINT slot_examiners_pkey PRIMARY KEY (id);


--
-- Name: slots slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT slots_pkey PRIMARY KEY (id);


--
-- Name: slots unique_slot; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT unique_slot UNIQUE (date, "time", room);


--
-- Name: idx_dosen_nik; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_dosen_nik ON public.dosen USING btree (nik);


--
-- Name: idx_examiner_slot; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_examiner_slot ON public.slot_examiners USING btree (slot_id);


--
-- Name: idx_libur_nik; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_libur_nik ON public.libur USING btree (nik);


--
-- Name: idx_nik; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_nik ON public.master_dosen USING btree (nik);


--
-- Name: idx_nim; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_nim ON public.mahasiswa USING btree (nim);


--
-- Name: idx_slots_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_slots_date ON public.slots USING btree (date);


--
-- Name: slot_examiners slot_examiners_slot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_examiners
    ADD CONSTRAINT slot_examiners_slot_id_fkey FOREIGN KEY (slot_id) REFERENCES public.slots(id) ON DELETE CASCADE;


--
-- Name: slots slots_mahasiswa_nim_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT slots_mahasiswa_nim_fkey FOREIGN KEY (mahasiswa_nim) REFERENCES public.mahasiswa(nim) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

