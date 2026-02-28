import { useState } from "react";
import { useNavigate } from "react-router-dom";

const htmlCode = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>История языков программирования</title>
  <style>
    body { max-width: 700px; margin: 60px auto; padding: 0 20px; font-family: serif; }
    h1 { font-size: 32px; margin-bottom: 8px; }
    .subtitle { font-size: 16px; color: #555; margin-bottom: 40px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .btn { padding: 20px 24px; text-align: left; border: 1px solid #ccc;
           border-radius: 4px; background: white; cursor: pointer; font-size: 15px; }
    .btn:hover { background: #f5f5f5; }
    .decade { font-size: 22px; font-weight: bold; margin-bottom: 6px; }
    .desc { color: #555; }
    .back { background: none; border: none; cursor: pointer; font-size: 15px;
            margin-bottom: 24px; padding: 0; }
    .card { border: 1px solid #ccc; border-radius: 4px; padding: 18px 20px; margin-bottom: 16px; }
    .card-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .lang-name { font-size: 20px; font-weight: bold; }
    .lang-year { font-size: 13px; color: #888; }
    .lang-desc { font-size: 14px; color: #444; line-height: 1.6; margin: 0; }
    #main, #detail { display: none; }
  </style>
</head>
<body>

<!-- Главная страница -->
<div id="main">
  <h1>История языков программирования</h1>
  <p class="subtitle">Выберите эпоху, чтобы узнать, какие языки появились в это время.</p>
  <div class="grid" id="epochGrid"></div>
</div>

<!-- Страница десятилетия -->
<div id="detail">
  <button class="back" onclick="showMain()">← На главную</button>
  <h1 id="detailTitle"></h1>
  <p id="detailIntro" style="color:#444;line-height:1.6;margin-bottom:32px;"></p>
  <div id="detailLanguages"></div>
</div>

<script>
  var data = {
    "1950": {
      title: "1950-е годы",
      intro: "Первое десятилетие программирования. Компьютеры занимали целые комнаты, программы писались в машинных кодах. В конце 1950-х появились первые языки высокого уровня.",
      languages: [
        { name: "Ассемблер", year: 1949, desc: "Язык низкого уровня, работающий напрямую с командами процессора." },
        { name: "Fortran",   year: 1957, desc: "Первый широко распространённый язык высокого уровня. Создан в IBM для научных вычислений." },
        { name: "LISP",      year: 1958, desc: "Язык для символьных вычислений. Заложил основы функционального программирования и ИИ." },
        { name: "COBOL",     year: 1959, desc: "Создан для деловых приложений. До сих пор используется в банковской сфере." }
      ]
    },
    "1960": {
      title: "1960-е годы",
      intro: "Эпоха активного развития языков. Появились концепции структурирования кода и первые стандарты.",
      languages: [
        { name: "ALGOL 60", year: 1960, desc: "Ввёл блочную структуру и рекурсию. Повлиял на большинство современных языков." },
        { name: "BASIC",    year: 1964, desc: "Создан для обучения программированию. Широко использовался на ранних ПК." },
        { name: "PL/I",     year: 1964, desc: "Универсальный язык от IBM, объединивший возможности Fortran и COBOL." },
        { name: "Simula",   year: 1967, desc: "Первый объектно-ориентированный язык. Ввёл понятия класса и объекта." }
      ]
    },
    "1970": {
      title: "1970-е годы",
      intro: "Десятилетие структурного программирования и системных языков.",
      languages: [
        { name: "Pascal",   year: 1970, desc: "Создан для обучения программированию. Строгая типизация и чёткая структура." },
        { name: "C",        year: 1972, desc: "Один из самых влиятельных языков. Создан для написания UNIX. Основа C++, Java, Python." },
        { name: "Prolog",   year: 1972, desc: "Язык логического программирования. Используется в задачах ИИ." },
        { name: "Smalltalk",year: 1972, desc: "Полностью объектно-ориентированный язык. Вдохновил Ruby и Python." }
      ]
    },
    "1980": {
      title: "1980-е годы",
      intro: "Эпоха персональных компьютеров. Расцвет объектно-ориентированного подхода.",
      languages: [
        { name: "C++",         year: 1983, desc: "Расширение C с поддержкой ООП. Используется в играх и системном ПО." },
        { name: "Objective-C", year: 1984, desc: "Основной язык Apple до Swift. Добавил ООП к языку C." },
        { name: "Erlang",      year: 1986, desc: "Создан в Ericsson. Отличается высокой отказоустойчивостью." },
        { name: "Perl",        year: 1987, desc: "Мощный язык для обработки текста и системного администрирования." }
      ]
    },
    "1990": {
      title: "1990-е годы",
      intro: "Интернет изменил всё. Появились языки для веба и кроссплатформенной разработки.",
      languages: [
        { name: "Python",     year: 1991, desc: "Простой синтаксис. Сегодня — один из самых популярных языков мира." },
        { name: "Java",       year: 1995, desc: "«Написал один раз — запускай везде». Основа Android и корпоративного ПО." },
        { name: "JavaScript", year: 1995, desc: "Язык для браузеров. Создан за 10 дней. Сегодня — основа веба." },
        { name: "PHP",        year: 1995, desc: "Серверный веб-язык. Более 75% сайтов работают на PHP." },
        { name: "Ruby",       year: 1995, desc: "Создан для удобства программиста. Прославился благодаря Ruby on Rails." }
      ]
    },
    "2000": {
      title: "2000-е годы",
      intro: "Рост интернета и мобильных устройств. Языки стали безопаснее и производительнее.",
      languages: [
        { name: "C#",        year: 2000, desc: "Язык Microsoft для платформы .NET. Используется в играх (Unity) и корпоративном ПО." },
        { name: "Scala",     year: 2003, desc: "Объединяет ООП и функциональное программирование. Популярен в Big Data." },
        { name: "Groovy",    year: 2003, desc: "Динамический язык для JVM. Используется в Gradle и тестировании." },
        { name: "Go",        year: 2009, desc: "Создан Google. Быстрый, простой, с поддержкой параллелизма." }
      ]
    },
    "2010": {
      title: "2010-е годы",
      intro: "Мобильная революция и облачные технологии. Языки стали быстрее и удобнее.",
      languages: [
        { name: "Kotlin",     year: 2011, desc: "Официальный язык Android от Google. Совместим с Java." },
        { name: "TypeScript", year: 2012, desc: "JavaScript с типами от Microsoft. Повысил надёжность крупных приложений." },
        { name: "Swift",      year: 2014, desc: "Создан Apple для замены Objective-C. Язык для iOS и macOS." },
        { name: "Rust",       year: 2015, desc: "Безопасность памяти без сборщика мусора. Самый любимый язык по опросам Stack Overflow." }
      ]
    },
    "2020": {
      title: "2020-е годы",
      intro: "Эпоха искусственного интеллекта. Языки развиваются быстрее, ИИ помогает писать код.",
      languages: [
        { name: "Python (ИИ)", year: 2020, desc: "Главный язык эпохи ИИ. TensorFlow, PyTorch — всё на Python." },
        { name: "Mojo",        year: 2023, desc: "Совместим с Python, но работает в тысячи раз быстрее. Создан для ИИ-вычислений." },
        { name: "Carbon",      year: 2022, desc: "Экспериментальный преемник C++ от Google." },
        { name: "Zig",         year: 2016, desc: "Системный язык низкого уровня. Набирает популярность как альтернатива C." }
      ]
    }
  };

  var epochs = [
    { decade: "1950-е", key: "1950", desc: "Зарождение программирования" },
    { decade: "1960-е", key: "1960", desc: "Языки высокого уровня" },
    { decade: "1970-е", key: "1970", desc: "Структурное программирование" },
    { decade: "1980-е", key: "1980", desc: "Эра персональных компьютеров" },
    { decade: "1990-е", key: "1990", desc: "Интернет и веб" },
    { decade: "2000-е", key: "2000", desc: "Скрипты и платформы" },
    { decade: "2010-е", key: "2010", desc: "Мобильность и облака" },
    { decade: "2020-е", key: "2020", desc: "ИИ и современность" }
  ];

  // Заполняем кнопки эпох
  var grid = document.getElementById("epochGrid");
  epochs.forEach(function(e) {
    var btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = '<div class="decade">' + e.decade + '</div><div class="desc">' + e.desc + '</div>';
    btn.onclick = function() { showDetail(e.key); };
    grid.appendChild(btn);
  });

  function showMain() {
    document.getElementById("main").style.display = "block";
    document.getElementById("detail").style.display = "none";
  }

  function showDetail(key) {
    var info = data[key];
    document.getElementById("detailTitle").textContent = info.title;
    document.getElementById("detailIntro").textContent = info.intro;
    var container = document.getElementById("detailLanguages");
    container.innerHTML = "";
    info.languages.forEach(function(lang) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        '<div class="card-header">' +
          '<span class="lang-name">' + lang.name + '</span>' +
          '<span class="lang-year">' + lang.year + ' г.</span>' +
        '</div>' +
        '<p class="lang-desc">' + lang.desc + '</p>';
      container.appendChild(card);
    });
    document.getElementById("main").style.display = "none";
    document.getElementById("detail").style.display = "block";
  }

  // Показываем главную при старте
  showMain();
</script>
</body>
</html>`;



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
  const [copied, setCopied] = useState(false);

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

      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Исходный код сайта (чистый HTML)</h2>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 16, lineHeight: 1.6 }}>
        Ниже — полный код сайта на чистом HTML + JavaScript. Скопируй его, вставь в файл <strong>index.html</strong> и открой в любом браузере — без установки каких-либо программ.
      </p>

      <div style={{ border: "1px solid #ccc", borderRadius: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #ddd" }}>
          <span style={{ fontFamily: "monospace", fontSize: 13 }}>index.html</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(htmlCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            style={{ fontSize: 13, cursor: "pointer", padding: "4px 12px", border: "1px solid #ccc", borderRadius: 3, background: "white" }}
          >
            {copied ? "✓ Скопировано!" : "Скопировать"}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "16px",
            background: "#f7f7f7",
            fontSize: 12,
            lineHeight: 1.7,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "monospace",
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          {htmlCode}
        </pre>
      </div>
    </div>
  );
};

export default Index;