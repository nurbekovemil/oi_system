--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2023-10-12 11:05:53 +06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 224 (class 1259 OID 24696)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(255),
    activity character varying(255),
    phone_number character varying(255),
    address character varying(255),
    email character varying(255),
    director character varying(255),
    accounting character varying(255),
    inn character varying(255),
    kod character varying(255),
    opforma character varying(255),
    "position" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24695)
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 223
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- TOC entry 212 (class 1259 OID 24006)
-- Name: company_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_templates (
    id integer NOT NULL,
    title character varying(255),
    form_type character varying(255),
    template json
);


ALTER TABLE public.company_templates OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24005)
-- Name: company_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_templates_id_seq OWNER TO postgres;

--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 211
-- Name: company_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_templates_id_seq OWNED BY public.company_templates.id;


--
-- TOC entry 238 (class 1259 OID 25222)
-- Name: eds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eds (
    id integer NOT NULL,
    "typeId" integer,
    "reportId" integer,
    cert json,
    hash json,
    "userId" integer,
    "companyId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.eds OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 25221)
-- Name: eds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eds_id_seq OWNER TO postgres;

--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 237
-- Name: eds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eds_id_seq OWNED BY public.eds.id;


--
-- TOC entry 232 (class 1259 OID 24922)
-- Name: eds_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eds_types (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.eds_types OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24921)
-- Name: eds_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eds_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eds_types_id_seq OWNER TO postgres;

--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 231
-- Name: eds_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eds_types_id_seq OWNED BY public.eds_types.id;


--
-- TOC entry 234 (class 1259 OID 25060)
-- Name: oi_kse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.oi_kse (
    id integer NOT NULL,
    oi_company_id integer,
    kse_company_id integer,
    type character varying(255)
);


ALTER TABLE public.oi_kse OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 25059)
-- Name: oi_kse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oi_kse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.oi_kse_id_seq OWNER TO postgres;

--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 233
-- Name: oi_kse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.oi_kse_id_seq OWNED BY public.oi_kse.id;


--
-- TOC entry 240 (class 1259 OID 25241)
-- Name: receipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receipts (
    id integer NOT NULL,
    "reportId" integer,
    cert json,
    hash json,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.receipts OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 25240)
-- Name: receipts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receipts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.receipts_id_seq OWNER TO postgres;

--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 239
-- Name: receipts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receipts_id_seq OWNED BY public.receipts.id;


--
-- TOC entry 218 (class 1259 OID 24471)
-- Name: report_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_groups (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.report_groups OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24470)
-- Name: report_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_groups_id_seq OWNER TO postgres;

--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 217
-- Name: report_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_groups_id_seq OWNED BY public.report_groups.id;


--
-- TOC entry 216 (class 1259 OID 24152)
-- Name: report_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_status (
    id integer NOT NULL,
    title character varying(255),
    type character varying(255)
);


ALTER TABLE public.report_status OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24151)
-- Name: report_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_status_id_seq OWNER TO postgres;

--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 215
-- Name: report_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_status_id_seq OWNED BY public.report_status.id;


--
-- TOC entry 214 (class 1259 OID 24094)
-- Name: report_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_templates (
    id integer NOT NULL,
    template json
);


ALTER TABLE public.report_templates OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24093)
-- Name: report_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_templates_id_seq OWNER TO postgres;

--
-- TOC entry 3758 (class 0 OID 0)
-- Dependencies: 213
-- Name: report_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_templates_id_seq OWNED BY public.report_templates.id;


--
-- TOC entry 220 (class 1259 OID 24478)
-- Name: report_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_types (
    id integer NOT NULL,
    title text,
    "groupId" integer,
    "tempId" integer
);


ALTER TABLE public.report_types OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24477)
-- Name: report_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_types_id_seq OWNER TO postgres;

--
-- TOC entry 3759 (class 0 OID 0)
-- Dependencies: 219
-- Name: report_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_types_id_seq OWNED BY public.report_types.id;


--
-- TOC entry 236 (class 1259 OID 25193)
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    "typeId" integer,
    "statusId" integer,
    content json,
    send_date timestamp with time zone,
    confirm_date timestamp with time zone,
    "userId" integer,
    "companyId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 25192)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO postgres;

--
-- TOC entry 3760 (class 0 OID 0)
-- Dependencies: 235
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- TOC entry 228 (class 1259 OID 24818)
-- Name: role_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_users (
    id integer NOT NULL,
    "roleId" integer,
    "userId" integer
);


ALTER TABLE public.role_users OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24817)
-- Name: role_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_users_id_seq OWNER TO postgres;

--
-- TOC entry 3761 (class 0 OID 0)
-- Dependencies: 227
-- Name: role_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_users_id_seq OWNED BY public.role_users.id;


--
-- TOC entry 222 (class 1259 OID 24592)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24591)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3762 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 230 (class 1259 OID 24839)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    "userId" integer,
    "refreshToken" text
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24838)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- TOC entry 3763 (class 0 OID 0)
-- Dependencies: 229
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 210 (class 1259 OID 23964)
-- Name: user_temp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_temp (
    id integer NOT NULL,
    title character varying(255),
    form_type character varying(255),
    template json
);


ALTER TABLE public.user_temp OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 23963)
-- Name: user_temp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_temp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_temp_id_seq OWNER TO postgres;

--
-- TOC entry 3764 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_temp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_temp_id_seq OWNED BY public.user_temp.id;


--
-- TOC entry 226 (class 1259 OID 24773)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255),
    password character varying(255),
    "companyId" integer,
    "firstName" character varying(255),
    "lastName" character varying(255),
    inn character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24772)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3765 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3513 (class 2604 OID 24699)
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- TOC entry 3507 (class 2604 OID 24009)
-- Name: company_templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_templates ALTER COLUMN id SET DEFAULT nextval('public.company_templates_id_seq'::regclass);


--
-- TOC entry 3520 (class 2604 OID 25225)
-- Name: eds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds ALTER COLUMN id SET DEFAULT nextval('public.eds_id_seq'::regclass);


--
-- TOC entry 3517 (class 2604 OID 24925)
-- Name: eds_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds_types ALTER COLUMN id SET DEFAULT nextval('public.eds_types_id_seq'::regclass);


--
-- TOC entry 3518 (class 2604 OID 25063)
-- Name: oi_kse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oi_kse ALTER COLUMN id SET DEFAULT nextval('public.oi_kse_id_seq'::regclass);


--
-- TOC entry 3521 (class 2604 OID 25244)
-- Name: receipts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receipts ALTER COLUMN id SET DEFAULT nextval('public.receipts_id_seq'::regclass);


--
-- TOC entry 3510 (class 2604 OID 24474)
-- Name: report_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_groups ALTER COLUMN id SET DEFAULT nextval('public.report_groups_id_seq'::regclass);


--
-- TOC entry 3509 (class 2604 OID 24155)
-- Name: report_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_status ALTER COLUMN id SET DEFAULT nextval('public.report_status_id_seq'::regclass);


--
-- TOC entry 3508 (class 2604 OID 24097)
-- Name: report_templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_templates ALTER COLUMN id SET DEFAULT nextval('public.report_templates_id_seq'::regclass);


--
-- TOC entry 3511 (class 2604 OID 24481)
-- Name: report_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_types ALTER COLUMN id SET DEFAULT nextval('public.report_types_id_seq'::regclass);


--
-- TOC entry 3519 (class 2604 OID 25196)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- TOC entry 3515 (class 2604 OID 24821)
-- Name: role_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_users ALTER COLUMN id SET DEFAULT nextval('public.role_users_id_seq'::regclass);


--
-- TOC entry 3512 (class 2604 OID 24595)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3516 (class 2604 OID 24842)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 3506 (class 2604 OID 23967)
-- Name: user_temp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_temp ALTER COLUMN id SET DEFAULT nextval('public.user_temp_id_seq'::regclass);


--
-- TOC entry 3514 (class 2604 OID 24776)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3728 (class 0 OID 24696)
-- Dependencies: 224
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, activity, phone_number, address, email, director, accounting, inn, kod, opforma, "position", "createdAt", "updatedAt") FROM stdin;
3	ОсОО Компания Росказмет	Экспортно-импортная оптовая торговля металлопрокатом	39-22-82	г.Бишкек, ул.Киевская 69-4				00000000000000	ROSKAZMT	Общество с ограниченной ответственностью		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
4	ОАО Ак-Марал	легкая промышленность	64-31-06	720054, г.Бишкек,ул.Ю.Фучика,38				00000000000000	AKMARAL0	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
21	ОАО "ЦУМ-Холдинг"	Управление недвижимым имуществом	90-98-08	720000,г.Бишкек,пр.Чуй,155	acca@tsum.kg	Абдыжапаров Б.А.	Михина И.В.	00611200310114	TSUMHOLD	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
14	ОАО Особое конструкторское бюро "Аалам"	Сдача внаем недвижимого имущества	48-63-55	720021, г.Бишкек, ул.Шопокова, 89		Табалдлыев Б.С.	Абдыкадырова З.А.	02402199810063	OKBAALAM	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
12	Государственная Служба Регулирования и Надзора за Финансовым Рынком при Правительстве Кыргызской Республики			720040, г. Бишкек, пр. Чуй, 114	fsa@fsa.kg			00000000000000	FINNADZ0			2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
17	ОАО КК Столичный	Производство кондитерских изделий	65-02-75	720010,г.Бишкек,ул.Кулиева,3				00000000000000	KSTOLICH	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
18	ОАО "Аэродромдорстрой"	Строительство дорог	31-48-56	720017, г.Бишкек, ул.Исанова,18		Жылдызов Ч.М.	Майрамбеков У.М.	00403199210052	AERSTROY	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
22	ОАО Бизнес центр Ай-Пери	Аренда	66-28-77	г.Бишкек, пр.Чуй, 158		Темирбаев А.К.		01806199310044	BCAYPERI	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
6	ОАО "Евразийский Сберегательный Банк"	Банковская деятельность	38-91-91	720010, г.Бишкек, ул.Ибраимова, 40/1				00000000000000	EVSBEGBK	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
188	ОАО "Ками Моторс"	Производство автомобилей	0226777226	г.Бишкек, пр. Чуй, дом 50, кв.50.		В лице председателя правления ОАО "Группа К51" 		01803202010145	KAMIMOT	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
9	ОАО "Автодорснаб"	Сдача в аренду складских помещений,офисов,территорий	35-13-55	720007, г.Бишкек, ул.Л.Толстого, 37		Кульматов Т.Р.	Алиева А.Ж.	00209199210128	AVTOSNAB	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
193	ОсОО Баркад							00000000000000	BARKAD	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
194	ОАО Булочно-кондитерский комбинат							00000000000000	OAOBKK	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
15	ОАО "Чуйбатышкурулуш"	Общее строительство	884213	722137, Чуйская обл., Сокулукский р-он, с.Ново-Павловка, ул.Деповская, 94		Абдрахманов Ж.		00103198810015	CHUIBAT	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
196	ОАО РК "Аманбанк"	Банковская деятельность	905-300	г.Бишкек, ул.Тыныстанова, 249		Абиров Н.А.	Асылбекова Ы.А.	00000000000000	AMANBANK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
198	test2		+996708278572	фрунзе	baimyrzabeishenaliev@gmail.com			21209199900896	TEST2			2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
189	ОАО "Кантская ПМК"	Строительство	(03132) 53-555	Чуйская обл., Ыссык-Атинский р-он, с.Люксембург, ул.Марковского, 72		Мукбилов И.Х.	Пакитько Н.Н.	03107200110065	KANTPMK	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
201	ОАО 123					123	321	00611200310114	OAOTEST1		Президент	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
222	test							00000000000000	forAdmin	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
186	ОАО Чолпон-Ата ПАТП	пассажирские перевозки	0553069910	Чолпон-Ата ,3 микрорайон	korikova_g@mail.ru	Титов Олег Николаевич	Корикова Галина Васильевна	00202198010018	CAPATP	акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
178	ОАО "Тепличный"	Производство сельскохозяйственной продукции	36-56-43	720022, г.Бишкек, пр. Ш.Баатыра, 68	teplichniy.kg@yandex.ru	Зотов В.Н.	Керимова Г.Д.	00812199210037	TEPLICHN	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
28	ОАО "Проектный институт "Кыргызгипрострой"	Гражданское строительство	61-39-45	720001, г.Бишкек, пр.Манаса, 40	gipro75@mail.ru	Макетаев Э.Б.	Аралбаева Д.С.	01003199310077	KYRSTROI	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
33	ОАО ДОЗ №3	Сдача в аренду складских и офисных помещений	53-12-96	720031, г.Бишкек, ул.Горького,1				00000000000000	OAODOZN3	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
42	ОАО "Бакай Банк"	Банковская деятельность	(0312) 90-50-50	720040, г.Бишкек,ул.Московская, 118		Соломко О.П.	Сулайманова А.К.	00000000000000	OAOBAKAI	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
34	ОАО "Токмок ПАТП"	Перевозка пассажиров	(03138) 6-09-42	г.Токмок, ул.Кирова,1	tokmokpatp@gmail.com	Исманкулов И.	Иманалиева С.	00101199611107	TOKMPATP	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
40	ОАО Апросах	Пищевая промышленность	(03133) 3-37-30	722030,г. Кара-Балта,ул.Кожомбердиева,88				00000000000000	APROSAH0	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
43	ОАО Аптека №155	Оптовая и розничная торговля медикаментов	(0312) 38-45-11	720021, г.Бишкек, ул.Ибраимова, 29				00000000000000	APTEK155	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
47	ОАО СПАБ	аренда, услуги	(0312) 34-66-67	г.Бишкек, пер.Клубный-14				00000000000000	OAOSPAB0	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
30	ЗАО "Азаттык"	Производство строительных материалов	44-63-67	724319, Чуйская область, Аламудунский р-он, с.Ленинское, ул.Набережная, 18	azattik_stroi@mail.ru	Тулеев Н.Т.	Плескова О.Ф.	00000000000000	AZATTYK0	Закрытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
39	ОАО "Завод Айнур"	Промышленность	53-12-52	г.Бишкек, ул.Камчатская, 1		Мащенко А.В.	Чернышова О.А.	02705199310049	ZVDAINUR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
29	ОАО "ЦУМ-Айчурек"	Сдача в наем собственного недвижимого имущества	90-99-40	720011,г.Бишкек,пр.Чуй,155	acca@tsum.kg	Михин М.И.	Ниязова К.Б.	00810199310023	TSUMAYCH	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
32	ОАО "Гостиница "Достук"	Арендные услуги	43-52-52	720011,г.Бишкек,ул.Фрунзе,429 б	dostukhotel@mail.ru	Рыспаев К.У.	Садыбакунова А.Т.	00000000000000	GTDOSTUK	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
27	ОАО "Кыргыз ГИИЗ"	Инженерные изыскания для строительства	66-40-17	720040, г.Бишкек, ул.Боконбаева, 138	giizkg17@gmail.com	Чаус А.К.	Немцова С.В.	00510197510014	KYRGGIIZ	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
46	ОАО "Кошой"	Производство сахара песка	(03134) 5-56-87	724830,Чуйская обл., Сокулукский р-он,г.Шопоков, ул.Ленина,15		Барбалат А.И.	Таран О.В.	00000000000000	AOKOSHOI	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
41	ОАО "Кыргызбакалея"	Торговля	(0312) 32-45-50	г.Бишкек, ул.Тоголока Молдо, 56		Омуров Н.К.	Муталлапова Р.В.	00000000000000	KGZBAKAL	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
45	ОАО "Битекс Компани"	Производство шерстянных тканей	36-04-84	г.Бишкек,пр.Чуй,4		Асанканов У.Т.		00000000000000	KOMBINAT	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
49	ОАО "Ак-Куу"	Птицеводство	(03134) 60-277	724822, Чуйская область, Сокулукский р-он, с.Сокулук, ул.Краснодарская, 1		Малабаева Н.М.	Кыдыралиева М.И.	00000000000000	OAOAKKUU	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
54	ОАО Бессер-Центральная Азия	Производство строительных материалов	(0312) 88-34-32	720083, г.Бишкек, пр.Чуй, 2а				00000000000000	BISSASIA	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
56	ОАО ПТО Кыргызторгтехника	Услуги и ремонт ХТТО	(0312) 59-17-75	720031, г.Бишкек, ул.Кулатова, 2				00000000000000	AOPTOKGZ	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
179	Открытое акционерное общество «Керемет Банк» (ОАО «Керемет Банк»)	Банковская деятельность	+996 312 55 44 44	Кыргызская Республика, 720001, г. Бишкек, ул. Тоголок-Молдо, 40/4	receiption@keremetbank.kg	Бербаев Т.О.	Токтогожоева Г.А.	02012201010017	KEREMET	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
74	ОАО "Независимая хлебная инспекция"	Оказание услуг в отрасли хлебопродуктов	35-12-92	г.Бишкек,ул.Толстого,31	breadinspection@bk.ru	Шефнер А.М.	Чучулина Т.И.	00605199610110	HLEBINSP	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
239	ОАО "Меркатор"	Деятельность холдинг-компаний		г. Бишкек, ул. Раззакова, д. 19	office@mercatorasia.com	Минич Сергей Михайлович		02605202210119	MERKATOR	Открытое Акционерное Общество 	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
51	ЗАО "Кыргызский Инвестиционно-Кредитный Банк"	Банковская деятельность	62-01-01	720040 КР, г.Бишкек, бул.Эркиндик 21		Али Ариф Махмуд	Суванбекова Ч.	01901200110066	KICBBANK	Закрытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
231	ОАО Кыргыз почтасы							01504199410099	POSTKG	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
61	ОАО "Жибек-Жол"	Производство	(03132) 45-6-89	Чуйская обл., Иссык-Атинский р-он, п.Гидростроитель		Попрядухин В.П.	Сагынбаева С.	01912199410038	JIBEKJOL	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
77	Финнадзор							00000000000000	fin	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
79	ОАО Спецмонтажавтоматика							00000000000000	SPECMNTJ	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
62	ОАО "Бессер-Центральная Азия"	Производство строительных материалов	88-34-32	720083, г.Бишкек, пр.Чуй, 2а		Надырбекова Р.З.	Нишанбаев Ч.А.	01206200110066	BESSASIA	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
52	ОАО "Бишкектеплосеть"	Теплоснабжение	(0312) 56-88-22	720031,г.Бишкек,ул.Жукеева-Пудовкина,2/1		Абдыкалыков Э.Э.	Дуйшеналиева А.А.	00000000000000	BISHSETI	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
78	ОАО "Завод ЖБИ"	Производство сборного железобетона, бетона, раствора	53-26-97	720065, г.Бишкек, пр.Чуй, 2 а		Полянский А.Н.	Хлыновская В.В.	00000000000000	ZAVODJBI	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
65	ОАО "КыргызАВТОВАЗ"	Услуги по ремонту автомобилей и торговля запасными частями	53-39-95	720082,г.Бишкек,ул.Горького,д.3		Бобушев У.Р.		00000000000000	KGAVTOVZ	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
71	ОАО Домостроительная корпорация Азат	Строительство 	63-73-36	720083, г.Бишкек, ул.Ауэзова,1/10		Казакбаев М.	Асанбаева В.	00000000000000	DOMAZAT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
73	ОАО "Кыргызалтын"	Добыча драгоценных металлов и руд редких металлов	66-66-70	720040, г.Бишкек, ул.Абдымомунова, 195		Казаков Т.К.	Дюшеева Э.Б.	00000000000000	KYRGALT	Открытое акционерное общество	Заместитель Председателя Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
55	ОАО "Машиноиспытательная станция"		(03132) 5-31-62	725013, г.Кант, ул.Советская, 3				00000000000000	MASHSTAN	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
57	ОАО "Промпроект"	Проектирование зданий и сооружений	61-46-05	720001,г.Бишкек,пр.Чуй,219		Абдыбалиев М.К.	Агеева О.С.	00000000000000	PRPROEKT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
68	ОАО "Эмерек"	Производство мебели	59-33-77	720005, г.Бишкек, ул.Кулатова, 5		Асанкулов А.М.	Устинова Л.И.	00000000000000	AOEMEREK	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
180	ОсОО "Аю"	Производство алкогольной продукции	67-83-13	КР, Чуйская область, с.Сокулук, ул.Краснодарская 1б		Исаев Т.А.		00000000000000	OSOOAU	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
183	ОАО МКК "Фонд развития предпринимательства"	Услуги микрокредитования	62-35-05	г.Бишкек, ул.Ю. Абдрахманова, 175	mkk.frp@mail.ru	Медетов И.Б.	Сырдыбаева Ж.С.	01911199710142	AOMKKFRP	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
89	ОАО ПТО "Кыргызторгтехника"	Услуги и ремонт ХТТО	59-17-75	720031, г.Бишкек, ул.Кулатова, 2	suusar.a@mail.ru	Бапанов Т.Д.	Абдыраева С.	01103199310026	KYRGTORG	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
172	ОАО "Айыл Банк"	Банковская деятельность	62-30-30	720011,г.Бишкек,ул.Пушкина,50	office.ab.kg	Алимджанов Т.Б.	Казакова А.Ж.	00000000000000	AYLBANK	Открытое акционерное общество	Председатель Правления 	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
11	ОАО "Завод сверл"	Производство металлорежущего инструмента (сверла)	63-05-39	720048, г.Бишкек, ВПЗ, ул.Чолпон-Атинская, 2		Курманкожоев К.А.	Маматова Б.Ж.	00102197110029	ZVDSVR00	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
48	ОАО "Аламудунская ПМК"	Производство землянных работ	48-43-69	724301, Чуйская область, с.Аламудун, ул.Заречная, 12		Тимофеев А.И.		01411199510038	ALMYDPMK	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
5	ОАО "Кыргызкоммерцбанк"	Банковская деятельность	33-30-00	720017, г.Бишкек, ул. Шопокова, 101 а		Мусина А.А.	Джуманова Д.С.	02910198910019	KGZKOMBK	Открытое акционерное общество	Исполняющий обязанности Председателя Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
70	ОАО "Каинды-Кант"	Переработка сахарной свеклы и сахара-сырца с получением и реализацией сахара-песка и производных	(0-3137) 51-5-02	г.Каинда, ул.Мира, 1	k_kant65@mail.ru	Шалюта А.В.	Сизинцева Н.П.	03006199510032	KAINKANT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
171	ОАО "ФинансКредитБанк"	Банковская деятельность	0312386410	Кыргызская Республика, г. Бишкек, ул. Абдрахманова, 105 720021	fkb@fkb.kg	Альчиев Эрмек Карагулович	Маткабылова Нуркыз Аттокуровна	00812200510186	OAOFKB	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
31	ОТКАО "Ак-Жол"	Грузовые перевозки		720080, г.Бишкек, Васильевское шоссе, 1		Абдыкалиев А.	Калиева Ч.	00103199310202	OTKAKJOL	Открытое транспортно-коммерческое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
20	ОАО фирма "Сантехма"	Строительство	90-60-38	720031, г.Бишкек, ул.Кулатова, 1а		Чо Чон Хаг	Казакова Алёна Сергеевна 	00901199510036	FSANTEHM	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
63	ОАО "Бишкексут"	Переработка молока, реализация молочной и соковой продукции	90-15-60	720083, г.Бишкек, пр.Чуй,12а; 720083, г. Бишкек, пр. Шабдан Баатыра, 44		 Одинцов С.В.	Межерицкая Е.С.                                      	01610199210056	BISHSUT1	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
232	ОАО "Государственный банк развития Кыргызской Республики"							00000000000000	OAOGDB			2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
50	ОАО "Жумгалсуукурулуш"	Строительство водохозяйственных объектов, добыча угля	60-1-10	Нарынская обл., Жумгальский р-он, с.Чаек, ул.Жуматаева, д.4		Исагулов Н.А.		00000000000000	JUMGALSU	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
104	ОАО "Ак-Марал"	Легкая промышленность	64-31-06	720054, г.Бишкек,ул.Ю.Фучика,38		Айтматова В.С.		00000000000000	AKMARAL	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
67	ОАО "Ысык-Кол Фармация"	Изготовление и реализация лекарственных средств	(03922) 52-9-64	г.Каракол, ул.Ленина, 141		Мадемилов Н.	Асанбаева Э.	00000000000000	FARMACIA	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
116	ОАО "Канат"	Транспортные услуги	(03132) 7-06-50	725014, г.Кант, ВПЗ		Ермолова З.Е.		00000000000000	AOKANAT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
117	ОАО "Завод ДСМ"	Металлообработка		г.Бишкек, ул.Ш.Баатыра,1а		Чылымов А.	Чылымова А.А.	00000000000000	ZAVODDSM	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
156	ОАО "Кыргызский радиозавод Корпорация Ак-Марал"	Оптовая торговля	90-03-59	720005, г.Бишкек,ул.Байтик Баатыра, 59		Шаршекеев М.		00000000000000	KRAKMAR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
106	ОАО "Техсервис"	Услуги сельхозпроизводителям	(03131) 51-387	722042, Московский р-он, с.Ак-Cуу, ул.Шолохова, 12		Поминов К.О.	Шукурбаева М.С.	00112199210040	TSERVIS	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
217	ОАО Капитал Банк							00000000000000	CAPBANK	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
113	ОАО "Кыргыз-Таш"	Добыча камня для стекольной и цементной промышленности	35-71-13	720043, г.Бишкек, ул.Садыгалиева,10а		Кучаров К.Д.	Джумабаева У.Д.	02406199210021	KYRTASH	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
157	ОАО "Чуй унаа ишканасы"	Транспортные услуги		724911, Чуйская обл., г.Токмок, ул.Жантаева		Бейшеев Р.		01612199310029	OAOCHUI	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
121	ОАО "Линолеум"	Производство линолеума		Чуйская обл, г.Кемин, ул.Набережная, 1		Жаныбек уулу Тынчтык	Райымкулова Нургиза	00611199510031	LINOLEUM	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
109	ОАО "СПАБ"	Аренда, услуги	34-66-67	г.Бишкек, пер.Клубный-14		Кыбраев Н.Э.	Кулатаева А.Б.	00000000000000	OAOSPAB	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
110	ОАО "Спецмонтажавтоматика"	Услуги аренды	34-54-70	720080, г.Бишкек, ул.Фучика, 49		Джумаев Т.Н.		00000000000000	SMAVTOM	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
240	OAO Либерти Эксчейндж Жапан (Liberty Exchange Japan)							00000000000000	LBEXCHJP	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
112	ОАО Кыргызинвест	Инвестирование	0 700 517 045	720021, г.Бишкек, ул. Тимирязева, 97		Русакова Н.В.	Майорова К.А.	02303199310051	KINVEST	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
111	ОАО "Кеминский электротехнический завод"	Промышленность	(03135) 51-7-66	722500, город Кемин, ул.Советская, 200		Яшин В.И.	Минеева О.А.	02812199210043	KETZAVOD	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
115	ОАО "Асфальтобетон"	Производство асфальтобетона	50-513	724500, Чуйская обл.,Кеминский р-он,п.Дорожный		Абдрахманов М.Т.		00000000000000	ASBETON	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
114	ОАО "Курортторг Жетиген"	Услуги	(03943) 4-33-30	722100, Иссык-Кульская область, г.Чолпон-Ата,ул.Советская,156		Бровко Л.Д.	Маданова М.О.	03009199210054	JETIGEN	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
233	OAO "Дос-Кредобанк"	Банковская деятельность	98-69-89	г.Бишкек, пр.Чуй, 92		Эшбердиева Ч.М.	Алыбаева И.Т.	02002199710092	DOSCREDOBANK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
200	ОАО "Государственная Страховая Организация"	Страхование	65-55-25, 65-08-52	г.Бишкек, ул.Киевская, 218	info@gso.kg	Абдралиева Г.К.	Раева Б.Т.	01101201610062	OAOGSO	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
155	ОАО "Финансовая компания кредитных союзов"	Предоставление кредитов кредитным союзам, финансовый лизинг	61-45-93	720001, г.Бишкек, пр.Чуй, 219 (3,4 этаж)		Кожеков О.А.	Кожомбердиева А.К.	01104199710081	AOFKKS	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
108	ОАО "Салам"	Сдача помещений в аренду	56-45-80	720031, г.Бишкек, ул.Медерова, 44		Новиков Б.	Кашбаева А.	00000000000000	AOSALAM	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
107	ОАО МФК "Салым Финанс"	Микрофинансирование	31-17-39	720001, г.Бишкек, пр.Манаса, 40		Кулов М.Т.		00000000000000	SALYMFIN	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
60	ОАО "Чельпек"	Выращивание и производство с/х культур,семян картофеля и зерна		Иссык-Кульская обл., Ак-Суйский р-он, с.Чельпек, ул.Булатова, 26		Касымбаев Т.	Сыдыков Б.	00000000000000	CHELPEK1	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
158	ОАО "Кыргыз Долбоор"	Проектирование	31-74-53	720010, г.Бишкек, ул.Турусбекова, 31				00000000000000	KDOLBOOR	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
124	ОАО "Автосборочный завод"	Сборка автосамосвалов	44-96-70	720048, г.Бишкек, ул.Чолпон-Атинская, 2		Велиляев О.Х.	Абдыкеева Ч.Т.	00405199510084	ASZAVOD	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
130	ОАО "Ак-Суйское АТП"	Производство и реализация шелковых и хлопчатобумажных тканей	(03131) 5-25-09	Московский р-он, с.Ак-Суу, ул.Колхозная, 166				00000000000000	AKSUATP	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
137	ОАО "Сон-Куль"	Аренда		г.Бишкек, пр.Чуй, 110		Толобаев Д.К.	Абдыразакова Д.О.	01005199210037	SONKUL	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
138	ОАО "Кыргыз Тоо-Таш"	Производство строительных материалов	0553028058	724976,Чуйская обл., г.Токмок, Проышленная зона		Мордовкин И.А.	Кыдыкова Т.Т.	00404199810056	TOOTASH	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
122	ОсОО "Первая металлобаза"	Оптовая торговля широким ассортиментом товаров	32-00-95	г. Бишкек, ул.К.Акиева 57-10		Пирожкова Е.А.	Нелюбов Ю.Л.	01002201110178	PERMET	Общество с ограниченной ответственностью	Генеральный Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
218	ОАО "Национальная электрическая сеть Кыргызстана"	Передача, распределение, продажа, экспорт и импорт электрической энергии.	0312 66-10-01	г. Бишкек, пр. Жибек Жолу, 326	nesk@elcat.kg	Рысбеков Алтынбек Дурусбекович	Батырбекова Нурила Кушубаковна	02512200110100	NESKKR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
127	ОАО "Ак-Орго"	Сдача помещений в аренду	59-19-37	г.Бишкек, ул.Матросова, 5		Табалдиева Г.		00000000000000	AKORGO	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
128	ОАО "Ала-Тоо"	Производство и реализация сельскохозяйственной продукции	69-97-94	Аламудунский р-он,с.Кара-Жыгач,ул.Фрунзе,81		Кутнаев М.А.	Кермалиева Г.К.	00000000000000	ALATOO	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
142	ОАО "Сокулукский ККП"	Жилищно-коммунальное хозяйство	(03134) 5-36-74	724800, Чуйская обл., Сокулукский р-он, с.Сокулук, ул.Фрунзе, 138		Бектемиров А.	Незванова С.	00101194610010	SOKKKP	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
131	ОАО "Корпорация машиностроение"	Разработка, производство и реализация продукции	56-36-60	г.Бишкек,пр.Мира,1		Тыналиев Ш.С.		00000000000000	CORPMASH	Открытое акционерное общество	Президент	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
134	ОАО "Каинды эт комбинаты"	Перерабатывающая	(0501) 133-652	Чуйская обл., г.Каинды, ул.Полевая, 3		Ногоев А.А.	Дуйшеналиева Д.А.	02812199210056	OAOKEK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
120	ОАО "Оргтехстрой"	Разработка и внедрение новых технологий в строительной отрасли	53-22-75	г.Бишкек, ул.Горького, 1-г	otc.kg@mail.ru	Бекболотов Аскар Адылканович	Нурманбетова Б.Ш.	01111199810062	ORGTEHST	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
123	ОсОО "Ихсан-Орикс"	Оптовая и розничная реализация строительных материалов и сантехники	29-94-63	г.Бишкек, ул.Матросова, 1а	orix2005@mail.ru	Урустамова З.К.	Губарова З.Н.	02405201310229	IHORIKS	Общество с ограниченной ответственностью	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
153	ОАО "Балыкчы ПАТП"	Перевозка пассажиров	(03944) 7-09-62	721900,г.Балыкчы,ул.Весенняя,10		Бектуров Н.Б.	Волкова В.	01211199510017	BALPATP	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
126	ОАО "Уста"	Ремонт тракторно-комбайновых двигателей,изготовление запасных частей к сельхозмашинам	34-67-59	720054,г.Бишкек,ул.Фучика,9		Юлдашев Ш.А.		02703199310024	AOUSTA	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
136	ОАО "Талас Басмаканасы"	Полиграфия	(03422) 5-23-18	722720, г.Талас, ул.Ленина, 271		Жумалиев А.	Акимканова А.	00000000000000	TBASMA	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
148	ОАО "Медиа Форум"	Предпринимательская деятельность. Деятельность по сдаче свободных помещений в своем офисе в операционную аренду	53-05-15	720082, г.Бишкек, ул.Шабдан-Баатыра, 4-Б		Кожомкулов Д.А.		00000000000000	MEDIAF	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
64	ОАО "Айгул"	Производство промышленной продукции и товаров народного потребления	43-97-73	г.Бишкек,пр.Чуй,147		Бараканова Н.У.	Ногойбаева А. К.	02503195810018	OAOAYGUL	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
176	ОАО "Учкун"	Полиграфия	59-16-03, 59 15 88	720031, г.Бишкек, ул.Ибраимова 24		Султанов Б.М.	и.о гл.бухгалтера Дегембаева Б.И. 	00000000000000	AOUCHKUN	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
164	ОАО "Арпа" им. Насыркула Урманбетова	Производство пива и безалкогольных прохладительных напитков	 64-12-53	720010, г.Бишкек, ул.Токтогула, 256		Урманбетов Д.Н.		00000000000000	AOARPA	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
58	ОАО "Ак-Сут"	Переработка и реализация молока и молочных продуктов	(03131) 5-24-52	722040, Московский р-он, с.Беловодское, ул.Октябрьская, 55		Абдуллаев К.Т.	Середа В.Ш.	00000000000000	OAOAKSUT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
181	ОАО ТД "Мин Туркун"	Аренда	43-73-42	720011, г.Бишкек, пр.Чуй 127		Бапанов Т.Д.		00000000000000	AOTDMIN	Открытое акционерное общество	Президент	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
168	ОАО "Оптима Банк"	Банковская деятельность	25-37-97 (1113)	720040, г.Бишкек, пр. Жибек Жолу, 493	churok.keneshova@optimabank.kg	Капышев Б.С.	Осмонова Д.Д.	00904199310033	OPTIMA	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
102	ОАО Микрофинансовая компания "АБН"	Услуги микрокредитования	51-11-51	г.Бишкек, 4 микр-он, №35/1	info@abn.kg	Кожомуратов Улан Болотович	Кадырбаева Гульзат Тажибаевна	02810199810206	MFCABN	Открытое акционерное общество	Председатель Правления 	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
169	ОАО "РСК Банк"	Банковская деятельность	65-01-54	720010, г.Бишкек, ул.Московская 80/1	info@rsk.kg	Ногаев Уланбек Мелисович	Чубарова Аиза Айдарбековна	00000000000000	RSKBANK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
118	ОАО "Кыргызмебель"	Производство и реализация мебели	65-85-35	г.Бишкек,ул.Фучика,3		Салымбеков М.М.		00000000000000	KMEBEL	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
119	ОАО "Евразийская валютно-фондовая инвестиционная биржа "Союз"	Обеспечение организации и упорядочение рынка ценных бумаг и формирования на нем цен на биржевые товары на основе спроса и предложения	39-40-55	720001, г.Бишкек, ул.Турусбекова, 109/1, каб.512		Чабанова А.М.		00000000000000	EVFIBS	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
184	ОАО Домостроительная корпорация "Азат"	Строительство жилья,объектов соцкультбыта,ремонт и реконструкция зданий	63-73-36	720083, г.Бишкек, ул.Ауэзова,1/2		Казакбаев М.	Асанбаева В.	00000000000000	DSKAZAT	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
140	ОАО НПФ "Дордой Гарант"	Негосударственное пенсионное обеспечение, обязательное пенсионное страхование	900-978	г.Бишкек, ул.Кожевенная, д.1		Мамбеталиев Н.У. 	Муралиева Б.А.	00000000000000	NPFDOR	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
139	ОАО "Сейил"	Производство безалкогольных напитков	(03922) 5-02-82	г.Каракол, ул.Дербишева, 181		Шаршеналиева Р.А.	Алексеева Л.А.	02112199210016	SEIIL	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
159	ОАО "Кыргызское"	Сельское хозяйство	63-72-14	пос.Манас,Сокулукский район		Пак В.А.		00109197210016	OAOKYRG	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
162	ОАО "Гарантийный фонд"	Услуги по предоставлению гарантий по обязательствам субъектов малого и среднего предпринимательства	66-49-60, 62-53-76	г.Бишкек, пр.Чуй, 114	office@gf.kg	Абакиров М.-А. Б.	Казиева М. Б.	01609201610123	GARFOND	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
146	ОАО "Ала-Тоо Инвест"	Прочее денежное посредничество	65-34-00	г.Бишкек, пр.Чуй, 315  комн.803		Чынгышев Абдыралы Алсеитович       Главный менеджер по финансам	Токтотемиров Куручбек	01010199510099	ATINVEST	Открытое акционерное общество	Управляющий	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
221	ОАО "Фонд поддержки развития туризма в Кыргызской Республике"	Деятельность коммерческих, предпринимательских общественных организаций (ассоциаций) КЭД – 94.11.0	0312586135	г.Бишкек, пр.Чуй, 106		Шерниязов Абылкасым Эсентаевич	Жунушева Касиет Салабатовна	02303202210149	FPRTKR	Открытое акционерное общество	Президент	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
141	ОАО НПФ "Кыргызстан"	Негосударственное пенсионное обеспечение, обязательное пенсионное страхование	 66-58-85	г.Бишкек, ул.Киевская, 69		Баяманова З.Э.	Муралиева Б.А.	00000000000000	NPFKYR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
144	ОАО "Бишкекский машиностроительный завод"	Выпуск и реализация промышленной продукции	54-16-23	720066,г.Бишкек,пр.Мира,1	oaobmz@mail.ru	Абдураимов Ж.О.	Марат уулу Б.	02604199410037	OAOBMZ	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
161	ОАО "Кара-Балтинский комбинат коммунальных предприятий"	Коммунальные услуги	(03133) 4-10-50	724400, г.Кара-Балта, ул.Владимировой, 1а		Владимиров Ю.В.		00000000000000	KBKKP	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
145	ОАО "Кантский цементный завод"	Производство цемента	+996 (3132) 5-77-17	725000, Чуйская область, Ысык-Атинский район, город Кант, Восточная промышленная зона	cement@cement.kg	Дехтярев П.В.	Шелепова Г.П.	00911199510157	OAOKCZ	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
165	ОАО ТНК "Дастан"	Машино-приборостроение	91-64-02	720005, г.Бишкек, ул.Байтик-Баатыра, 36		Иманов Т.О.	Леписова К.С.	00000000000000	DASTAN	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
166	ОАО "Улан"	Выпуск ТНП		722210, Иссык-Кульская область, пгт.Пристань-Пржевальск, ул.Кирова 1		Жампеишов Р.Ж.	Лаптева А.И.	00000000000000	AOULAN	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
167	ОАО "Шоппинг онлайн центр"	Разработка и продвижение международной электронной торговой площадки		г.Бишкек,пр.Чуй, 219, 9 этаж		Болгомбаев М.К.		00000000000000	AOSHOC	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
160	ОАО "Тулпар"	Автомобильный транспорт,перевозка пассажиров	91005,0500821208	Иссык-Кульская обл,Тонский р-он,с.Боконбаево, ул.Тойчубекова,1	zarnaeva.00@mail.ru	Адылова Гульнара Орозбековна	Кулмендеева Сагын	02004199310045	TULPAR	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
175	ОАО "Северэлектро"	Продажа электроэнергии	33-85-03	722160, КР, Чуйская область, Аламудунский р-н, с.Лебединовка, ул. Чкалова 3		Кадыркулов И.А.		00000000000000	SEVEREL	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
150	ОАО "Элесинвест"	Операции с ценными бумагами	0312 31-72-62	г.Бишкек, ул. Московская, 172		Ногойбаева А.Т.	Бекмурат к.Ш.	00000000000000	ELESINV	Открытое акционерное общество	Председатель правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
143	ОАО "Карабалтинская типография"	Полиграфия	0559 82 73 55	г.Карабалта, ул.Кожомбердиева, 112	KBT_Tipografiia_112@mail.ru	Атамкулов Т.	Сулайманова Г.	00505193310018	KBTIPOG	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
149	ОАО  "Жаштыкинвест"	Операции с ценными бумагами	31-72-62	г.Бишкек,ул.Московская, 172	jashtyk1996@gmail.com	Сулайманова Б.Ж.	Ашимбекова Н.Ж.	00000000000000	JASHTYK	Открытое акционерное общество	Председатель правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
1	ОАО "Апар Сервис"	Производство автомобилей	+996226777226	Кыргызская Республика, г.Бишкек, Октябрьский район, ул. Чокана Валиханова, д4	info@k51.group	в лице председателя правления ОАО "Группа К51"		01511201910209	OTALCAP	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
154	ОАО "KDM TV" ("КиДиЭм ТиВи")	Предоставление телекоммуникационных услуг	68-01-70	720040, г.Бишкек, ул.Раззакова,19, каб.405		Кан И Ман		02607201110010	KDMTV	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
187	ОАО "Халык Банк Кыргызстан"	Банковская деятельность	32-35-99	г.Бишкек,ул.Фрунзе,390	ashkerova@halykbank.kg	Чыныбаева Алия Толюгеновна	Нестеренко Наталья Николаевна	01204199910016	HALYKBNK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
152	ОАО "Коммерческий банк КЫРГЫЗСТАН"	Банковская деятельность	61-53-64	720033, г.Бишкек, ул.Тоголока Молдо, 54		Алиев Бектур Кубанычбекович	Дженбаева Э.Т.	02712199110068	KBKYRG	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
163	 ОАО "Республиканское производственное объединение радиорелейных магистралей, телевидения и радиовещания"	Радиовещание и телевещание	67-11-11	720040, г.Бишкек, ул.Дзержинского, 122		Джолоров А.Т.	Мадымарова Ф.	00000000000000	RPORMTR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
177	ОАО "Кыргызтелеком"	Предоставление услуг электросвязи	68-16-16	720000, г.Бишкек пр. Чуй 96		Мадаминов Нурлан Сабырович	Оконов Медет Манасович	02102199410075	OAOKTKOM	Открытое акционерное общество	Мадаминов Нурлан Сабырович	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
236	ОАО Ашар Девелопмент							00000000000000	ASHARDEV	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
37	ОАО "Кантская типография"	Сдача имущества в аренду	(03132) 5-15-65	г.Кант, ул.Буслаева, 1		Акпынар Ханзала Суат	Белан Тамара Анатольевна	02108199110011	KANTTIPG	Открытое акционерное общество	 Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
36	ОАО "КыргызВНИПИЭнергопром"	Сдача в аредну производственных помещений	56-31-60	720031, г.Бишкек, ул.Медерова, 42		Жумабекова А К 		02707199410107	KGZVNIPI	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
8	ОАО Пример1	Проверка	31 14 84	г. Бишкек, ул. Московская, 172	office@kse.kg	 Назаралиев М.Т.	Бекмуратова С.С.	00290819940061	PRIMER01	Открытое акционерное общество	И.о. Президента	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
185	ОАО "Кыргыз Винд Систем"	Производство электроэнергии	+996770362222	г.Бишкек ул.Каралаева 40/4	kyrgyzwindsystem@gmail.com	Садыков А.А.		00000000000000	KYRVSYS	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
135	ОАО "Автоуслуги"	Организация пассажирских перевозок	5-56-84, 5-57-34	724830, Чуйская обл., Сокулккский р-он, г.Шопоков, ул.Футбольная,1		Цаплин В.И 	Марченко Н.	01007199510043	AUSLUGI	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
132	ОАО "Опытное кожевенно-кожгалантерейное объединение"	Выпуск товаров народного потребления	67-91-19	720024, г.Бишкек, ул.Хвойная, 64		Асанканов У.Т.	Кубанычбеков К.К	02206199510033	AOOKKO	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
151	ОАО АИФ "Береке-Инвест"	Операции с ценными бумагами	0771-18-78-92	г.Бишкек, 12 мкр., ДК-Центр, 210 кабинет	bereke.invest.fond@gmail.com	Саниахметова И.	Парпиева Н.	00908199310067	BEREKEIN	Открытое акционерное общество	Управляющий	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
197	ОАО "Арашан"	Переработка молока и производство молочных продуктов	(0-3456) 6-01-41	Таласская область, Карабууринский р-он, с.Кызыладыр, ул.Ч.Айтматова, 17		Кермалиев А.Б.		02606199310040	ARASHAN	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
66	ЗАО "СУ №4"	Строительство	(03133) 7-00-92	г.Кара-Балта, ул.Кожомбердиева, 2		Варченко И.		00107199710094	OAOSU004	Закрытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
182	ОАО "Кыргызсуудолбоор"	Строительство		г. Бишкек, ул.Т.Саманчина 6				00000000000000	OAOKSD	Открытое акционерное общество		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
53	ОАО ПСФ "Бишкеккурулуш"	Выполнение комплекса строительно-монтажных работ, выпуск продукции строительных материалов	59-00-80	720052,г.Бишкек,ул.Л.Толстого,12		Молдобаев А.	Мамбетова А.С.	01412199210066	PSFBISHK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
237	ОАО Ашар Инвест							00000000000000	ASHARINV	\N		2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
19	ОАО "Golden Sun" ("Голден Сан")	Производство сельскохозяйственной продукции,плодоовощных консервов,соков,виноматериалов,вина и ликероводочных изделий	67-83-13	722110,Чуйская обл.,Сокулукский р-он,п/о Чон-Джар,с.Кунтуу		Исаев Ч.М.	Жумашова Н.	00000000000000	GOLDSUN	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
38	ОАО фирма "Проммонтаж"	Стоительно-монтажные работы по возведению конструкций,зданий и сооружений	45-16-13	722193,Чуйская область,Аламудунский р-он,с.Аламудун,ул.Суворова,1а		Бобылева Р.С.	Мурзаева Г.Т.	00111199310072	FIRMPROM	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
103	ОАО "Апросах"	Пищевая промышленность	(03133) 3-37-30	722030,г. Кара-Балта,ул.Кожомбердиева,88		Соболева М.Г.	Федченко И.В.	00511199210019	APROSAH	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
225	ОАО "Ашар Капитал"	Покупка и продажа собственного недвижимого имущества 68.10.0	996 559911425	Кыргызская Республика, город Бишкек, пр. Чуй, д. 147		Рахимов Ринат Равильевич	Исакова Бурул	00410202210238	OAOASHAR	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
190	ОАО Банк "Бай-Тушум"	Банковская деятельность	(312) 905 805 	г. Бишкек, ул. Уметалиева,76		Базаркулов  У.А.	Кадыркулова Н.А.	02312200510090	BTUSHUM	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
24	ОАО "Кыргызэнергострой"	Общестроительные работы	88-12-59	724820, Чуйская обл., Сокулукский р-он, с.Селекционное, ул. Циалковского, 86		Дайыров А.Э.	Бекжанова А.Б.	02505199410013	KYRGENST	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
25	ОАО "Global Invest" ("Глобал Инвест")	Сдача в аренду недвижимости	913103	г.Бишкек, пр.Жибек-Жолу, 539		Мухарлямова А.А.	Копнина А.Н.	00404200710089	GLOBINST	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
105	ОАО "Кыргызский Энергетический Расчетный Центр"	Сбор и обработка информации автоматизированных систем коммерческого учета электроэнергии в Кыргызской Республике, подготовка энергетических балансов, расчетов и распределения потерь	66-07-07	720070, г.Бишкек, пр.Жибек-Жолу, 326	office@esep.energo.kg	Жаныбеков Б.Р.	Досмамбетова А.М.	01711201510101	KRKERC	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
16	ОАО "Logic" ("Лоджик")	Торговля компьютерным оборудованием	32-33-33	720033, г.Бишкек, пр.Жибек Жолу, 539		Окенов Д.А.	Жумабекова Э.Н.	02104200810115	LOGIC01	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
133	ОАО "Арстанбек"	Животноводство, растениеводство		Чуйская обл., г.Каинда, откормпункт		Ногоев А.А.	Дуйшеналиева Д.А.	01002199410027	ARSTAN	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
234	ЗАО "Банк Азии"	Банковская деятельность	+996 (312) 55-00-01	720016, Кыргызская Республика,  г. Бишкек, пр. Ч. Айтматова, 303  (СЭЗ «Бишкек»)	bankasia@bankasia.kg	Атакишиева Земфира Акишовна	Кустебаева Назира Бейшенбековна	00805199810064	BANKOFASIA	Закрытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
76	ОАО АК "Кыргызайылкомок"	Материально-техническое снабжение сельских товаропроизводителей и других потребителей сырьем, оборудовнием,з.частями, сельхозтехникой	35-72-20	720043,г.Бишкек,ул.Садыгалиева,6	ak.kyrgyzayilkomok@mail.ru	Узакбаева М.Э.	Данилова И.В.	01803199310053	OAOAKKYR	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
229	ОАО "Акжолтой"		(+996 312) 530-179 	720082, г. Бишкек ул. 7-апреля, 155 А 	akjoltoe@inbox.ru	Кенешбеков Э.А.		00000000000000	AKJLTOI	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
23	ОАО "Кыргызавтомаш"	Промышленное производство	91-05-00	720031, г. Бишкек, ул.Матросова,1а	grobilev.mm@kompozitgroup.ru	Владимиров Юрий Николаевич	Сыдыкова Назгуль Суюмбековна	00101194510012	KGZAVTOM	Открытое акционерное общество	Исполнительный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
75	ОАО "Группа К51"	Деятельность центральных (головных) офисов	0226777226	г.Бишкек, ул. Исакеева, 1б		Кузин А.А.		00805201810268	ALTYNDEV	Открытое акционерное общество	Председатель правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
69	ОАО "Домостроитель"	Оказание платных услуг населению, предоставление в аренду транспорта	(03131) 5-21-19	724601, Московский р-он, с.Ак-Суу, промзона		Белькова В.В.	Нартаева А.В.	00101199611020	AODOMSTR	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
199	ОАО "Жети-Огуз"                       	Транспортные услуги		с.Кызыл-Суу, ул.Манас, 1	kokoevaasyl@mail com	Турдуев М.Д.	Кокоева А.	02904199310024	GETIOGUZ	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
26	ОАО "Бишкек-Нан" им.Шеримкулова К.Ш.	Сдача в аренду помещений,оказание услуг населению	53-37-19	720065, г.Бишкек, ул.Армейская, 150		Шеримкулов А.С.		02102197710019	BISHNAN0	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
230	ОАО "ВТИ Сервис"	Техническое обслуживание и ремонт вычислительной техники	\t(0312) 36-25-57	720051, г.Бишкек, пр.Жибек-Жолу, 101		Турсалиев К.		00000000000000	VTISERVS	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
174	ОАО "Государственная ипотечная компания"	Обеспечение полноценного функционирования механизмов жилищной ипотеки в Кыргызской Республике, с привлечением финансирования, которое будет способствовать развитию доступного жилья в рамках реализации государственных и собственных жилищных программ.	0312 61-06-77	г. Бишкек, ул. Токтогула 228	info@gik.kg	Шыкмаматов Алмамбет Насырканович	Сатывалдыева Эльмира Кыдыргазиевна	00810201510086	OAOGIK	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
223	ЗАО "Микрофинансовая Компания ОКСУС"	Микрокредитование населения	+996 (312) 515166	Адрес: 720031, г. Бишкек,  ул. Матросова. 150	office@oxus-kg.org	Хомяков Денис Алексеевич	Чубакова Асель Тулегеновна	01207200610320	MFKOKSUS	Закрытое Акционерное Общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
202	ОАО "Шатер"	68.32.0 Управление недвижимым имуществом	+996 (312) 462776	г. Бишкек, ул. льва Толстого 146 - А кв. 8	serg_shvab@rambler.ru	Швайберов Артур Сергеевич		02903202110517	SHATER	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
173	ОАО "Электрические станции"	Производство электро- и теплоэнергии	0312 66-11-01	720070,г.Бишкек,пр.Жибек-Жолу,326	oo.es@es.energo.kg	Качкынбаев Осмон Кененбаевич	Фомина Альбина Турдубековна	01810200110062	OAOELST	Открытое акционерное общество	Генеральный директор 	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
226	ОсОО «Текстиль Транс»	Производство трикотажных полотен, носочно - чулочных изделий	996556269909	Чуйская область, Чуйский район, с.Чуй, ул. Промзона 	anara_1103@mail.ru	Абдраев Базарбек Кошоевич	Кубанычбек к.Анарахан	01712200810168	TTRNB	Общество с ограниченной ответственностью	генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
72	ОАО "Теским"	Аренда	30-47-81	г.Бишкек, ул.Абдрахманова, 201	shakmanova@mail.ru	Ужахов А И	Главный бухгалтер             Шакманова И В	00110199310113	TESKIM	Открытое акционерное общество	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
170	ОАО "Международный аэропорт Манас"	Воздушный транспорт	39-30-17	720062, г.Бишкек, аэропорт "Манас"	vpmanas@airport.kg www.airport.kg	Самидинов М.С.	Главный бухгалтер Суюмбаева Б.З.	00015052001163	OAOMAM	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
238	ОАО Кыргызнефтегаз	добыча нефти и газа, бурение скважин	+996709200986	Жалал-Абадская область, Ноокенский район, город Кочкор-Ата, улица Ленина, дом №44	bai2310@mail.ru	Нишанов Нургазы Нурланович	Баратова Айзада Абдымомуновна	00101199610251	KNFTGAS	Частная	Председатель правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
220	ОАО "Кыргызиндустрия"	Деятельность согласно Уставу	66 56 56	г.Бишкек, пр.Чуй 106	a.saimasaeva@kyrgyzindustry.kg	Абдураимов Ж.О	Дуйшембиева Н.К.	02801202210185	KGINDS	Открытое Акционерное Общество	Президент .	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
125	ОАО "Чакан ГЭС"	Обеспечение снабжения электроэнергией потребителей	48-30-85	724302,Аламудунский р-н,пос.ГЭС-3,ул.Суворова,113		Садыков Н.М.	Кожомбердиева А.М.	00811200010039	CHAKAN	Открытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
195	ОАО "Жилищно-сберегательная кредитная компания Народная жилищная компания"	Прием жилищно - сберегательных вкладов и предоставление жилищных кредитов		г.Бишкек, ул.Токтогула, 228		Момбеков Улан Ажыбекович	Кумушбекова Айнура Кенешбековна	01405202010041	AKBOSOGO	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
228	ЗАО Микрофинансовая компания Элет-Капитал	Предоставление кредита	0 (312) 66-37-09	г. Бишкек, ул. Московская, 125	elet@elet.kg	Камчыбеков Эрнест Садырбекович	Тазабекова Нургуль Чолпонбаевна	02909200510102	ELETCAP	Закрытое Акционерное Общество	Председатель Правления-Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
227	ОсОО "Строй дом.КГ"	Торговля и производство	0552888028	г.Бишкек ж/м Ак-Орго, ул.Саманчы-Жолу 73	stroydom.kg@mail.ru	Искендеров Адилет Каныбекович	Садыкова Гульнара Ильясовна	00107201610083	STROYDOM	Общество с ограниченной ответственностью	Директор	2023-09-07 16:45:18.305+06	2023-09-07 16:45:18.305+06
10	ОАО Тест (ЗАО КФБ)	Тестирование	31 14 84	Московская 172	kse@kse.kg	Назаралиев М.Т.	test	02908199410061	test	Открытое акционерное общество	Президент	2023-09-07 16:45:18.305+06	2023-09-11 17:41:13.894+06
2	ЗАО "Кыргызская Фондовая Биржа"	Деятельность на рынке ценных бумаг	311484	г. Бишкек, ул. Московская, 172	office@kse.kg	Назаралиев М.Т.	Гульзада Базаркулова	02908199410061	KSE00000	Закрытое акционерное общество	Президент	2023-09-07 16:45:18.305+06	2023-09-16 21:12:21.481+06
219	ЗАО UBS "Transit"	Деятельность грузового автомобильного транспорта	+996 (312) 88 06 66	Кыргызская Республика, Чуйская область, Московский район, село Ак-Суу, ул.Дружбы, 16В	info@ubstransit.kg	Толомушов Данияр Абдуласович	Макенов Данияр Аскарбекович	02702200810268	UBSTRANS	Закрытое акционерное общество	Генеральный директор	2023-09-07 16:45:18.305+06	2023-09-27 15:42:57.276+06
250	testtt	testtt	testett	testttt	testttt	testttt	testttt	897987987987979	\N	\N	\N	2023-09-27 22:15:01.533+06	2023-09-27 22:15:01.533+06
129	ОАО "Полибетон"	Производство железобетонных изделий и конструкций для дорожного строительства	35-55-14	г.Бишкек,ул.П.Лумумбы,1а		Ли В.В.	Кулумбаева М.М.	0290819941006	POLIBET	Открытое акционерное общество	Председатель Правления	2023-09-07 16:45:18.305+06	2023-10-09 14:43:16.326+06
\.


--
-- TOC entry 3716 (class 0 OID 24006)
-- Dependencies: 212
-- Data for Name: company_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_templates (id, title, form_type, template) FROM stdin;
1	Обновить данные компании	upd	[{"label":"Название компании","element":"input","field":"name","value":""},{"label":"Вид деятельности","element":"input","field":"activity","value":""},{"label":"Телефон","element":"input","field":"phone_number","value":""},{"label":"Адрес","element":"input","field":"address","value":""},{"label":"Почта","element":"input","field":"email","value":""},{"label":"Руководитель","element":"input","field":"director","value":""},{"label":"Бухгалтер","element":"input","field":"accounting","value":""},{"label":"ИНН","element":"input","field":"inn","value":""}]
2	Добавить новую компантию	add	[{"label":"Название компании","element":"input","field":"name","value":""},{"label":"Вид деятельности","element":"input","field":"activity","value":""},{"label":"Телефон","element":"input","field":"phone_number","value":""},{"label":"Адрес","element":"input","field":"address","value":""},{"label":"Почта","element":"input","field":"email","value":""},{"label":"Руководитель","element":"input","field":"director","value":""},{"label":"Бухгалтер","element":"input","field":"accounting","value":""},{"label":"ИНН","element":"input","field":"inn","value":""}]
\.


--
-- TOC entry 3742 (class 0 OID 25222)
-- Dependencies: 238
-- Data for Name: eds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eds (id, "typeId", "reportId", cert, hash, "userId", "companyId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3736 (class 0 OID 24922)
-- Dependencies: 232
-- Data for Name: eds_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eds_types (id, title) FROM stdin;
1	Облачное ЭЦП
2	РуТокен
\.


--
-- TOC entry 3738 (class 0 OID 25060)
-- Dependencies: 234
-- Data for Name: oi_kse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.oi_kse (id, oi_company_id, kse_company_id, type) FROM stdin;
2	178	18	listing
4	51	21	listing
5	73	23	listing
6	172	5	listing
7	171	4	listing
8	240	55	listing
9	138	24	listing
10	122	20	listing
11	218	38	listing
12	176	11	listing
13	168	1	listing
15	102	37	listing
16	169	2	listing
17	219	42	listing
18	162	43	listing
19	177	13	listing
20	182	31	listing
22	234	49	listing
23	174	46	listing
24	223	50	listing
25	173	12	listing
26	170	3	listing
27	238	53	listing
28	220	44	listing
29	125	16	listing
30	228	51	listing
31	227	47	listing
32	217	40	listing
33	75	48	listing
34	179	19	listing
35	226	41	listing
36	107	25	listing
37	183	26	listing
38	233	56	listing
39	12	58	listing
40	3	188	oi
41	4	147	oi
42	21	3	oi
43	14	28	oi
45	17	52	oi
46	18	107	oi
47	22	193	oi
48	6	154	oi
49	188	271	oi
50	9	61	oi
51	193	272	oi
52	194	74	oi
53	15	185	oi
54	196	276	oi
55	189	119	oi
56	186	270	oi
57	178	79	oi
58	28	183	oi
59	33	152	oi
61	42	33	oi
62	34	139	oi
63	40	122	oi
64	43	194	oi
66	47	177	oi
67	30	84	oi
68	39	175	oi
69	29	2	oi
70	32	59	oi
71	27	116	oi
72	46	27	oi
73	41	161	oi
74	45	93	oi
75	49	142	oi
76	56	90	oi
78	74	73	oi
79	239	302	oi
80	51	189	oi
81	231	295	oi
82	61	145	oi
83	79	166	oi
84	52	38	oi
85	78	223	oi
86	65	143	oi
87	71	83	oi
88	73	37	oi
89	55	240	oi
90	57	105	oi
91	68	127	oi
92	180	198	oi
93	183	40	oi
94	89	90	oi
95	172	70	oi
96	11	64	oi
97	48	215	oi
98	5	153	oi
99	70	162	oi
100	171	120	oi
101	31	225	oi
102	20	111	oi
103	63	135	oi
104	232	296	oi
105	50	62	oi
106	104	147	oi
107	67	72	oi
108	117	48	oi
109	156	196	oi
110	106	29	oi
111	113	149	oi
112	157	58	oi
113	121	221	oi
114	109	177	oi
115	110	166	oi
116	240	303	oi
117	112	94	oi
118	111	121	oi
119	115	131	oi
120	114	26	oi
121	200	242	oi
122	155	178	oi
123	108	224	oi
124	107	192	oi
125	60	67	oi
126	158	174	oi
127	124	151	oi
128	130	232	oi
129	137	222	oi
130	138	17	oi
131	122	187	oi
132	218	206	oi
133	127	210	oi
134	128	103	oi
135	142	148	oi
136	131	60	oi
137	134	118	oi
138	120	49	oi
139	123	252	oi
140	153	134	oi
141	126	112	oi
142	136	108	oi
143	148	128	oi
144	64	85	oi
145	176	16	oi
146	164	203	oi
147	58	212	oi
148	168	7	oi
150	102	208	oi
151	169	39	oi
152	118	31	oi
153	219	281	oi
154	184	83	oi
155	139	170	oi
156	159	50	oi
157	162	237	oi
158	146	266	oi
159	221	285	oi
160	141	265	oi
161	144	63	oi
162	161	155	oi
163	145	202	oi
164	165	249	oi
165	166	184	oi
166	167	253	oi
167	160	89	oi
168	175	13	oi
169	150	57	oi
170	143	169	oi
171	1	263	oi
172	154	126	oi
173	187	129	oi
174	152	75	oi
175	177	12	oi
176	236	300	oi
177	37	173	oi
178	36	54	oi
179	185	268	oi
180	135	141	oi
181	132	125	oi
182	151	214	oi
183	197	201	oi
184	182	87	oi
185	53	91	oi
187	237	299	oi
188	19	71	oi
189	38	30	oi
190	103	122	oi
191	225	291	oi
192	190	269	oi
193	24	158	oi
194	25	76	oi
195	105	262	oi
196	16	157	oi
197	133	165	oi
198	234	286	oi
199	76	53	oi
200	229	219	oi
201	23	8	oi
202	75	250	oi
203	69	136	oi
204	26	77	oi
205	174	248	oi
206	223	290	oi
207	202	278	oi
208	173	36	oi
209	72	146	oi
210	170	132	oi
211	238	301	oi
212	220	283	oi
213	125	10	oi
214	195	275	oi
215	228	293	oi
216	129	66	oi
217	227	287	oi
218	10	267	oi
219	54	246	oi
220	179	176	oi
221	62	176	oi
222	217	5	oi
223	233	200	oi
224	181	226	oi
225	149	56	oi
226	163	239	oi
227	199	241	oi
228	130	130	oi
229	226	279	oi
230	140	\N	oi
\.


--
-- TOC entry 3744 (class 0 OID 25241)
-- Dependencies: 240
-- Data for Name: receipts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receipts (id, "reportId", cert, hash, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3722 (class 0 OID 24471)
-- Dependencies: 218
-- Data for Name: report_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_groups (id, title) FROM stdin;
1	Отчеты
2	Существенные факты
\.


--
-- TOC entry 3720 (class 0 OID 24152)
-- Dependencies: 216
-- Data for Name: report_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_status (id, title, type) FROM stdin;
1	сохранен	saved
2	отправлен	processing
3	отклонен	rejected
4	принят	confirm
5	подписан	sign
\.


--
-- TOC entry 3718 (class 0 OID 24094)
-- Dependencies: 214
-- Data for Name: report_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_templates (id, template) FROM stdin;
8	[{"label":"Фамилия, имя, отчество","element":"textarea","field":"full_name","required":false},{"label":"Вид ценной бумаги","element":"textarea","field":"type_security","required":false},{"label":"Доля в процентах","element":"textarea","field":"percentage_share","required":false},{"label":"Дата, с которой произошли указанные изменения","element":"textarea","field":"date_from_said_changes","required":false}]
2	[{"label":"Период отчета","element":"select","field":"listing_period","options":[{"value":1,"label":"1 квартал"},{"value":2,"label":"2 квартал"},{"value":3,"label":"3 квартал"},{"value":4,"label":"4 квартал"},{"value":5,"label":"Годовой отчет"}],"required":true},{"label":"Год","element":"select","field":"listing_year","options":[{"value":2023,"label":"2023 год"},{"value":2022,"label":"2022 год"},{"value":2021,"label":"2021 год"}],"required":true},{"element":"list_group","field":"listing","lists":[{"field":"attachment_2_1","element":"form","template":[{"label":"Данные, включаемые в краткий годовой и ежеквартальный отчет для публикации в средствах массовой информации","element":"title","type":"default","level":5},{"label":"1. Данные об эмитенте","element":"title","type":"secondary","level":5},{"label":"Полное и сокращенное наименование эмитента","element":"input","field":"issuer_data_full_name","required":false},{"label":"Организационно-правовая форма","element":"input","field":"issuer_data_org_legal","required":false},{"label":"Юридический и почтовый адрес эмитента, номер телефона и факс","element":"input","field":"issuer_data_legal_info","required":false},{"label":"Основной вид деятельности эмитента","element":"input","field":"issuer_data_main_activity","required":false},{"label":"2. Количество владельцев ценных бумаг и работников эмитента","element":"title","type":"secondary","level":5},{"label":"Количество владельцев","element":"input","field":"amount_owners","required":false},{"label":"Количество работников","element":"input","field":"amount_workers","required":false},{"label":"3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала","element":"title","type":"secondary","level":5},{"element":"list","dynamic":true,"required":false,"field":"list_of_legal_entities","headers":[{"title":"Наименование юридического лица","span":5},{"title":"Организационно-правовая форма","span":5},{"title":"Местонахождение, почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО","span":8},{"title":"Доля участия в уставном капитале","span":5}],"lists":[{"field":"list_of_legal_entities_1","span":5},{"field":"list_of_legal_entities_2","span":5},{"field":"list_of_legal_entities_3","span":8},{"field":"list_of_legal_entities_4","span":5}]},{"label":"4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде","element":"title","type":"secondary","level":5},{"element":"list","dynamic":true,"required":false,"field":"information_about_material_facts","headers":[{"title":"Наименование факта","span":5},{"title":"Дата появления факта","span":5},{"title":"Влиянии факта на деятельность","span":8},{"title":"Дата и форма раскрытия","span":5}],"lists":[{"field":"information_about_material_facts_1","span":5},{"field":"information_about_material_facts_2","span":5},{"field":"information_about_material_facts_3","span":8},{"field":"information_about_material_facts_4","span":5}]},{"label":"5. Финансовая отчетность эмитента за отчетный период","element":"title","type":"secondary","level":5},{"label":"1) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В БУХГАЛТЕРСКИЙ БАЛАНС","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statements","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"title","value":"Активы","disabled":true,"field":"financial_statements_1","span":22},{"element":"input","value":"010","disabled":true,"field":"financial_statements_2","span":2},{"element":"input","value":"1. Оборотные активы","disabled":true,"field":"financial_statements_3","span":12},{"element":"input","disabled":false,"field":"financial_statements_4","span":5},{"element":"input","disabled":false,"field":"financial_statements_5","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statements_6","span":2},{"element":"input","value":"2. Внеоборотные активы","disabled":true,"field":"financial_statements_7","span":12},{"element":"input","disabled":false,"field":"financial_statements_8","span":5},{"element":"input","disabled":false,"field":"financial_statements_9","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statements_10","span":2},{"element":"input","value":"3. Долгосрочная дебиторская задолженность","disabled":true,"field":"financial_statements_11","span":12},{"element":"input","disabled":false,"field":"financial_statements_12","span":5},{"element":"input","disabled":false,"field":"financial_statements_13","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statements_14","span":2},{"element":"input","value":"4. Краткосрочная дебиторская задолженность","disabled":true,"field":"financial_statements_15","span":12},{"element":"input","disabled":false,"field":"financial_statements_16","span":5},{"element":"input","disabled":false,"field":"financial_statements_17","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statements_18","span":2},{"element":"input","value":"Итого активы (010+020+030+040)","disabled":true,"field":"financial_statements_19","span":12},{"element":"input","disabled":false,"field":"financial_statements_20","span":5},{"element":"input","disabled":false,"field":"financial_statements_21","span":5},{"element":"title","value":"Обязательства и капитал","disabled":true,"field":"financial_statements_22","span":22},{"element":"input","value":"060","disabled":true,"field":"financial_statements_23","span":2},{"element":"input","value":"1. Краткосрочные обязательства","disabled":true,"field":"financial_statements_25","span":12},{"element":"input","disabled":false,"field":"financial_statements_26","span":5},{"element":"input","disabled":false,"field":"financial_statements_27","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statements_28","span":2},{"element":"input","value":"2. Долгосрочные обязательства","disabled":true,"field":"financial_statements_29","span":12},{"element":"input","disabled":false,"field":"financial_statements_30","span":5},{"element":"input","disabled":false,"field":"financial_statements_31","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statements_32","span":2},{"element":"input","value":"Итого обязательства (060+070)","disabled":true,"field":"financial_statements_33","span":12},{"element":"input","disabled":false,"field":"financial_statements_34","span":5},{"element":"input","disabled":false,"field":"financial_statements_35","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statements_36","span":2},{"element":"input","value":"Собственный капитал","disabled":true,"field":"5_1_financial_statements_37","span":12},{"element":"input","disabled":false,"field":"financial_statements_38","span":5},{"element":"input","disabled":false,"field":"financial_statements_39","span":5},{"element":"input","value":"1. Уставный капитал","disabled":true,"field":"financial_statements_40","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_41","span":5},{"element":"input","disabled":false,"field":"financial_statements_42","span":5},{"element":"input","value":"2. Дополнительный оплаченный капитал","disabled":true,"field":"financial_statements_43","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_44","span":5},{"element":"input","disabled":false,"field":"financial_statements_45","span":5},{"element":"input","value":"3. Нераспределенная прибыль","disabled":true,"field":"financial_statements_46","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_47","span":5},{"element":"input","disabled":false,"field":"financial_statements_48","span":5},{"element":"input","value":"4. Резервный капитал","disabled":true,"field":"financial_statements_49","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_50","span":5},{"element":"input","disabled":false,"field":"financial_statements_51","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statements_52","span":2},{"element":"input","value":"Итого обязательства и собственный капитал (060+070+090)","disabled":true,"field":"financial_statements_53","span":12},{"element":"input","disabled":false,"field":"financial_statements_55","span":5},{"element":"input","disabled":false,"field":"financial_statements_56","span":5}]},{"label":"2) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ О ПРИБЫЛЯХ И УБЫТКАХ","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statements_2","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"input","value":"010","disabled":true,"field":"financial_statements_2_1","span":2},{"element":"input","value":"Валовая прибыль","disabled":true,"field":"financial_statements_2_2","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_3","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_4","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statements_2_5","span":2},{"element":"input","value":"Доходы и расходы от прочей операционной деятельности (доходы - расходы)","disabled":true,"field":"financial_statements_2_6","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_7","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_8","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statements_2_9","span":2},{"element":"input","value":"Операционные расходы","disabled":true,"field":"financial_statements_2_10","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_11","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_12","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statements_2_13","span":2},{"element":"input","value":"Прибыль/убыток от операционной деятельности (010+020-030)","disabled":true,"field":"financial_statements_2_14","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_15","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_16","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statements_2_17","span":2},{"element":"input","value":"Доходы и расходы от неоперационной деятельности","disabled":true,"field":"financial_statements_2_18","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_19","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_20","span":5},{"element":"input","value":"060","disabled":true,"field":"financial_statements_2_21","span":2},{"element":"input","value":"Прибыль (убыток) до вычета налогов (040+050)","disabled":true,"field":"financial_statements_2_22","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_23","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_24","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statements_2_25","span":2},{"element":"input","value":"Расходы по налогу на прибыль","disabled":true,"field":"financial_statements_2_26","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_27","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_28","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statements_2_29","span":2},{"element":"input","value":"Прибыль (убыток) от обычной деятельности (060-070)","disabled":true,"field":"financial_statements_2_30","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_31","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_32","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statements_2_33","span":2},{"element":"input","value":"Чрезвычайные статьи за минусом налога на прибыль","disabled":true,"field":"financial_statements_2_34","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_35","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_36","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statements_2_37","span":2},{"element":"input","value":"Чистая прибыль (убыток) отчетного периода (080+090)","disabled":true,"field":"financial_statements_2_38","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_39","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_40","span":5}]},{"label":"3) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ ОБ ИЗМЕНЕНИЯХ В КАПИТАЛЕ","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statement_3","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"input","value":"010","disabled":true,"field":"financial_statement_3_1","span":2},{"element":"input","value":"Сальдо на","disabled":false,"field":"financial_statement_3_2","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_3","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_4","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statement_3_5","span":2},{"element":"input","value":"Изменения в учетной политике и исправление существенных ошибок","disabled":true,"field":"financial_statement_3_6","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_7","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_8","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statement_3_9","span":2},{"element":"input","value":"Пересчитанное сальдо","disabled":true,"field":"financial_statement_3_10","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_11","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_12","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statement_3_13","span":2},{"element":"input","value":"Чистая прибыль или убытки, не признанные в отчете о прибылях и убытках","disabled":true,"field":"financial_statement_3_14","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_15","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_16","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statement_3_17","span":2},{"element":"input","value":"Чистая прибыль (убытки) за отчетный период","disabled":true,"field":"financial_statement_3_18","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_19","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_20","span":5},{"element":"input","value":"060","disabled":true,"field":"financial_statement_3_21","span":2},{"element":"input","value":"Дивиденды","disabled":true,"field":"financial_statement_3_22","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_23","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_24","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statement_3_25","span":2},{"element":"input","value":"Эмиссия акций","disabled":true,"field":"financial_statement_3_26","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_27","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_28","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statement_3_29","span":2},{"element":"input","value":"Ограничение прибыли к распределению","disabled":true,"field":"financial_statement_3_30","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_31","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_32","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statement_3_33","span":2},{"element":"input","value":"Изменение уставного капитала","disabled":true,"field":"financial_statement_3_34","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_35","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_36","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statement_3_37","span":2},{"element":"input","value":"Сальдо на ","disabled":false,"field":"financial_statement_3_38","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_39","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_40","span":5}]},{"label":"6. Сведения о направлении средств, привлеченных эмитентом в результате размещения эмиссионных ценных бумаг и ипотечных ценных бумаг, которые включают в себя: общий объем привлеченных средств, сведения о привлеченных средствах, использованных по каждому из направлений, и о направлениях использования привлеченных средств.","element":"textarea","field":"information_on_the_channelling_of_funds","required":false},{"label":"7. Заемные средства, полученные эмитентом и его дочерними обществами в отчетном периоде. Данный пункт отражает заемные средства, полученные эмитентом в отчетном периоде, и заемные средства, полученные дочерними обществами в отчетном периоде.","element":"textarea","field":"borrowings","required":false},{"label":"8. Сведения о долгосрочных и краткосрочных финансовых вложениях эмитента за отчетный период.","element":"textarea","field":"information_on_long-term","required":false},{"label":"9. Доходы по ценным бумагам эмитента. Эта информация представляется при начислении доходов по ценным бумагам эмитента в отчетном периоде или в квартале, предшествующем отчетному кварталу, и включает: вид ценной бумаги, размер доходов, начисленных на одну ценную бумагу,и общую сумму доходов, начисленных по ценным бумагам данного вида.","element":"textarea","field":"income_on_the_issuers_securities","required":false},{"label":"10. Информация об условиях и характере сделки, совершенной лицами, заинтересованными в совершении обществом сделки, включает: дату совершения сделки, информацию о влиянии сделки на деятельность эмитента (финансовый результат, дополнительные инвестиции и т.д.), информацию об условиях и характере заключенной сделки (предмет, условия, цена сделки и т.д.), степень имеющейся заинтересованности (лица, заинтересованного в сделке), дату опубликования информации о сделке в средствах массовой информации (прилагается копия опубликованного сообщения), а также дату направления уведомления с информацией о сделке в уполномоченный орган по регулированию рынка ценных бумаг.","element":"textarea","field":"information_on_the_terms_and_nature_of_the_transaction","required":false}],"label":"Приложение 2-1"},{"field":"prospect","element":"file","label":"Листинговый проспект"},{"field":"attachment_1","element":"file","label":"Приложение 1"},{"field":"attachment_2","element":"file","label":"Приложение 2"},{"field":"balance","element":"file","label":"Бухгалтерский Баланс"},{"field":"fin_rep","element":"file","label":"Отчет о финансовых результатах"},{"field":"cash_flow","element":"file","label":"Отчет о движении денежных средств"},{"field":"cap_rep","element":"file","label":"Отчет об изменениях в капитале"},{"field":"analytics","element":"file","label":"Сведения о соблюдении экономических нормативов"},{"field":"auditreport","element":"file","label":"Аудиторское заключение"},{"field":"corporate","element":"file","label":"Кодекс корпоративного управления"}]}]
1	[{"label":"Период отчета","element":"select","field":"period","options":[{"value":1,"label":"1 квартал"},{"value":2,"label":"2 квартал"},{"value":3,"label":"3 квартал"},{"value":4,"label":"4 квартал"},{"value":5,"label":"Годовой отчет"}],"required":true},{"label":"Год","element":"select","field":"year","options":[{"value":2024,"label":"2024 год"},{"value":2023,"label":"2023 год"},{"value":2022,"label":"2022 год"},{"value":2021,"label":"2021 год"}],"required":true},{"label":"Данные, включаемые в краткий годовой и ежеквартальный отчет для публикации в средствах массовой информации","element":"title","type":"default","level":5},{"label":"1. Данные об эмитенте","element":"title","type":"secondary","level":5},{"label":"Полное и сокращенное наименование эмитента","element":"input","field":"issuer_data_full_name","required":false},{"label":"Организационно-правовая форма","element":"input","field":"issuer_data_org_legal","required":false},{"label":"Юридический и почтовый адрес эмитента, номер телефона и факс","element":"input","field":"issuer_data_legal_info","required":false},{"label":"Основной вид деятельности эмитента","element":"input","field":"issuer_data_main_activity","required":false},{"label":"2. Количество владельцев ценных бумаг и работников эмитента","element":"title","type":"secondary","level":5},{"label":"Количество владельцев","element":"input","field":"amount_owners","required":false},{"label":"Количество работников","element":"input","field":"amount_workers","required":false},{"label":"3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала","element":"title","type":"secondary","level":5},{"element":"list","dynamic":true,"required":false,"field":"list_of_legal_entities","headers":[{"title":"Наименование юридического лица","span":5},{"title":"Организационно-правовая форма","span":5},{"title":"Местонахождение, почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО","span":8},{"title":"Доля участия в уставном капитале","span":5}],"lists":[{"field":"list_of_legal_entities_1","span":5},{"field":"list_of_legal_entities_2","span":5},{"field":"list_of_legal_entities_3","span":8},{"field":"list_of_legal_entities_4","span":5}]},{"label":"4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде","element":"title","type":"secondary","level":5},{"element":"list","dynamic":true,"required":false,"field":"information_about_material_facts","headers":[{"title":"Наименование факта","span":5},{"title":"Дата появления факта","span":5},{"title":"Влиянии факта на деятельность","span":8},{"title":"Дата и форма раскрытия","span":5}],"lists":[{"field":"information_about_material_facts_1","span":5},{"field":"information_about_material_facts_2","span":5},{"field":"information_about_material_facts_3","span":8},{"field":"information_about_material_facts_4","span":5}]},{"label":"5. Финансовая отчетность эмитента за отчетный период","element":"title","type":"secondary","level":5},{"label":"1) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В БУХГАЛТЕРСКИЙ БАЛАНС","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statements","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"title","value":"Активы","disabled":true,"field":"financial_statements_1","span":22},{"element":"input","value":"010","disabled":true,"field":"financial_statements_2","span":2},{"element":"input","value":"1. Оборотные активы","disabled":true,"field":"financial_statements_3","span":12},{"element":"input","disabled":false,"field":"financial_statements_4","span":5},{"element":"input","disabled":false,"field":"financial_statements_5","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statements_6","span":2},{"element":"input","value":"2. Внеоборотные активы","disabled":true,"field":"financial_statements_7","span":12},{"element":"input","disabled":false,"field":"financial_statements_8","span":5},{"element":"input","disabled":false,"field":"financial_statements_9","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statements_10","span":2},{"element":"input","value":"3. Долгосрочная дебиторская задолженность","disabled":true,"field":"financial_statements_11","span":12},{"element":"input","disabled":false,"field":"financial_statements_12","span":5},{"element":"input","disabled":false,"field":"financial_statements_13","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statements_14","span":2},{"element":"input","value":"4. Краткосрочная дебиторская задолженность","disabled":true,"field":"financial_statements_15","span":12},{"element":"input","disabled":false,"field":"financial_statements_16","span":5},{"element":"input","disabled":false,"field":"financial_statements_17","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statements_18","span":2},{"element":"input","value":"Итого активы (010+020+030+040)","disabled":true,"field":"financial_statements_19","span":12},{"element":"input","disabled":false,"field":"financial_statements_20","span":5},{"element":"input","disabled":false,"field":"financial_statements_21","span":5},{"element":"title","value":"Обязательства и капитал","disabled":true,"field":"financial_statements_22","span":22},{"element":"input","value":"060","disabled":true,"field":"financial_statements_23","span":2},{"element":"input","value":"1. Краткосрочные обязательства","disabled":true,"field":"financial_statements_25","span":12},{"element":"input","disabled":false,"field":"financial_statements_26","span":5},{"element":"input","disabled":false,"field":"financial_statements_27","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statements_28","span":2},{"element":"input","value":"2. Долгосрочные обязательства","disabled":true,"field":"financial_statements_29","span":12},{"element":"input","disabled":false,"field":"financial_statements_30","span":5},{"element":"input","disabled":false,"field":"financial_statements_31","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statements_32","span":2},{"element":"input","value":"Итого обязательства (060+070)","disabled":true,"field":"financial_statements_33","span":12},{"element":"input","disabled":false,"field":"financial_statements_34","span":5},{"element":"input","disabled":false,"field":"financial_statements_35","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statements_36","span":2},{"element":"input","value":"Собственный капитал","disabled":true,"field":"5_1_financial_statements_37","span":12},{"element":"input","disabled":false,"field":"financial_statements_38","span":5},{"element":"input","disabled":false,"field":"financial_statements_39","span":5},{"element":"input","value":"1. Уставный капитал","disabled":true,"field":"financial_statements_40","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_41","span":5},{"element":"input","disabled":false,"field":"financial_statements_42","span":5},{"element":"input","value":"2. Дополнительный оплаченный капитал","disabled":true,"field":"financial_statements_43","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_44","span":5},{"element":"input","disabled":false,"field":"financial_statements_45","span":5},{"element":"input","value":"3. Нераспределенная прибыль","disabled":true,"field":"financial_statements_46","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_47","span":5},{"element":"input","disabled":false,"field":"financial_statements_48","span":5},{"element":"input","value":"4. Резервный капитал","disabled":true,"field":"financial_statements_49","span":12,"offset":2},{"element":"input","disabled":false,"field":"financial_statements_50","span":5},{"element":"input","disabled":false,"field":"financial_statements_51","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statements_52","span":2},{"element":"input","value":"Итого обязательства и собственный капитал (060+070+090)","disabled":true,"field":"financial_statements_53","span":12},{"element":"input","disabled":false,"field":"financial_statements_55","span":5},{"element":"input","disabled":false,"field":"financial_statements_56","span":5}]},{"label":"2) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ О ПРИБЫЛЯХ И УБЫТКАХ","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statements_2","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"input","value":"010","disabled":true,"field":"financial_statements_2_1","span":2},{"element":"input","value":"Валовая прибыль","disabled":true,"field":"financial_statements_2_2","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_3","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_4","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statements_2_5","span":2},{"element":"input","value":"Доходы и расходы от прочей операционной деятельности (доходы - расходы)","disabled":true,"field":"financial_statements_2_6","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_7","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_8","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statements_2_9","span":2},{"element":"input","value":"Операционные расходы","disabled":true,"field":"financial_statements_2_10","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_11","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_12","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statements_2_13","span":2},{"element":"input","value":"Прибыль/убыток от операционной деятельности (010+020-030)","disabled":true,"field":"financial_statements_2_14","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_15","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_16","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statements_2_17","span":2},{"element":"input","value":"Доходы и расходы от неоперационной деятельности","disabled":true,"field":"financial_statements_2_18","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_19","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_20","span":5},{"element":"input","value":"060","disabled":true,"field":"financial_statements_2_21","span":2},{"element":"input","value":"Прибыль (убыток) до вычета налогов (040+050)","disabled":true,"field":"financial_statements_2_22","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_23","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_24","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statements_2_25","span":2},{"element":"input","value":"Расходы по налогу на прибыль","disabled":true,"field":"financial_statements_2_26","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_27","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_28","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statements_2_29","span":2},{"element":"input","value":"Прибыль (убыток) от обычной деятельности (060-070)","disabled":true,"field":"financial_statements_2_30","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_31","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_32","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statements_2_33","span":2},{"element":"input","value":"Чрезвычайные статьи за минусом налога на прибыль","disabled":true,"field":"financial_statements_2_34","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_35","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_36","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statements_2_37","span":2},{"element":"input","value":"Чистая прибыль (убыток) отчетного периода (080+090)","disabled":true,"field":"financial_statements_2_38","span":12},{"element":"input","disabled":false,"field":"financial_statements_2_39","span":5},{"element":"input","disabled":false,"field":"financial_statements_2_40","span":5}]},{"label":"3) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ ОБ ИЗМЕНЕНИЯХ В КАПИТАЛЕ","element":"text","type":"secondary","level":5},{"element":"rows","field":"financial_statement_3","headers":[{"title":"Код строк","span":2},{"title":"","span":12},{"title":"На начало отчетного периода","span":5},{"title":"На конец отчетного периода","span":5}],"lists":[{"element":"input","value":"010","disabled":true,"field":"financial_statement_3_1","span":2},{"element":"input","value":"Сальдо на","disabled":false,"field":"financial_statement_3_2","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_3","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_4","span":5},{"element":"input","value":"020","disabled":true,"field":"financial_statement_3_5","span":2},{"element":"input","value":"Изменения в учетной политике и исправление существенных ошибок","disabled":true,"field":"financial_statement_3_6","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_7","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_8","span":5},{"element":"input","value":"030","disabled":true,"field":"financial_statement_3_9","span":2},{"element":"input","value":"Пересчитанное сальдо","disabled":true,"field":"financial_statement_3_10","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_11","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_12","span":5},{"element":"input","value":"040","disabled":true,"field":"financial_statement_3_13","span":2},{"element":"input","value":"Чистая прибыль или убытки, не признанные в отчете о прибылях и убытках","disabled":true,"field":"financial_statement_3_14","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_15","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_16","span":5},{"element":"input","value":"050","disabled":true,"field":"financial_statement_3_17","span":2},{"element":"input","value":"Чистая прибыль (убытки) за отчетный период","disabled":true,"field":"financial_statement_3_18","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_19","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_20","span":5},{"element":"input","value":"060","disabled":true,"field":"financial_statement_3_21","span":2},{"element":"input","value":"Дивиденды","disabled":true,"field":"financial_statement_3_22","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_23","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_24","span":5},{"element":"input","value":"070","disabled":true,"field":"financial_statement_3_25","span":2},{"element":"input","value":"Эмиссия акций","disabled":true,"field":"financial_statement_3_26","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_27","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_28","span":5},{"element":"input","value":"080","disabled":true,"field":"financial_statement_3_29","span":2},{"element":"input","value":"Ограничение прибыли к распределению","disabled":true,"field":"financial_statement_3_30","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_31","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_32","span":5},{"element":"input","value":"090","disabled":true,"field":"financial_statement_3_33","span":2},{"element":"input","value":"Изменение уставного капитала","disabled":true,"field":"financial_statement_3_34","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_35","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_36","span":5},{"element":"input","value":"100","disabled":true,"field":"financial_statement_3_37","span":2},{"element":"input","value":"Сальдо на ","disabled":false,"field":"financial_statement_3_38","span":12},{"element":"input","disabled":false,"field":"financial_statement_3_39","span":5},{"element":"input","disabled":false,"field":"financial_statement_3_40","span":5}]},{"label":"6. Сведения о направлении средств, привлеченных эмитентом в результате размещения эмиссионных ценных бумаг и ипотечных ценных бумаг, которые включают в себя: общий объем привлеченных средств, сведения о привлеченных средствах, использованных по каждому из направлений, и о направлениях использования привлеченных средств.","element":"textarea","field":"information_on_the_channelling_of_funds","required":false},{"label":"7. Заемные средства, полученные эмитентом и его дочерними обществами в отчетном периоде. Данный пункт отражает заемные средства, полученные эмитентом в отчетном периоде, и заемные средства, полученные дочерними обществами в отчетном периоде.","element":"textarea","field":"borrowings","required":false},{"label":"8. Сведения о долгосрочных и краткосрочных финансовых вложениях эмитента за отчетный период.","element":"textarea","field":"information_on_long-term","required":false},{"label":"9. Доходы по ценным бумагам эмитента. Эта информация представляется при начислении доходов по ценным бумагам эмитента в отчетном периоде или в квартале, предшествующем отчетному кварталу, и включает: вид ценной бумаги, размер доходов, начисленных на одну ценную бумагу,и общую сумму доходов, начисленных по ценным бумагам данного вида.","element":"textarea","field":"income_on_the_issuers_securities","required":false},{"label":"10. Информация об условиях и характере сделки, совершенной лицами, заинтересованными в совершении обществом сделки, включает: дату совершения сделки, информацию о влиянии сделки на деятельность эмитента (финансовый результат, дополнительные инвестиции и т.д.), информацию об условиях и характере заключенной сделки (предмет, условия, цена сделки и т.д.), степень имеющейся заинтересованности (лица, заинтересованного в сделке), дату опубликования информации о сделке в средствах массовой информации (прилагается копия опубликованного сообщения), а также дату направления уведомления с информацией о сделке в уполномоченный орган по регулированию рынка ценных бумаг.","element":"textarea","field":"information_on_the_terms_and_nature_of_the_transaction","required":false}]
3	[{"label":"Орган управления, в котором произошли изменения","element":"textarea","field":"government_been_changes","required":false},{"label":"ФИО каждого лица, полномочия которого прекращены","element":"textarea","field":"person_powers_terminated","required":false},{"label":"Доля участия лица в уставном капитале эмитента","element":"textarea","field":"authorized_capital_issuer_1","required":false},{"label":"ФИО каждого лица, избранного (назначенного) в орган управления эмитента","element":"textarea","field":"person_elected_issuer_management","required":false},{"label":"Доля участия лица в уставном капитале эмитента","element":"textarea","field":"authorized_capital_issuer_2","required":false},{"label":"Уполномоченный орган эмитента, принявший решение, являющееся основанием указанных изменений и дата его принятия","element":"textarea","field":"authorized_body_issuer","required":false},{"label":"Иные обстоятельства, повлекшие указанные изменения","element":"textarea","field":"other_circumstances_changes","required":false}]
4	[{"label":"Фамилия, имя, отчество","element":"textarea","field":"full_name","required":false},{"label":"Должность лица","element":"textarea","field":"position","required":false},{"label":"Наименование эмитента, его дочерних и зависимых обществ, в которых произошло изменение доли участия лица","element":"textarea","field":"issuer_name","required":false},{"label":"Доля в уставном капитале до изменения","element":"textarea","field":"authorized_capital_before_change","required":false},{"label":"Доля в уставном капитале после изменения","element":"textarea","field":"authorized_capital_after_change","required":false},{"label":"Дата, с которой произошло изменение доли","element":"textarea","field":"date_from_share_change","required":false}]
5	[{"label":"Фамилия, имя, отчество","element":"textarea","field":"full_name","required":false},{"label":"Доля в уставном капитале до изменения (в случае акций раздельно простых и привилегированных)","element":"title","type":"default","level":5},{"label":"Количество принадлежащих ценных бумаг","element":"input","field":"number_securities_held_1","required":false},{"label":"В процентах от уставного капитала","element":"input","field":"percentage_authorized_capital_1","required":false},{"label":"В денежном выражении","element":"input","field":"terms_money_1","required":false},{"label":"Доля в уставном капитале после изменения (в случае акций раздельно простых и привилегированных)","element":"title","type":"default","level":5},{"label":"Количество принадлежащих ценных бумаг","element":"input","field":"number_securities_held_2","required":false},{"label":"В процентах от уставного капитала","element":"input","field":"percentage_authorized_capital_2","required":false},{"label":"В денежном выражении","element":"input","field":"terms_money_2","required":false},{"label":"Дата, с которой произошли изменения доли участия в уставном капитале (доли ценных бумаг)","element":"textarea","field":"date_from_change_authorized_capital","required":false}]
6	[{"label":"Полное наименование, местонахождение, почтовый адрес, код ОКПО юридического лица","element":"textarea","field":"full_info","required":false},{"label":"Доля в уставном капитале до изменения (в случае акций раздельно простых и привилегированных)","element":"title","type":"default","level":5},{"label":"Количество принадлежащих ценных бумаг","element":"input","field":"number_securities_held_1","required":false},{"label":"В процентах от уставного капитала","element":"input","field":"percentage_authorized_capital_1","required":false},{"label":"В денежном выражении","element":"input","field":"terms_money_1","required":false},{"label":"Доля в уставном капитале после изменения (в случае акций раздельно простых и привилегированных)","element":"title","type":"default","level":5},{"label":"Количество принадлежащих ценных бумаг","element":"input","field":"number_securities_held_2","required":false},{"label":"В процентах от уставного капитала","element":"input","field":"percentage_authorized_capital_2","required":false},{"label":"В денежном выражении","element":"input","field":"terms_money_2","required":false},{"label":"Дата, с которой произошли изменения доли участия в уставном капитале (доли ценных бумаг)","element":"textarea","field":"date_from_change_authorized_capital","required":false}]
7	[{"label":"Полное наименование, а также местонахождение, почтовый адрес, код ОКПО юридического лица, доля участия в уставном капитале (доля ценных бумаг) которого, принадлежащая эмитенту, изменилась","element":"textarea","field":"full_info","required":false},{"label":"Доля эмитента в уставном капитале (доля ценных бумаг) юридического лица до ее изменения","element":"textarea","field":"issuer_authorized_capital_before","required":false},{"label":"Доля эмитента в уставном капитале (доля ценных бумаг) юридического лица после ее изменения","element":"textarea","field":"issuer_authorized_capital_after","required":false},{"label":"Дата, с которой произошло изменение доли в уставном капитале (доли ценных бумаг)","element":"textarea","field":"date_from_share_change","required":false}]
9	[{"label":"Полное наименование, местонахождение и почтовый адрес, код ОКПО юридического лица, приобретшего долю","element":"textarea","field":"full_info","required":false},{"label":"Вид ценной бумаги","element":"textarea","field":"type_security","required":false},{"label":"Доля в процентах","element":"textarea","field":"percentage_share","required":false},{"label":"Дата, с которой произошли указанные изменения","element":"textarea","field":"date_from_said_changes","required":false}]
10	[{"label":"Фамилия, имя, отчество или полное наименование, местонахождение и почтовый адрес контрагента по сделке (сделкам)","element":"textarea","field":"full_info","required":false},{"label":"Описание сделки (сделок)","element":"textarea","field":"deal_description","required":false},{"label":"Дата совершения сделки (сделок)","element":"textarea","field":"date_transaction","required":false}]
11	[{"label":"Фамилия, имя, отчество или полное наименование, местонахождение и почтовый адрес стороны договора или иного документа","element":"textarea","field":"full_info","required":false},{"label":"Описание недвижимого имущества","element":"textarea","field":"description_real_estate","required":false},{"label":"Описание договора","element":"textarea","field":"description_contract","required":false},{"label":"Дата совершения договора","element":"textarea","field":"date_contract","required":false}]
12	[{"label":"Наименование факта (фактов)","element":"textarea","field":"name_fact","required":false},{"label":"Дата появления факта (фактов)","element":"textarea","field":"date_occurrence_fact","required":false},{"label":"Величина активов эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)","element":"textarea","field":"issuer_end_quarter","required":false},{"label":"Изменение величины активов эмитента в абсолютном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"absolute_ratio_month","required":false},{"label":"Изменение величины активов эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"percentage_per_month","required":false}]
13	[{"label":"Наименование факта (фактов)","element":"textarea","field":"name_fact","required":false},{"label":"Дата появления факта (фактов)","element":"textarea","field":"date_occurrence_fact","required":false},{"label":"Значение прибыли эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)","element":"textarea","field":"issuer_value_profit_end_quarter","required":false},{"label":"Изменение прибыли эмитента в абсолютном соотношении в месяце, в котором произошел существенный факт по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"absolute_profit_ratio_month","required":false},{"label":"Изменение убытков эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"percentage_loss_per_month","required":false}]
14	[{"label":"Наименование факта (фактов)","element":"textarea","field":"name_fact","required":false},{"label":"Дата появления факта (фактов)","element":"textarea","field":"date_occurrence_fact","required":false},{"label":"Значение убытков эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)","element":"textarea","field":"issuer_value_profit_end_quarter","required":false},{"label":"Изменение прибыли эмитента в абсолютном соотношении в месяце, в котором произошел существенный факт по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"absolute_profit_ratio_month","required":false},{"label":"Изменение убытков активов эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт","element":"textarea","field":"percentage_loss_per_month","required":false}]
15	[{"label":"Дата принятия решения о выплате дивидендов","element":"textarea","field":"date_confirm","required":false},{"label":"Размер дивиденда на 1 ценную бумагу (сом)","element":"textarea","field":"dividend_amount","required":false},{"label":"Форма выплаты","element":"textarea","field":"payment_form","required":false},{"label":"Место выплаты","element":"textarea","field":"place_payment","required":false},{"label":"Дата выплаты","element":"textarea","field":"payment_date","required":false},{"label":"Дата регистрации акционеров, имеющих право на получение дивидендов","element":"textarea","field":"date_registration_shareholders","required":false}]
16	[{"label":"Период выплаты дивидендов","element":"textarea","field":"dividend_payment_period","required":false},{"label":"Количество акционеров, имеющих право на получение дивидендов","element":"textarea","field":"number_shareholders_receive_dividends","required":false},{"label":"Общая сумма начисленных дивидендов (сом)","element":"textarea","field":"total_amount_accrued_dividends","required":false},{"label":"Количество акционеров, получивших дивиденды","element":"textarea","field":"number_shareholders_who_received_dividends","required":false},{"label":"Общая сумма выплаченных дивидендов (сом)","element":"textarea","field":"total_amount_dividends_paid","required":false},{"label":"Количество акционеров, которым не выплачены дивиденды","element":"textarea","field":"number_shareholders_not_paid_dividends","required":false},{"label":"Общая сумма не выплаченных дивидендов (сом)","element":"textarea","field":"total_unpaid_dividends","required":false},{"label":"Количество ценных бумаг, по которым не выплачены дивиденды","element":"textarea","field":"number_securities_dividends_not_paid","required":false},{"label":"Причина невыплаты","element":"textarea","field":"reason_non_payment","required":false}]
17	[{"label":"Номер выпуска","element":"textarea","field":"issue_number","required":false},{"label":"Ставка доходности","element":"textarea","field":"rate_return","required":false},{"label":"Номинальная стоимость облигации","element":"textarea","field":"par_value_bond","required":false},{"label":"Дата начала выплаты дохода","element":"textarea","field":"start_date_income_payment","required":false},{"label":"Дата составления списка владельцев ценных бумаг для получения дохода","element":"textarea","field":"date_compilation_list","required":false},{"label":"Форма выплаты","element":"textarea","field":"payment_form","required":false},{"label":"Место выплаты","element":"textarea","field":"payment_place","required":false}]
18	[{"label":"Номер выпуска","element":"textarea","field":"issue_number","required":false},{"label":"Количество владельцев облигаций, имеющих право на получение дохода","element":"textarea","field":"number_bond_holders","required":false},{"label":"Сумма начисленных доходов (сом)","element":"textarea","field":"amount_accrued_income","required":false},{"label":"Количество владельцев облигаций, получивших доходы","element":"textarea","field":"number_bond_holders_received_income","required":false},{"label":"Сумма выплаченного дохода по облигациям (сом)","element":"textarea","field":"amount_bond_yield_paid","required":false},{"label":"Количество владельцев облигаций, которым не выплачены доходы","element":"textarea","field":"number_bond_holders_not_paid","required":false},{"label":"Сумма невыплаченного дохода по облигациям (сом)","element":"textarea","field":"amount_bond_yield_not_paid","required":false},{"label":"Количество облигаций, по которым не выплачены доходы","element":"textarea","field":"number_bond_not_paid","required":false},{"label":"Причина невыплаты","element":"textarea","field":"reason_non_payment","required":false}]
19	[{"label":"Дата проведения общего собрания","element":"textarea","field":"date_general_meeting","required":false},{"label":"Вид общего собрания (годовое, внеочередное)","element":"textarea","field":"type_general_meeting","required":false},{"label":"Форма проведения общего собрания","element":"textarea","field":"form_general_meeting","required":false},{"label":"Место проведения общего собрания","element":"textarea","field":"place_general_meeting","required":false},{"label":"Кворум общего собрания","element":"textarea","field":"quorum_general_meeting","required":false},{"label":"Вопросы, поставленные на голосование, итоги голосования и принятые решения","element":"textarea","field":"issues_voting_decisions_taken","required":false}]
20	[{"label":"Основание погашения (аннулирования)","element":"textarea","field":"basis_redemption","required":false},{"label":"Решение об уменьшении уставного капитала путем погашения акций, конвертации, погашения облигаций","element":"textarea","field":"reduction_authorized_capital","required":false},{"label":"Вид, категория, форма, серия, государственный регистрационный номер выпуска, ценные бумаги которого погашаются","element":"textarea","field":"kind_category_form_series","required":false},{"label":"Цена размещения каждой ценной бумаги данного вида (категории); серии, количество ценных бумаг данного вида (категории), серии; количество погашенных ценных бумаг","element":"textarea","field":"placement_price_each_security","required":false},{"label":"В случае погашения (в том числе досрочного) облигаций: срок (дата начала, дата окончания) обращения погашенных облигаций; порядок, условия, срок (дата начала и дата окончания) досрочного погашения облигаций (если досрочное погашение предусмотрено решением о выпуске облигаций); порядок, условия, срок (дата начала и дата окончания) погашения облигаций","element":"textarea","field":"case_redemption","required":false}]
21	[{"label":"Наименование публичной компании","element":"textarea","field":"name_public_company","required":false},{"label":"Юридический адрес","element":"textarea","field":"org_address","required":false},{"label":"Вид ценных бумаг, торговля которыми осуществляется на фондовой бирже","element":"textarea","field":"type_securities","required":false},{"label":"Дата рассмотрения вопроса о выходе из статуса публичной компании","element":"textarea","field":"date_consideration_issue","required":false}]
22	[{"label":"Адрес компании","element":"textarea","field":"company_address","required":false},{"label":"Дата и номер государственной регистрации выпуска","element":"textarea","field":"date_and_number_org_reg","required":false},{"label":"Дата начала размещения","element":"textarea","field":"start_date_accommodation","required":false},{"label":"Количество облигаций выпуска","element":"textarea","field":"number_bonds_issue","required":false},{"label":"Цена размещения 1 (одной) облигации","element":"textarea","field":"price_accommodation","required":false},{"label":"Общая сумма эмиссии","element":"textarea","field":"total_amount_emissions","required":false},{"label":"Доходность облигации","element":"textarea","field":"bond_yield","required":false},{"label":"Срок обращения","element":"textarea","field":"term_circulation","required":false},{"label":"Порядок размещения","element":"textarea","field":"placement_order","required":false},{"label":"Порядок выплаты процентного дохода","element":"textarea","field":"procedure_payment_interest","required":false},{"label":"Дата погашения","element":"textarea","field":"maturity_date","required":false},{"label":"Дополнительная информация","element":"textarea","field":"additional_information","required":false}]
\.


--
-- TOC entry 3724 (class 0 OID 24478)
-- Dependencies: 220
-- Data for Name: report_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_types (id, title, "groupId", "tempId") FROM stdin;
1	Приложение 2-1	1	1
20	Начисленные доходы по облигациям	2	17
2	Отчет листинговых компаний	1	2
3	Изменение в составе Исполнительного органа	2	3
4	Изменение в составе Совета Директоров	2	3
5	Изменение размера участия члена Исполнительного органа в уставном капитале компаний	2	4
6	Изменение размера участия члена Совета Директоров в уставном капитале компаний	2	4
7	Изменение в списке владельцев ценных бумаг (физических лиц)	2	5
8	Изменение в списке владельцев ценных бумаг (юридических лиц)	2	6
9	Изменение в списке юридических лиц, в которых эмитент владеет 20 и более процентами уставного капитала	2	7
10	Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг (физическое лицо)	2	8
11	Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг (юридическое лицо)	2	9
12	Разовые сделки эмитента, размер которых, либо стоимость имущества по которым составляет 10 и более процентов от активов эмитента на дату сделки	2	10
13	Факт заключение договора или иного документа и/или или факт государственной регистрации такого договора, предметом которого является приобретение, получение или передача во временное пользование свыше одного года, либо отчуждение недвижимого имущества, независимо от площади недвижимого имущества	2	11
14	Факт, повлекший разовое увеличение стоимости активов более чем на 10 процентов	2	12
15	Факт, повлекший разовое уменьшение стоимости активов более чем на 10 процентов	2	12
16	Факт, повлекший разовое увеличение чистой прибыли более чем на 10 процентов	2	13
17	Факт, повлекший разовое увеличение чистых убытков более чем на 10 процентов	2	14
18	Начисленные доходы по ценным бумагам (дивиденды)	2	15
19	Выплаченные доходы по ценным бумагам (дивиденды)	2	16
21	Выплаченные доходы по облигациям	2	18
22	Решения, принятые общим собранием акционеров	2	19
23	Погашение ценных бумаг эмитента	2	20
24	Выход эмитента из статуса публичной компании	2	21
25	Добровольная ликвидация	2	21
26	Размещение облигаций	2	22
\.


--
-- TOC entry 3740 (class 0 OID 25193)
-- Dependencies: 236
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, "typeId", "statusId", content, send_date, confirm_date, "userId", "companyId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3732 (class 0 OID 24818)
-- Dependencies: 228
-- Data for Name: role_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_users (id, "roleId", "userId") FROM stdin;
1	3	18
2	3	109
3	3	163
4	3	215
5	3	197
6	3	31
7	3	149
8	3	97
9	3	143
10	3	115
11	3	177
12	3	27
13	3	190
14	3	173
15	3	175
16	3	129
17	3	93
18	3	23
19	3	145
20	3	127
21	3	182
22	3	91
23	3	19
24	3	20
25	3	13
26	3	11
27	3	28
28	3	16
29	3	89
30	3	95
31	3	139
32	3	151
33	3	74
34	3	186
35	3	39
36	3	153
37	3	121
38	3	113
39	3	101
40	3	103
41	3	35
42	3	105
43	3	141
44	3	117
45	3	15
46	3	178
47	3	191
48	3	188
49	3	87
50	3	107
51	3	12
52	3	26
53	3	32
54	3	156
55	3	216
56	3	136
57	3	135
58	3	112
59	3	10
60	3	165
61	3	167
62	3	98
63	3	67
64	3	155
65	3	64
66	3	146
67	3	170
68	3	90
69	3	46
70	3	192
71	3	162
72	3	44
73	3	58
74	3	53
75	3	43
76	3	60
77	3	61
79	3	69
80	3	120
81	3	7
82	3	49
83	3	96
84	3	104
85	3	122
86	3	126
87	3	140
88	3	144
89	3	152
90	3	147
91	3	33
92	3	34
93	3	36
94	3	166
95	3	47
96	3	8
97	3	38
98	3	6
99	3	56
100	3	92
101	3	68
102	3	106
103	3	40
104	3	187
105	3	59
106	3	183
107	3	161
108	3	137
109	3	111
110	3	119
111	3	169
112	3	123
113	3	17
114	3	125
115	3	131
116	3	99
117	3	42
118	3	1
119	3	45
120	3	5
121	3	54
122	3	158
123	3	171
124	3	118
125	3	65
126	3	88
127	3	3
128	3	94
129	3	102
130	3	108
131	3	114
132	3	116
133	3	134
134	3	142
135	3	148
136	3	150
137	3	168
138	3	9
139	3	51
140	3	172
141	3	48
142	3	57
143	3	55
144	3	128
145	3	176
146	3	37
147	3	52
148	3	195
149	3	29
150	3	30
151	3	2
152	3	14
153	3	41
154	3	66
155	3	174
156	3	154
157	3	138
158	3	100
159	3	164
160	3	124
161	3	130
162	3	160
163	3	21
164	3	110
165	3	132
167	3	70
168	3	217
169	3	189
170	3	218
171	3	22
172	3	159
173	3	199
174	3	198
175	3	196
176	3	212
177	3	204
178	3	213
179	3	205
180	3	201
181	3	211
182	3	157
183	3	219
184	3	71
185	3	210
186	3	202
187	3	206
188	3	207
189	3	208
190	3	209
191	3	25
166	1	50
192	3	251
193	2	252
\.


--
-- TOC entry 3726 (class 0 OID 24592)
-- Dependencies: 222
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, title, description) FROM stdin;
1	ADMIN	Администратор
2	MODERATOR	Модератор
3	USER	Пользователь
\.


--
-- TOC entry 3734 (class 0 OID 24839)
-- Dependencies: 230
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", "refreshToken") FROM stdin;
150	50	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUwLCJjb21wYW55SWQiOjIsInJvbGVzIjpbeyJpZCI6MSwidGl0bGUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJSb2xlVXNlcnMiOnsiaWQiOjE2Niwicm9sZUlkIjoxLCJ1c2VySWQiOjUwfX1dLCJpYXQiOjE2OTcwODU4NDcsImV4cCI6MTY5OTY3Nzg0N30.iguxmcaQqhkfI40WKB0HYCQzSSVweFb12SByT4F3ijY
\.


--
-- TOC entry 3714 (class 0 OID 23964)
-- Dependencies: 210
-- Data for Name: user_temp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_temp (id, title, form_type, template) FROM stdin;
3	Профиль пользователя	profile	[{"label":"Имя","element":"input","field":"firstName","value":""},{"label":"Фамилия","element":"input","field":"lastName","value":""},{"label":"ИНН","element":"input","field":"inn","value":""}]
1	Добавить нового пользователя	add	[{"label":"Компания","element":"select","field":"companyId","value":""},{"label":"Имя","element":"input","field":"firstName","value":""},{"label":"Фамилия","element":"input","field":"lastName","value":""},{"label":"ИНН","element":"input","field":"inn","value":""},{"label":"Логин","element":"input","field":"login","value":""},{"label":"Пароль","element":"input","field":"password","value":""},{"label":"Укажите роль","element":"select","field":"roleId","value":""}]\n
2	Обновить данные пользователя	upd	[{"label":"Компания","element":"select","field":"companyId","value":""},{"label":"Имя","element":"input","field":"firstName","value":""},{"label":"Фамилия","element":"input","field":"lastName","value":""},{"label":"ИНН","element":"input","field":"inn","value":""},{"label":"Укажите роль","element":"select","field":"roleId","value":""}]
\.


--
-- TOC entry 3730 (class 0 OID 24773)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, password, "companyId", "firstName", "lastName", inn, "createdAt", "updatedAt") FROM stdin;
109	IHORIKS	$2b$10$EqSeERs/Dmc0Sg6b3r3IGuTo5G/UPIptdpgFTD7btSnBOke2R8jFi	123	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
163	OAOKTKOM	$2b$10$I51.oIGyj1KWbIvv73zHR.0OSqzJVDDvGTIzHP62y8wfW8zFMYxWq	177	\N	\N	22412197000015	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
215	ASHARDEV	$2b$10$fTixiq8sxwKV4rSnntIWF.9gbIKW3B5FAXA59H4tTVqpr4m2oULfa	236	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
31	ZVDAINUR	$2b$10$YOrt3FUTZm305r0rXFbyAuTroTAb0OZOHVeaU6EbfOERt2QpfeUEG	39	\N	\N	20105197700806	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
149	RPORMTR	$2b$10$rmyNBLjyyRIYC/SGxEzRIeod9RtYOtWinBSjgx90yy1VWNKW9YTYS	163	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
97	KETZAVOD	$2b$10$NkREB1jpZDWGFDBTtUlWAeE/JlDWDGKFptqE97bcpQNggHhTmNg9i	111	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
143	OAOCHUI	$2b$10$8y0kuI7Vp5efvhPru0Hlf.XZPJWNDUNPaPwqELkumNMtA2Tgq4MeK	157	\N	\N	22210197900026	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
177	BTUSHUM	$2b$10$8NRq0euhT7Av0nbv0njEqO4bmXb8mAWoBXw3OPE4mvP2tVxoSXQua	190	\N	\N	12702198300754	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
27	KANTTIPG	$2b$10$ltqzBQowrHiDa77MD9ByOuoNe4W7BLXMrpPpUsCbIrmv5hH4nn0qu	37	\N	\N	22811199600610	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
190	OAOGSO	$2b$10$DtSH7MjOSTKnVuCiRqK.1OqMd/uGEPkqrbwVjJCLo3GuCJ6gEgL8G	200	\N	\N	12005198700460	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
173	CAPATP	$2b$10$hn1atK5vkDQl8uVQKHmHgOzPwHoJcWFEzmz3ph229NDGELVHxsm2.	186	\N	\N	20501195600818	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
175	KAMIMOT	$2b$10$S/lDJaHWCotMAV2WaDJIeuVmngs8g/9N91xJo3UBKgayoz5XlrDUG	188	\N	\N	23101200000092	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
129	KBTIPOG	$2b$10$o0QeYjH1mQCAmqih.GgJmuCcsxuJTtZEoiUiC0EeDsGIUCjI0g1KG	143	\N	\N	22010196100117	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
93	SALYMFIN	$2b$10$PZh4VcHs3Q12CPkiGUYSzOHCF5.p3gq5eSaP9PRl3oaFxIY1YW8Sm	107	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
23	TOKMPATP	$2b$10$4BNLicDNS7JzHHelx4FyiejUJYi9gUAbgPsx2b055NqADl85/PiHC	34	\N	\N	22001198100148	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
145	OAOKYRG	$2b$10$OQ51mD0zssRfKpahzuBjdOxLWv6CJTfjUK7aqaHCXVNF7mLI11LSW	159	\N	\N	22111195300012	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
127	NPFKYR	$2b$10$uDyPElwymFJXCD.zMZxttu3cuuhkkY5CgPtMnVtorKbU7iq46Ij0G	141	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
182	OAOBKK	$2b$10$BqQuK4MbMPjAAuFOVpgvh.NOfGDLzhorNR/ECmrrnIpL2dEP3IRKi	194	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
91	KRKERC	$2b$10$bGJ4g4od/qSZ7CXSM53yDuMYM5vW/mQ1ATxqdkgoDtCVXyOsfz5GS	105	\N	\N	11002199301483	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
19	AKMARAL0	$2b$10$JoNAKqYqOznXAsjxUDtiPufw8I1c0PUgJ3LAMdnMxZA2FaVqEefVO	4	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
20	EVSBEGBK	$2b$10$sBQKT9jmRunjg2QV7pdZluJR9HYoR6D6W4T5rOVTgHAUBtKcSzx3u	6	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
13	KYRGENST	$2b$10$elAeKDOLRzVTPHtj75ppB.zbEdb3YRpo3gBcUDu9RIp2I5vfBrBjW	24	\N	\N	22105197700765	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
11	BCAYPERI	$2b$10$HIZTPBfTK7CugI2ltib2GOK8uJ71IZMDchdN1o5JaOMAUPsbI9w8C	22	\N	\N	21711195700272	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
28	ZVDSVR00	$2b$10$Iz8qYyGgWvs8aLMqttUd4uYAU7nATmNpVQw0y0jyiTCRKfpLYI8bK	11	\N	\N	12601196500812	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
16	KYRSTROI	$2b$10$p4ll81fcBGiIua3wJw2w4e.GitxZZhxOY3RxcBLMBNypsb/iWSbGq	28	\N	\N	10905195400024	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
89	AKMARAL	$2b$10$bk4fQFtLAxtlsq/4WIWgH.idqk8Zr.YzIWspzVciIPEHICrYOZ3ra	104	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
95	OAOSPAB	$2b$10$JIjjNx1MkLEq3cf3SkuSI.UvLN0mzM7EVCFrTe5B5.4XSKIV3bt4q	109	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
139	BALPATP	$2b$10$oSrYKFTkdOb72nH2whUMLeE5OjJ24THdXOjVW113esS/Te5MXp/B2	153	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
151	DASTAN	$2b$10$/hqXVOGRoiCFdv7ZCodHKufeYxngIzrsafep0w8ILKCtKOWlbLzcG	165	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
74	KYRGTORG	$2b$10$qsv.7.n6WuCT//4.0qrxCumjNwcPztFA1yaLrnVt5BhQmP.pmSTgC	89	\N	\N	12412197200628	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
186	AMANBANK	$2b$10$KFEgRlRzUxrmw.FUIRj9W.WpT3XebKh2D1kFEBoyqvx.PhCinnIeW	196	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
39	JUMGALSU	$2b$10$IqIxP9jRzqk2rINM41Y26.NHbGtPushvU/i8/oanRFvE/VRnE57Ae	50	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
153	AOSHOC	$2b$10$pIL7OdKKx9lQzQ9M40Ktl.mhI3XfGjDUXg9VlV5J5G6a8f4dd0FmS	167	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
121	AUSLUGI	$2b$10$xzfsMe8pnAoiAfmw6xKnV.NqQTDGyVbOQnrjZFTJ4uC4uU5RNr0oy	135	\N	\N	20310197200041	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
113	AKORGO	$2b$10$G4kXiwmMHc8CZey48krWLeuMUJLHPOKBtVNbcJcErrDDP9JQIV5eu	127	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
101	ASBETON	$2b$10$RuzFlOtj4OhLxDmOZsUoO.Tj.0GBhaFsWO8QrBcCd2tZrEOOy27yy	115	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
103	ZAVODDSM	$2b$10$8ob8e//sO7Ll4raE7qT1a.mnPv0al7LwyXmeAQMz1YfH8UWf674sS	117	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
35	OKBAALAM	$2b$10$FVNN7ASgKTWOP8LFCqzKAulU9yU2o/WiFTz.XfeNdNWqRwmJJtXUm	14	\N	\N	20105196400032	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
105	EVFIBS	$2b$10$3grXdP87DWilnBy1cyICQeXr4FRW9ytKFFFF3sGSwaOeijVUncafG	119	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
141	AOFKKS	$2b$10$8bo7n7H0Fy0QggfIFMPMOuZmTkg9vgvEF55PZ4.nruL5Amx1XLhn6	155	\N	\N	11712198500991	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
117	CORPMASH	$2b$10$pUgo95Q.l2VfooC5i3ud7uUU3xrs7zSmfLleuAq0GdJGdLKONmYcu	131	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
15	KYRGGIIZ	$2b$10$iQ3eIIKrtPQLB2Y8iOnrNeQbRzcD325f0x/clWcXpw4tqGDJoqeTm	27	\N	\N	20308195400083	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
178	BARKAD	$2b$10$Ps5qXJ8wbT988ln/u2Cnlep8NCP/gtKQNgSjQCpie/ZUDC9vCeFq2	193	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
191	OAOTEST1	$2b$10$Y26Gmp0/waCOL/2CUlu8xe.lDByla7NkDy.IW0.IImGwWu2reWYsi	201	\N	\N	11910196300051	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
188	TEST2	$2b$10$6ZtVzary3vreNEBssyQfquvv/lQazJk.OMz7OvcnKvJ93/ftG6gLG	198	\N	\N	21209199900896	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
87	MFCABN	$2b$10$hdrWw1vv/2B0rTdzKe.4IeNxt8.fVaFj/deVU7ih3LiLK.vKSufVO	102	\N	\N	10611197800382	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
107	LINOLEUM	$2b$10$HEYmBJox2pX6y0TuLH017O2ZYzhphb/QJ/FRr3AlZJH9YXjPxw/Im	121	\N	\N	11109199500937	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
12	KGZAVTOM	$2b$10$xs7Dg8fzvRH6PmR5BqC0VuX4/2Utd3QdRqIamf.WAzdhStw7L3KSK	23	\N	\N	20804198950014	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
26	KGZVNIPI	$2b$10$Ybo6jeahQ43u4vctwyrKt.yyqLUwpgcRzu/I8eGTW5VPBbqAI0Sx.	36	\N	\N	11001197500577	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
32	KGZBAKAL	$2b$10$8ktJnRIWwWV2XM/mAekDWO.YEIJSKUQcsTtVupLv22wAXCBK5vxeG	41	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
156	OAOMAM	$2b$10$IO8MYN/034EBrXgMzUk65.b675J.zAc3YJvzR3Ju4jLnTlTDOE0T.	170	\N	\N	10804199201156	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
216	ASHARINV	$2b$10$DbXEHFYbsq/DcKS8IiLAcOT1IxpiS6ixn4PPLS50kBjBvBic3CX3y	237	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
115	POLIBET	$2b$10$yBn6pyzmZxJq1vW9rvxrkekakxGupqD8wql7jY7jNz5mXFfPPouii	129	\N	\N	1090619840112	2023-09-07 17:19:00.521+06	2023-10-09 14:43:12.688+06
136	ELESINV	$2b$10$O7Vt4AGQYidOy1QIdRsVO.Sz6eiSQqy0uAXEPagI7DhxeX0eE7o.q	150	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
135	JASHTYK	$2b$10$3P5ohw86Dq9biR9z88JQwOs62hPI0Gwb8bFSSAtYtKoZF6TIRSUcC	149	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
112	AOUSTA	$2b$10$.HXrDWrV3/rS87JKNKlngO5t6wp5Gmx9Ub/UuAMQK37nfQp0i1Ylu	126	\N	\N	22708197700507	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
10	GOLDSUN	$2b$10$D7B7YaagSHhKtcxnDA8bMOOL5uMjDe4F/hoZ5j3y5r/2SYFqbI/v6	19	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
165	KEREMET	$2b$10$5x8Rt8iRAzj4eCPkoF5Q2uO6FCsj1Z/ZotO3obZROWuH6LVdDUvZK	179	\N	\N	10411199200814	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
167	AOTDMIN	$2b$10$AuSCe1zXuz0TBw7ACmNA7eObyriI2vK.alSsPz7k4r8r.gGc8u/x.	181	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
98	KINVEST	$2b$10$NI7ZtR0FMOMxF.85g7bDeeUFGviBjDJ5lEao20Zr79Ugji.3xM4B2	112	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
67	fin	$2b$10$w52MpYclKtC7JAk..OfMJ.sDqTN0DJ2x2zJrwn6owB7XadMIBFnYe	77	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
155	RSKBANK	$2b$10$42zPMS/bLN2BVjhYA6hNVeyaLcUGmlRo88Sz09txnvMuElldJtUwK	169	\N	\N	22109196700040	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
64	TESKIM	$2b$10$T1.9Hf/FMWocWx20w86mveQuKYbxizRP.nLgm9xmseBofFz1y7VE6	72	\N	\N	20910196300341	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
146	TULPAR	$2b$10$jXh4i44UFcO7kWkvONq8IOTOPG3jTXmiL/Mg/npLZdXF0g7GQmCBu	160	\N	\N	10708200001109	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
170	DSKAZAT	$2b$10$Ct5R43QhlnksbJa.3PWbIOnomynMSHD0K8PqDJr27S1.5YbRIRTqK	184	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
90	OAOBAKAI	$2b$10$8ocfHviSKlC217yHQ2t/eeiYtKbv/zuRGF64dkNy8ZZMIZ9R4Ak..	42	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
46	OAOAKSUT	$2b$10$WHjrO..ligbuCbjF/uTF5eslqy6N5WXzYmxdTxL8RwSKn//9CEbbO	58	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
192	SHATER	$2b$10$PWPwoIkPpNGqLZXdqy3.J.FHzOqy7bCfogjpHK0W2z9ZafActnCiC	202	\N	\N	21405198901188	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
162	AOUCHKUN	$2b$10$90M5hyWuF.0wXARmLYV.4ereSsmZIc037W/mh36x/meEjJlyCKykG	176	\N	\N	20409196900862	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
44	MASHSTAN	$2b$10$QAprn7nTeJV.CmOi.XJ89ux4AQxN8spC95MrhTs1oUmOjJrhF0JxK	55	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
58	BESSASIA	$2b$10$zoLO0QHI/dsByQTzQkMEHeG8Jt6Eo6l028e8gJ/9J77XSYyTGez0.	62	\N	\N	11708196300499	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
53	KGAVTOVZ	$2b$10$bwwkbIPwTXXKMpSENHQIG.J9LShpsEjHL/OQNQ8WMZOPEM9xbffGu	65	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
43	PSFBISHK	$2b$10$kLBuqfh8YmGP5YVsTVqaoO14tSwwim/5nTJO6eyQtbhsALuAWX4Z6	53	\N	\N	22011194200014	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
60	FARMACIA	$2b$10$U9ax5CyuaRS9MIQyISkVp.v/eSME5Om3og6CRRy0Yz27WvvFkOb86	67	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
61	CHELPEK1	$2b$10$hXiVrOcobY4OolOV90aCielzw5o7uudmjvrukzeXYoqbdTkhFBINu	60	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
69	SPECMNTJ	$2b$10$KPm/4J44sfcfJIEmfcgJGu3RBsln/n9XyCqnI7OQsgsjibJsNy.a6	79	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
120	OAOKEK	$2b$10$nw1OSqfrnwhbl.aib6K8KezNZbscclQPPcl68iRoB.ek43jtyRhT6	134	\N	\N	22007199900494	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
7	DOMAZAT	$2b$10$2s.UgJZ33gInNPcrBk5RWO.dIXFJiOSEjJJNB7rbsTdi.RNKFjtW.	71	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
49	irina	$2b$10$g6NHCRFnuhKxMN7P9nWGD.7F.NOJDkH/v4jSnJE3XrzoQF1n3yKCe	8	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
96	SMAVTOM	$2b$10$f6pvIIFVhJEmthCdeRw24.kJ/OghNADj43DvHRYwNrmk9JxeCTpB6	110	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
104	KMEBEL	$2b$10$Wppm9bH8kT35iTRPldkHZe5u8eqqzHOSMYJ9hGyeBCsJ4f5ged92i	118	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
122	TBASMA	$2b$10$YRPQzGkB9gLSV8NmOP/aUO8xMRBQm57i5f3SAoihlSIbAoaYlXzIa	136	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
126	NPFDOR	$2b$10$GEEChY7I/0AoSXGmnuZ4c.aze2ijnUeqaLuWjYolvr3l1skHCK0de	140	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
140	KDMTV	$2b$10$kOsUStDM3p7q09N/1.L3kOCToUgps4ZFhi1.pm7ZKUzlaTQdvlP4q	154	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
144	KDOLBOOR	$2b$10$qdMx7U0XxKgGt9Mh57dJYu2UhzxGAZm41w//4tXIDNEbEVBRojSYG	158	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
152	AOULAN	$2b$10$wVraUOkq9G262L4YaP.grOnOaC./AzfzV2ow.cS2vrabGRlKHjF2a	166	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
147	KBKKP	$2b$10$N9Wr0bCAnBIFN6ESWVlCWunZ03JrV5WnkFkzrgS33F4fd/ri2IS6K	161	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
33	KOMBINAT	$2b$10$HjSCtj7U8cCzdrB5LV2D1.VSvgrdfhomvbyMkwCkzbz6L1/om.h2m	45	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
34	AOKOSHOI	$2b$10$/6bC/CThZcipefltymAdwuwvL7XO29rjxkPZu3QmRgnnbXbBxd3de	46	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
36	OAOSPAB0	$2b$10$BqSeoriXdlEq4Ych3QooeeYFownYQ.S.kyTiYKEL2osD40wJ7gjfq	47	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
166	OSOOAU	$2b$10$ptV4sAtQlI2yG2vi81bN/eq60MstR3RPKbKzW/IwZfYn8DflhKE2y	180	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
47	aziret	$2b$10$tinjUey7EiDPzoH6TkBZ6el30gBwEU8Q/1Q8vtX9/cYVa.KmE95hW	8	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
8	AZATTYK0	$2b$10$exvsdwUdqrHnOihxMNc3gesbxtkjYdAT2O1EGK9K.XSwPM0Sfi/Ju	30	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
38	OAOAKKUU	$2b$10$waCkFIHjrDN09.nJH679sekmiX16o24V/SrpuegsPLl1ISuXpAkt.	49	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
6	LOGIC01	$2b$10$e7bF3r6Y9kpmTO.oFCJBResILY5N2hDc8NobuixBmUh6co9gUmznO	16	\N	\N	22911197100113	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
56	AODOMSTR	$2b$10$ssjIF1dYYeYFjHColR7Lbu/YZDLKYfGxP4Px.juTTQd2tNIhLbBU.	69	\N	\N	12512195300652	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
92	TSERVIS	$2b$10$v0q6VTTbvcuwdSdhvk6gKOMQoWi/HEzXLrk2viFx09M8E1gvkWFo.	106	\N	\N	22905194700026	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
68	ZAVODJBI	$2b$10$V6DZtJzTg5e4oOUuTdyhOeeiEryqiezaQxuw9KiPFLWUOEkMeN/GW	78	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
106	ORGTEHST	$2b$10$9UJAGOIEbsrK7kq7lzYXleeNVeH5nIqr8VEmaNipPyY98XvlhV/IK	120	\N	\N	10104200250155	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
40	AVTOSNAB	$2b$10$SsF702OSxS.1py7xfswx.u9e7fvnUi4N35/aMmQpYjjsWbYCaep.2	9	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
187	ARASHAN	$2b$10$B/t.YkFRXL3CrRmV4VOu2.qglkJ3Nb.F6OXpTjCwblL/7uAe3TSVe	197	\N	\N	20301197500565	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
59	JIBEKJOL	$2b$10$Fqgbkmg1KXYsasTn/o0Z3OFZ5OPTmZ/yXwHMtOH3PF3Y4yVgvgtT6	61	\N	\N	22907195000138	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
183	AKBOSOGO	$2b$10$QbiknIU71TfKBsFhdOr5JekvhA33JRMKlypMA1InvA/EqtQ2WUXTC	195	\N	\N	22807198300995	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
161	SEVEREL	$2b$10$.4mA2hZ6QMJEfs.2c.cpT.9bnRznP9.Z2kwF.GiLpuljCRG/OM6Ly	175	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
137	BEREKEIN	$2b$10$aFUZ.4hje4JAOAXa9tOpde0.3MbOngHeqheiI8YsM6l1Xt/009N2C	151	\N	\N	12410197800499	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
111	CHAKAN	$2b$10$uBVEsGDBupBjlPFs0F/ReOsAiJH3CTw4u8V9IVH2qKL7bnvBb4j3G	125	\N	\N	12501197400654	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
119	ARSTAN	$2b$10$RxlbGni7zUttn6JI13Xbfez.7k//ivgPAb3MvtmKTkLneCJReriMO	133	\N	\N	22007199900494	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
169	AOMKKFRP	$2b$10$cWljjU3NoipNe6OOk2ihGuf6YBaE2Ldepcx5E9/YkBNcwLRC3OyaC	183	\N	\N	12309196400230	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
123	SONKUL	$2b$10$rU4P1wJ.7A9f2R4jr8N98.vnETD/1tO1zZQ1rBMM/.Kh3CJ8aoqbe	137	\N	\N	10510197400318	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
17	BISHNAN0	$2b$10$sl2NZ9RpPH3MrfD0sfejN.AMg60FniRJg88pBUQOBGGBy61sY7hkC	26	\N	\N	20309198300323	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
125	SEIIL	$2b$10$9dDOjvOCtuVEKiVDjgoymeOf9OJvqN8rutLCppDPI/V6.vFTwI5K6	139	\N	\N	10304196800532	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
131	OAOKCZ	$2b$10$HkTeYaR8vSTBpKA8SsTE3uELXrly0QDnXuyqYGOBoubziElaCTvB2	145	\N	\N	20712197600210	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
99	KYRTASH	$2b$10$3VG2FXoMg5E87w9Fvz7mYOxJqmRGHry460Z/pMQubq.8ep9Sy22cm	113	\N	\N	12104195700026	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
42	BISHSETI	$2b$10$LldbpfwCfomhccmg2nVNCexrCG/3KyNFxxvCVF1loW7MTXmy/mtCi	52	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
1	CHUIBAT	$2b$10$9KJ.oKTE40W45BcE/r/QvOUgXlN/.rH28s/KkliwaN8nW4yDqy4cC	15	\N	\N	22002194900048	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
45	PRPROEKT	$2b$10$cWcHPK/KcAX7bglyuzBg1e6hTGDUCFLWj9seQDAUAmJkgEGmJdDk.	57	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
5	TSUMHOLD	$2b$10$K/psX.bCaTKTqervZGQtx.f1txzQTf1yBK/LFj98DHDqScUTfInMq	21	\N	\N	11910196300051	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
54	AOEMEREK	$2b$10$E1hd8j4ruOqFroBUo7J8xOADfTfgkugxJwl8uXpoODuS0hSrymkNC	68	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
158	AYLBANK	$2b$10$eC31YB2Vv7L1TXtI8PSxZu3GeVR7pYIEsNwYMVvrw7/VCCa3t93Zu	172	\N	\N	01803199710084	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
171	KYRVSYS	$2b$10$hpI/S3xTHBYZedNV.Q6QD.JNcstJGvoZsisq0ApkIo2FZ9023Fby6	185	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
118	AOOKKO	$2b$10$GK3kkVT3Qs4MehiUH9Vbmu8VhtbirwE2U9WYVqmv5qh7INDLS3BZK	132	\N	\N	20702200000846	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
65	KYRGALT	$2b$10$3LHc.fSI6lTUOxxFB1/p2uHfFY/qdjZ9lMMXYgsWjuW4I4N2btIhK	73	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
88	APROSAH	$2b$10$pob2JsDNbbNx9WpWoy9Y4.PTqVA7ak6MNJbyd6oP3Uoi41f0taAdG	103	\N	\N	13105198500166	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
3	TSUMAYCH	$2b$10$knlI1.1zdmf9Awr6UJi4A.QvvjNdqbI.GR107ozs8QhGLCBxKX5sW	29	\N	\N	11910196300051	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
94	AOSALAM	$2b$10$JnuNH/CMtJ742DrY.pmgDez.tuiHYtz1UhSixmHzD4bs8KeEREFf6	108	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
102	AOKANAT	$2b$10$BvFuiOAIPfCIiLOykl6TpOPZB6BpXZDbT8bm2e29UsfYzNYpt5pPW	116	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
108	PERMET	$2b$10$htsbxgzhZYSk3ytdExXoUOFMieV5o9tVZvEWDq/e37UT2wYQ.Oezu	122	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
114	ALATOO	$2b$10$9uxmO.Sx2y77SZnZUD9PkeCnCKXZhhVL3Hmn9sZtkkB42mAMDZLN.	128	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
116	AKSUATP	$2b$10$d6/Z6crmxcsPYNXhTsY1DO.Dw9kfHbf8v9hLobfNNnmY1/RDEzxyG	130	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
134	MEDIAF	$2b$10$vJpvVvOmKUciAEcxZWnayO.k5PWLeXSRm.v05JlRULI5Skit4uHU6	148	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
142	KRAKMAR	$2b$10$Mho8aE/ah3qTQlGnPcrMY.68zfCLRx9EFW8RVvVWyYWeuj/Z9ETnS	156	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
148	GARFOND	$2b$10$AEL18S6UODRlgpvAUyu6D.q0UJ5oZ2S69XyUil7u3HyvV2sfnCgwS	162	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
150	AOARPA	$2b$10$isTxGvNz9y5XukUWcyEcquoWvCt.8o8Mh.f6IxKLR/5z7AGOMXtYW	164	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
168	OAOKSD	$2b$10$WQ8PjO3/LVFpwN/AGtoCb.PYRhx3GbGHKsCw9pRdv5g6.DCdFcn6.	182	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
9	AERSTROY	$2b$10$4qHQ9VtsxArHycWexfaR/.tNND1m.rAoNkQAmsgLVgxQ3Xif/6opK	18	\N	\N	20705199701387	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
51	KAINKANT	$2b$10$4piHq97.c/gCw885J0tiHu7mn03xooWOTBu42otWTsCK1RmrCBPXq	70	\N	\N	13003195700210	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
172	marsel	$2b$10$mDnq.Dd8dFCVmuUV7TsoZOrH0yRdgyfitmhVbbPfWbyIhwW9sMa6S	8	\N	\N	21209199900896	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
48	medet	$2b$10$AHJ6dCkTrNkwTsDYO4u3NudczYKsr13a2.JE/a4wHwde8ZiFhnAb.	8	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
57	BISHSUT1	$2b$10$bm5a57zZ1tie.j4nJbPyAeq4J9yohDoobRnrwFLabwkE4CUIF6/5S	63	\N	\N	12805195800090	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
55	OAOAYGUL	$2b$10$FksQUqDREnG3pxOZZTluU.XHw.39vMovGBdnpv019ez9bmmbkdiU6	64	\N	\N	10405195900730	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
128	SOKKKP	$2b$10$GSAACm7ypa1aBzLSEzBPd.y9XyvRojItrE1ESVF2AaqB0RxJFaoKq	142	\N	\N	10701196100213	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
176	KANTPMK	$2b$10$8gKbDh0Nket13GktqixZouFIr2dLZm57jE9LB.6a3APlSxoO2vEBG	189	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
37	ALMYDPMK	$2b$10$8o9bxwkSSDJRKPxjTgSTCur7b7sNgUmOPoH6h9PrmU.3Ey6/DG7RC	48	\N	\N	21002198000684	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
52	OAOSU004	$2b$10$tF/VPju2ypH0d7UulYHwBuNIcu.hLyxhfk7tGosKhztJgZl2qSBlC	66	\N	\N	22003199000397	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
195	CAPBANK	$2b$10$U/tU09WEsQk3zb4zBCdYdeFlUkCp98hfdTsgS5dnXxprM/PdkH2sy	217	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
29	FIRMPROM	$2b$10$6UizUtnR31LeHCABMJmuc.esNna.bgF1vxQqveV71QBTfXWWXO0uu	38	\N	\N	10704196500018	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
30	OAOAKKYR	$2b$10$giwFJeN9ABucmGg1LgxHmu9L2tQM5uFON6IsDo7CRBxmcckc14r7C	76	\N	\N	11601198301072	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
2	FSANTEHM	$2b$10$eTiAXvk7JTXHMhY/PYUGgusKlp7TNIafbhDXYrdqbabUUokv8xK6K	20	\N	\N	11110197901044	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
14	GLOBINST	$2b$10$2euHKad6OFCc/t9kyMRt3ulBk.9GZQ3WwD/kWJZZkJgNxigXmW9Ii	25	\N	\N	12301198400567	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
41	KICBBANK	$2b$10$U8m48dOka5pQpiK2c3QmSextNA3LdmU32i0At5IQK7LYa0qHBr2s6	51	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
66	ALTYNDEV	$2b$10$Td4S3B.5qvXI7xjURgN00e5iZJPHXOUyL.wD6YjJq3enwKKse.LZu	75	\N	\N	23101200000092	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
174	HALYKBNK	$2b$10$3.w1gRJPEnzDULsRSkgR1.uj/I9i.pcmFzpx.cvDfk5laayNrMS4W	187	\N	\N	12606197800462	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
154	OPTIMA	$2b$10$bY2qsVQXRcMt7.gh2QV1AuT2NlvzLlTHW8xmEnBeYg1ojk70cNSIm	168	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
138	KBKYRG	$2b$10$yd5ktqsIlr7kapTy9TmnnuX4T3SG2TU.xYB6pH.oW7QWGuwgtP/fC	152	\N	\N	10406196500020	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
100	JETIGEN	$2b$10$zaKXkODUsEmxNXOhnxA8be7TWOeKlQvUy4R4RmKlixu.lEu898seG	114	\N	\N	00000000070155	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
164	TEPLICHN	$2b$10$JHIrqG7FSkoakB9NsUoRIeLelhEIMIvNOgKnT797umj5zK2ZY5.MO	178	\N	\N	20807197300712	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
124	TOOTASH	$2b$10$txxlJ9SsZFJfvtaoW11w8uvTwP2sb60MVOhjoowsdUi3FUWFuk6sW	138	\N	\N	00404199810056	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
130	OAOBMZ	$2b$10$lRF6.C3OQ7ls0VywCF7kqOR7HqYgkoUO4z7sAyMyudtX/ck0C6Hka	144	\N	\N	22906198400733	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
160	OAOGIK	$2b$10$492E5FzMpQCBQ.1lque2jOG661BFCZ.lgTC1dra6aDqRlHWlwv3oG	174	\N	\N	20601198401323	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
21	OTKAKJOL	$2b$10$wteZQG46Av1OQSS53K9qRuMteTolAbApVU.v1rm6qqJ2ZXlvGCmyy	31	\N	\N	20202197500478	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
110	ASZAVOD	$2b$10$TmJ7dFaLQt//EE/3Rki0gONb5DGycwYBaYVJ1YK.3safn0dKOVsbO	124	\N	\N	12201196200171	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
132	ATINVEST	$2b$10$4bL/FOYTGJY6xZl7d54XrOJb25SYdVzI94rxDV72AQVhrichpOl82	146	\N	\N	01010199510099	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
217	KNFTGAS	$2b$10$ozONtGaIWN00HCskca01RuXilgJW.hP2tRHh0esyuLC78klyMks3i	238	\N	\N	22310197600489	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
189	GETIOGUZ	$2b$10$O3CsguB4XtqByEXWstUulO4W7nUggK9iPrxY7sNHhXu/tp5KEmKp6	199	\N	\N	12409195600106	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
218	MERKATOR	$2b$10$hk5za4Ra1CdkhCaszLUnheTWjSPaZwsIRsHXVl//BWTwU6FDUOPZq	239	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
22	GTDOSTUK	$2b$10$5DeA89N7..btq8PRSy/t0eW/tWTRQGZo12PBS340Bwr2o/O5hcgiq	32	\N	\N	21112198100095	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
159	OAOELST	$2b$10$VqMM5RuTvj1j4ylx0qsy3e8ugltXXQmj15.itvaQUoQNajCKWt3SS	173	\N	\N	11503196901416	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
199	FPRTKR	$2b$10$Y/UwYfcZbU1LrIbd7llC2OpWbH/sSyGQhJ1GDLWPJI5AWEwAi4e3i	221	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
198	KGINDS	$2b$10$/5Dw3Izz5dEHqPVqFvVBbuuzpOls97zlvgEKQmfp89d8Ybe2ZHRp.	220	\N	\N	02020419871356	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
196	NESKKR	$2b$10$IHmkdbkvUml5EIoAmeElhO2Kq0fcWkFZz4osBB6sUBRN.Sjrw4BSe	218	\N	\N	12809199101975	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
212	DOSCREDOBANK	$2b$10$SSdEvuufuoCYly1JuYAk9u01L/4/mn3ZQaherIFDeNlI3xqlQidAy	233	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
204	OAOASHAR	$2b$10$3p8B84op9mfFddP9qyD0.uwtgVFxJl1FVydOFu75UZgn4EiPqL2a6	225	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
213	BANKOFASIA	$2b$10$5AyNYHOAh.bblS5knijoQOyCl2MoL5nCM1fMe1MHa.jvQVYrZYy7W	234	\N	\N	00805199810064	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
205	TTRNB	$2b$10$lAK5CVAi/x2zo9mrQFzqY.olmryMebUdC/uZB24XWDk5njDqTQugy	226	\N	\N	01712200810168	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
201	umai	$2b$10$xyfNthndv7LtyO0NMgoYD..uqDLHEcF58ZlnrkAHeVUh0szX773eO	2	\N	\N	12903199000074	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
211	OAOGDB	$2b$10$WhIAzyHZQqfC2VrX0LXI0u/rP20UfJAlZe0AH.PyfHtZ022PQ8b/y	232	\N	\N	02507202210299	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
157	OAOFKB	$2b$10$yGiXCaZPjYOp1YeU3qVkz.fJdGzjWjt2bWsyoZuSybsyzNAPm1Sgq	171	\N	\N	00812200510186	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
219	LBEXCHJP	$2b$10$cAnm2JoGVQVrrktKnXTY1.UWCp4Runz4Dl7lv.dx6Y6KDWfzAr2RW	240	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
71	OTALCAP	$2b$10$59XGCQfkJHoq81W1NwIQM.ItwQ.2V83C9ojzwOA4Cd2FlkMCHZFkS	1	\N	\N	23101200000092	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
210	POSTKG	$2b$10$5zCIml5Z8A5xAqiPKBf4PusZZDrEuygzJuUrkvD7v5riVmd62mRue	231	\N	\N	12412196500208	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
202	MFKOKSUS	$2b$10$FSSIcOHqviCZeXed31Twee0HMIygyb.wAAuly8MRAGCzpeaHWC1Uq	223	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
206	STROYDOM	$2b$10$nbTw7HQcX0FFGaYSsppCKetsImZXx83/CrJIN3XtsTx4Dlo1WjdZ6	227	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
207	ELETCAP	$2b$10$H8VTWM3TlSRO7IDD99Sh4.MmF92VX.ezLX8EaEmL1sq1ldgxf2QoG	228	\N	\N	20207196900375	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
208	AKJLTOI	$2b$10$3GJEQLFGqRfxtmC31eZEkeeB5RxY/z54IS1g4wFzJxiRIuLh.krMm	229	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
209	VTISERVS	$2b$10$cEWkxqiRtZ5u6ZgOlk1K5uVOOccYmrBDEdc.iLrr7Wdr2zRCb72kS	230	\N	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
25	HLEBINSP	$2b$10$00/pyG9MGv2NbUNtmuSbDuU/wffbSoYBzV3qZk1whO.iYNCxXeJ06	74	\N	\N	22004195400022	2023-09-07 17:19:00.521+06	2023-09-07 17:19:00.521+06
18	KGZKOMBK	$2b$10$qETQph7KoZEGyBmuSjFKyeKst2rJwQKrlKXdF7WMfnQL9u6wxu7N2	5	test	test	10106199102272	2023-09-07 17:19:00.521+06	2023-09-09 15:12:11.811+06
50	admin	$2b$10$R8VdoX6varmDFY3b2NITaeHkyhsEkKjkFwfdKoox2GXWNZy3GWQXO	2	Ирина	\N	10906198401121	2023-09-07 17:19:00.521+06	2023-09-16 20:49:33.502+06
197	UBSTRANS	$2b$10$C.ePlawJkvzq6aq0PUDQUu/FlRWZua8Ir1VUG5Q2Zk/U4x095rd.q	219	Transit	\N	00000000000000	2023-09-07 17:19:00.521+06	2023-09-27 15:43:11.81+06
251	test34	$2a$04$fYpkcU/oaQNeTjO4y8RzBeV7CUAvIvFRWqaUGAClNwLa3U8bzVx6q	222	test	test	00000000000	2023-09-27 22:13:30.899+06	2023-09-27 22:13:30.899+06
70	test	$2a$04$YCNcljoTJFZhz1wSNW6H/Ok5Teg/IRSqscHy/.DYVRpw.wzuEZHE.	10	Эмил	test	10906198401121	2023-09-07 17:19:00.521+06	2023-09-29 10:06:12.643+06
252	umai2	$2a$04$nMt4EBDbB/8xJkeOXk7/yuJmUSWhiJivvV2.aSGSx2CHMBQT95W12	2	umai	umai	00000	2023-10-09 15:22:26.437+06	2023-10-09 15:22:26.437+06
\.


--
-- TOC entry 3766 (class 0 OID 0)
-- Dependencies: 223
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 250, true);


--
-- TOC entry 3767 (class 0 OID 0)
-- Dependencies: 211
-- Name: company_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.company_templates_id_seq', 2, true);


--
-- TOC entry 3768 (class 0 OID 0)
-- Dependencies: 237
-- Name: eds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eds_id_seq', 2, true);


--
-- TOC entry 3769 (class 0 OID 0)
-- Dependencies: 231
-- Name: eds_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eds_types_id_seq', 2, true);


--
-- TOC entry 3770 (class 0 OID 0)
-- Dependencies: 233
-- Name: oi_kse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oi_kse_id_seq', 230, true);


--
-- TOC entry 3771 (class 0 OID 0)
-- Dependencies: 239
-- Name: receipts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receipts_id_seq', 2, true);


--
-- TOC entry 3772 (class 0 OID 0)
-- Dependencies: 217
-- Name: report_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_groups_id_seq', 4, true);


--
-- TOC entry 3773 (class 0 OID 0)
-- Dependencies: 215
-- Name: report_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_status_id_seq', 5, true);


--
-- TOC entry 3774 (class 0 OID 0)
-- Dependencies: 213
-- Name: report_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_templates_id_seq', 22, true);


--
-- TOC entry 3775 (class 0 OID 0)
-- Dependencies: 219
-- Name: report_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_types_id_seq', 26, true);


--
-- TOC entry 3776 (class 0 OID 0)
-- Dependencies: 235
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 15, true);


--
-- TOC entry 3777 (class 0 OID 0)
-- Dependencies: 227
-- Name: role_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_users_id_seq', 193, true);


--
-- TOC entry 3778 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3779 (class 0 OID 0)
-- Dependencies: 229
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 150, true);


--
-- TOC entry 3780 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_temp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_temp_id_seq', 3, true);


--
-- TOC entry 3781 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 252, true);


--
-- TOC entry 3539 (class 2606 OID 24703)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- TOC entry 3525 (class 2606 OID 24013)
-- Name: company_templates company_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_templates
    ADD CONSTRAINT company_templates_pkey PRIMARY KEY (id);


--
-- TOC entry 3559 (class 2606 OID 25229)
-- Name: eds eds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds
    ADD CONSTRAINT eds_pkey PRIMARY KEY (id);


--
-- TOC entry 3553 (class 2606 OID 24927)
-- Name: eds_types eds_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds_types
    ADD CONSTRAINT eds_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3555 (class 2606 OID 25065)
-- Name: oi_kse oi_kse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oi_kse
    ADD CONSTRAINT oi_kse_pkey PRIMARY KEY (id);


--
-- TOC entry 3561 (class 2606 OID 25248)
-- Name: receipts receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_pkey PRIMARY KEY (id);


--
-- TOC entry 3531 (class 2606 OID 24476)
-- Name: report_groups report_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_groups
    ADD CONSTRAINT report_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 3529 (class 2606 OID 24159)
-- Name: report_status report_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_status
    ADD CONSTRAINT report_status_pkey PRIMARY KEY (id);


--
-- TOC entry 3527 (class 2606 OID 24101)
-- Name: report_templates report_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_templates
    ADD CONSTRAINT report_templates_pkey PRIMARY KEY (id);


--
-- TOC entry 3533 (class 2606 OID 24483)
-- Name: report_types report_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_types
    ADD CONSTRAINT report_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3557 (class 2606 OID 25200)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 3545 (class 2606 OID 24823)
-- Name: role_users role_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_users
    ADD CONSTRAINT role_users_pkey PRIMARY KEY (id);


--
-- TOC entry 3547 (class 2606 OID 24825)
-- Name: role_users role_users_roleId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_users
    ADD CONSTRAINT "role_users_roleId_userId_key" UNIQUE ("roleId", "userId");


--
-- TOC entry 3535 (class 2606 OID 24599)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3537 (class 2606 OID 24601)
-- Name: roles roles_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_title_key UNIQUE (title);


--
-- TOC entry 3549 (class 2606 OID 24846)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3551 (class 2606 OID 24848)
-- Name: tokens tokens_refreshToken_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "tokens_refreshToken_key" UNIQUE ("refreshToken");


--
-- TOC entry 3523 (class 2606 OID 23971)
-- Name: user_temp user_temp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_temp
    ADD CONSTRAINT user_temp_pkey PRIMARY KEY (id);


--
-- TOC entry 3541 (class 2606 OID 24782)
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- TOC entry 3543 (class 2606 OID 24780)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3572 (class 2606 OID 25235)
-- Name: eds eds_reportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds
    ADD CONSTRAINT "eds_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3571 (class 2606 OID 25230)
-- Name: eds eds_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eds
    ADD CONSTRAINT "eds_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.eds_types(id) ON UPDATE CASCADE;


--
-- TOC entry 3573 (class 2606 OID 25249)
-- Name: receipts receipts_reportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT "receipts_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3562 (class 2606 OID 24484)
-- Name: report_types report_types_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_types
    ADD CONSTRAINT "report_types_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.report_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3563 (class 2606 OID 24489)
-- Name: report_types report_types_tempId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_types
    ADD CONSTRAINT "report_types_tempId_fkey" FOREIGN KEY ("tempId") REFERENCES public.report_templates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3570 (class 2606 OID 25216)
-- Name: reports reports_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3568 (class 2606 OID 25206)
-- Name: reports reports_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public.report_status(id) ON UPDATE CASCADE;


--
-- TOC entry 3567 (class 2606 OID 25201)
-- Name: reports reports_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.report_types(id) ON UPDATE CASCADE;


--
-- TOC entry 3569 (class 2606 OID 25211)
-- Name: reports reports_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3565 (class 2606 OID 24826)
-- Name: role_users role_users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_users
    ADD CONSTRAINT "role_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3566 (class 2606 OID 24831)
-- Name: role_users role_users_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_users
    ADD CONSTRAINT "role_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3564 (class 2606 OID 24783)
-- Name: users users_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE;


-- Completed on 2023-10-12 11:05:54 +06

--
-- PostgreSQL database dump complete
--

