import { useState } from "react";
import { useNavigate } from "react-router-dom";

const indexCode = `import { useNavigate } from "react-router-dom";

const epochs = [
  { decade: "1950-е", path: "/1950s", desc: "Зарождение программирования" },
  { decade: "1960-е", path: "/1960s", desc: "Языки высокого уровня" },
  { decade: "1970-е", path: "/1970s", desc: "Структурное программирование" },
  { decade: "1980-е", path: "/1980s", desc: "Эра персональных компьютеров" },
  { decade: "1990-е", path: "/1990s", desc: "Интернет и веб" },
  { decade: "2000-е", path: "/2000s", desc: "Скрипты и платформы" },
  { decade: "2010-е", path: "/2010s", desc: "Мобильность и облака" },
  { decade: "2020-е", path: "/2020s", desc: "ИИ и современность" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px", fontFamily: "serif" }}>
      <h1>История языков программирования</h1>
      <p>Выберите эпоху, чтобы узнать, какие языки появились в это время.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {epochs.map((e) => (
          <button key={e.path} onClick={() => navigate(e.path)}>
            <div>{e.decade}</div>
            <div>{e.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;`;

const decadeCode = `import { useNavigate, useParams } from "react-router-dom";

// Данные по каждой эпохе хранятся в объекте data.
// Ключ — это часть URL (например "1990s"),
// значение — заголовок, вводный текст и список языков.

const data = {
  "1990s": {
    title: "1990-е годы",
    intro: "Интернет изменил всё...",
    languages: [
      { name: "Python", year: 1991, desc: "Простой и читаемый синтаксис..." },
      { name: "Java",   year: 1995, desc: "Написал один раз — запускай везде..." },
      { name: "JavaScript", year: 1995, desc: "Язык для веб-браузеров..." },
    ],
  },
  // ... остальные десятилетия
};

const Decade = () => {
  // useParams читает :decade из URL (например /1990s → "1990s")
  const { decade } = useParams();
  const navigate = useNavigate();
  const info = data[decade];

  return (
    <div>
      <button onClick={() => navigate("/")}>← На главную</button>
      <h1>{info.title}</h1>
      <p>{info.intro}</p>
      {info.languages.map((lang) => (
        <div key={lang.name}>
          <strong>{lang.name}</strong> — {lang.year} г.
          <p>{lang.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Decade;`;

const appCode = `import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Decade from "./pages/Decade";

// BrowserRouter — включает навигацию по URL без перезагрузки страницы.
// Routes содержит список маршрутов.
// "/" — главная страница со списком эпох.
// "/:decade" — динамический маршрут: :decade подставляется из URL.

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:decade" element={<Decade />} />
    </Routes>
  </BrowserRouter>
);

export default App;`;

const files = [
  { name: "App.tsx — маршрутизация", code: appCode },
  { name: "pages/Index.tsx — главная страница", code: indexCode },
  { name: "pages/Decade.tsx — страница десятилетия", code: decadeCode },
];

const epochs = [
  { decade: "1950-е", path: "/1950s", desc: "Зарождение программирования" },
  { decade: "1960-е", path: "/1960s", desc: "Языки высокого уровня" },
  { decade: "1970-е", path: "/1970s", desc: "Структурное программирование" },
  { decade: "1980-е", path: "/1980s", desc: "Эра персональных компьютеров" },
  { decade: "1990-е", path: "/1990s", desc: "Интернет и веб" },
  { decade: "2000-е", path: "/2000s", desc: "Скрипты и платформы" },
  { decade: "2010-е", path: "/2010s", desc: "Мобильность и облака" },
  { decade: "2020-е", path: "/2020s", desc: "ИИ и современность" },
];

const Index = () => {
  const navigate = useNavigate();
  const [openFile, setOpenFile] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px", fontFamily: "serif" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>История языков программирования</h1>
      <p style={{ fontSize: 16, color: "#555", marginBottom: 40 }}>
        Выберите эпоху, чтобы узнать, какие языки появились в это время и почему они важны.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {epochs.map((e) => (
          <button
            key={e.path}
            onClick={() => navigate(e.path)}
            style={{
              padding: "20px 24px",
              textAlign: "left",
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "white",
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 6 }}>{e.decade}</div>
            <div style={{ color: "#555" }}>{e.desc}</div>
          </button>
        ))}
      </div>

      <hr style={{ margin: "52px 0 36px", borderColor: "#ddd" }} />

      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Как устроен этот сайт</h2>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>
        Сайт написан на <strong>React</strong> — библиотеке для создания интерфейсов. Проект состоит из трёх основных файлов.
        Нажмите на файл, чтобы увидеть его код с пояснениями.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {files.map((f) => (
          <div key={f.name} style={{ border: "1px solid #ccc", borderRadius: 4 }}>
            <button
              onClick={() => setOpenFile(openFile === f.name ? null : f.name)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "monospace",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{f.name}</span>
              <span style={{ color: "#888" }}>{openFile === f.name ? "▲ скрыть" : "▼ показать"}</span>
            </button>
            {openFile === f.name && (
              <pre
                style={{
                  margin: 0,
                  padding: "16px",
                  background: "#f7f7f7",
                  borderTop: "1px solid #ddd",
                  fontSize: 12,
                  lineHeight: 1.7,
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                }}
              >
                {f.code}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;