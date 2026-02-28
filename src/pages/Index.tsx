import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default Index;
