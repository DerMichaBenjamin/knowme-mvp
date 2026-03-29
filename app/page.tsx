\
"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "de" | "es" | "fr" | "zh";

type Statement = {
  id: string;
  text: string;
  answer: boolean;
};

type Result = {
  name: string;
  score: number;
  total: number;
  time: string;
};

const UI: Record<Lang, Record<string, string | string[]>> = {
  en: {
    landingBadge: "MVP demo",
    landingTitle: "How well do your friends really know you?",
    landingText: "Create a quick true-or-false challenge, share it, and see who actually knows you best.",
    noSignup: "Takes 30 seconds. No signup. Challenge your friends.",
    createQuiz: "Create your quiz",
    tryDemo: "Try a demo quiz",
    createTitle: "Create your quiz",
    createText: "Add 5–10 statements about yourself. Everything stays on one screen so it feels fast.",
    quizTitle: "Quiz title",
    addStatement: "Add another statement",
    correctAnswer: "Correct answer",
    showAnswers: "Show correct answers after quiz",
    optionalSetting: "Optional creator setting",
    continueToShare: "Continue to share",
    shareReady: "Your quiz is ready",
    shareTitle: "Send the challenge now",
    shareText: "Built for DMs and groups. The faster you send it, the more people will play.",
    shareHint: "Tip: send it as a challenge, not just a link.",
    copyLink: "Copy challenge text",
    copied: "Copied",
    shareWhatsApp: "Challenge on WhatsApp",
    shareInstagram: "Post challenge",
    previewQuiz: "Preview quiz",
    back: "Back",
    dashboard: "Creator dashboard",
    playQuiz: "Play quiz",
    enterName: "Enter your name to start. This will take about 20 seconds.",
    yourName: "Your name or nickname",
    startQuiz: "Start quiz",
    statement: "Statement",
    true: "True",
    false: "False",
    yourResult: "Your result",
    averageScore: "Average score",
    correctAnswers: "Correct answers",
    createOwn: "Create your own quiz",
    shareResult: "Send this back",
    topScore: "Top score",
    playedAt: "played",
    reportQuiz: "Report quiz",
    reportTitle: "Report this quiz",
    reportReason: "Reason",
    reportText: "Optional details",
    submitReport: "Submit report",
    cancel: "Cancel",
    reportSubmitted: "Report submitted",
    reportReasons: ["False information", "Offensive content", "Privacy violation"],
    resultHigh: "Very good. Hard to beat.",
    resultMid: "Not bad, but you missed some obvious ones.",
    resultLow: "Rough result. You might need another conversation.",
    avgHint: "Can you beat the top score?",
    creatorDesc: "Simple MVP view: who played, what score they got, and when.",
    view: "View",
    resultNudge: "Be honest: better than the others?",
    resultOutro: "Send this back or create your own challenge now.",
    language: "Language"
  },
  de: {
    landingBadge: "MVP-Demo",
    landingTitle: "Wie gut kennen dich deine Freunde wirklich?",
    landingText: "Erstelle eine kurze Wahr/Falsch-Challenge, teile sie und finde heraus, wer dich wirklich gut kennt.",
    noSignup: "Dauert 30 Sekunden. Kein Login. Fordere deine Freunde heraus.",
    createQuiz: "Quiz erstellen",
    tryDemo: "Demo ausprobieren",
    createTitle: "Erstelle dein Quiz",
    createText: "Füge 5–10 Aussagen über dich hinzu. Alles bleibt auf einem Screen, damit es schnell geht.",
    quizTitle: "Quiz-Titel",
    addStatement: "Weitere Aussage hinzufügen",
    correctAnswer: "Richtige Antwort",
    showAnswers: "Richtige Antworten nach dem Quiz anzeigen",
    optionalSetting: "Optionale Einstellung",
    continueToShare: "Weiter zum Teilen",
    shareReady: "Dein Quiz ist fertig",
    shareTitle: "Challenge jetzt verschicken",
    shareText: "Perfekt für DMs und Gruppen. Je schneller du es schickst, desto mehr Leute spielen.",
    shareHint: "Tipp: Schick es als Challenge, nicht nur als Link.",
    copyLink: "Challenge-Text kopieren",
    copied: "Kopiert",
    shareWhatsApp: "Per WhatsApp herausfordern",
    shareInstagram: "Challenge posten",
    previewQuiz: "Quiz ansehen",
    back: "Zurück",
    dashboard: "Creator-Dashboard",
    playQuiz: "Quiz spielen",
    enterName: "Gib deinen Namen ein, um zu starten. Das dauert ungefähr 20 Sekunden.",
    yourName: "Dein Name oder Spitzname",
    startQuiz: "Quiz starten",
    statement: "Aussage",
    true: "Wahr",
    false: "Falsch",
    yourResult: "Dein Ergebnis",
    averageScore: "Durchschnittspunktzahl",
    correctAnswers: "Richtige Antworten",
    createOwn: "Eigenes Quiz erstellen",
    shareResult: "Zurückschicken",
    topScore: "Top-Score",
    playedAt: "gespielt",
    reportQuiz: "Quiz melden",
    reportTitle: "Dieses Quiz melden",
    reportReason: "Grund",
    reportText: "Optionale Details",
    submitReport: "Meldung senden",
    cancel: "Abbrechen",
    reportSubmitted: "Meldung gesendet",
    reportReasons: ["Falsche Informationen", "Beleidigender Inhalt", "Datenschutzverletzung"],
    resultHigh: "Sehr gut. Schwer zu schlagen.",
    resultMid: "Nicht schlecht, aber ein paar offensichtliche Dinge hast du verpasst.",
    resultLow: "Schwieriges Ergebnis. Ihr solltet vielleicht nochmal reden.",
    avgHint: "Kannst du den Top-Score schlagen?",
    creatorDesc: "Einfache MVP-Ansicht: wer gespielt hat, welcher Score erreicht wurde und wann.",
    view: "Ansehen",
    resultNudge: "Jetzt ehrlich: besser als die anderen?",
    resultOutro: "Schick das Ergebnis zurück oder mach direkt deine eigene Challenge.",
    language: "Sprache"
  },
  es: {
    landingBadge: "Demo MVP",
    landingTitle: "¿Qué tan bien te conocen tus amigos?",
    landingText: "Crea un reto rápido de verdadero o falso, compártelo y descubre quién realmente te conoce bien.",
    noSignup: "Tarda 30 segundos. Sin registro. Reta a tus amigos.",
    createQuiz: "Crear quiz",
    tryDemo: "Probar demo",
    createTitle: "Crea tu quiz",
    createText: "Añade 5–10 afirmaciones sobre ti. Todo queda en una sola pantalla para hacerlo rápido.",
    quizTitle: "Título del quiz",
    addStatement: "Añadir otra afirmación",
    correctAnswer: "Respuesta correcta",
    showAnswers: "Mostrar respuestas correctas al final",
    optionalSetting: "Opción del creador",
    continueToShare: "Continuar para compartir",
    shareReady: "Tu quiz está listo",
    shareTitle: "Envía el reto ahora",
    shareText: "Perfecto para grupos y mensajes. Cuanto antes lo envíes, más gente jugará.",
    shareHint: "Consejo: envíalo como reto, no solo como enlace.",
    copyLink: "Copiar texto del reto",
    copied: "Copiado",
    shareWhatsApp: "Retar por WhatsApp",
    shareInstagram: "Publicar reto",
    previewQuiz: "Vista previa",
    back: "Atrás",
    dashboard: "Panel del creador",
    playQuiz: "Jugar quiz",
    enterName: "Escribe tu nombre para empezar. Tarda unos 20 segundos.",
    yourName: "Tu nombre o apodo",
    startQuiz: "Empezar",
    statement: "Afirmación",
    true: "Verdadero",
    false: "Falso",
    yourResult: "Tu resultado",
    averageScore: "Puntuación media",
    correctAnswers: "Respuestas correctas",
    createOwn: "Crea tu propio quiz",
    shareResult: "Devuélveselo",
    topScore: "Mejor puntuación",
    playedAt: "jugó",
    reportQuiz: "Reportar quiz",
    reportTitle: "Reportar este quiz",
    reportReason: "Motivo",
    reportText: "Detalles opcionales",
    submitReport: "Enviar reporte",
    cancel: "Cancelar",
    reportSubmitted: "Reporte enviado",
    reportReasons: ["Información falsa", "Contenido ofensivo", "Violación de privacidad"],
    resultHigh: "Muy bien. Difícil de superar.",
    resultMid: "Nada mal, pero fallaste algunas bastante obvias.",
    resultLow: "Resultado duro. Quizá necesiten otra conversación.",
    avgHint: "¿Puedes superar la mejor puntuación?",
    creatorDesc: "Vista MVP simple: quién jugó, qué puntuación obtuvo y cuándo.",
    view: "Ver",
    resultNudge: "Ahora en serio: ¿mejor que los demás?",
    resultOutro: "Devuélvelo o crea tu propio reto ahora mismo.",
    language: "Idioma"
  },
  fr: {
    landingBadge: "Démo MVP",
    landingTitle: "À quel point tes amis te connaissent-ils ?",
    landingText: "Crée un défi vrai ou faux, partage-le et découvre qui te connaît vraiment bien.",
    noSignup: "30 secondes. Sans inscription. Défie tes amis.",
    createQuiz: "Créer un quiz",
    tryDemo: "Essayer la démo",
    createTitle: "Crée ton quiz",
    createText: "Ajoute 5 à 10 affirmations sur toi. Tout reste sur un seul écran pour aller vite.",
    quizTitle: "Titre du quiz",
    addStatement: "Ajouter une affirmation",
    correctAnswer: "Bonne réponse",
    showAnswers: "Afficher les bonnes réponses à la fin",
    optionalSetting: "Option du créateur",
    continueToShare: "Continuer vers le partage",
    shareReady: "Ton quiz est prêt",
    shareTitle: "Envoie le défi maintenant",
    shareText: "Parfait pour les messages et les groupes. Plus tu l’envoies vite, plus les gens joueront.",
    shareHint: "Conseil : envoie-le comme défi, pas seulement comme lien.",
    copyLink: "Copier le texte du défi",
    copied: "Copié",
    shareWhatsApp: "Défier sur WhatsApp",
    shareInstagram: "Publier le défi",
    previewQuiz: "Aperçu du quiz",
    back: "Retour",
    dashboard: "Tableau du créateur",
    playQuiz: "Jouer au quiz",
    enterName: "Entre ton nom pour commencer. Cela prend environ 20 secondes.",
    yourName: "Ton nom ou pseudo",
    startQuiz: "Commencer",
    statement: "Affirmation",
    true: "Vrai",
    false: "Faux",
    yourResult: "Ton résultat",
    averageScore: "Score moyen",
    correctAnswers: "Bonnes réponses",
    createOwn: "Créer ton propre quiz",
    shareResult: "Renvoyer ça",
    topScore: "Meilleur score",
    playedAt: "a joué",
    reportQuiz: "Signaler le quiz",
    reportTitle: "Signaler ce quiz",
    reportReason: "Raison",
    reportText: "Détails facultatifs",
    submitReport: "Envoyer",
    cancel: "Annuler",
    reportSubmitted: "Signalement envoyé",
    reportReasons: ["Fausse information", "Contenu offensant", "Violation de la vie privée"],
    resultHigh: "Très bien. Difficile à battre.",
    resultMid: "Pas mal, mais tu as raté quelques évidences.",
    resultLow: "Résultat difficile. Il faudra peut-être reparler.",
    avgHint: "Peux-tu battre le meilleur score ?",
    creatorDesc: "Vue MVP simple : qui a joué, quel score a été obtenu et quand.",
    view: "Voir",
    resultNudge: "Soyons honnêtes : meilleur que les autres ?",
    resultOutro: "Renvoie ce résultat ou crée ton propre défi maintenant.",
    language: "Langue"
  },
  zh: {
    landingBadge: "MVP 演示",
    landingTitle: "你的朋友到底有多了解你？",
    landingText: "创建一个简单的判断题挑战，分享给朋友，看看谁最了解你。",
    noSignup: "30 秒完成，无需注册。马上挑战你的朋友。",
    createQuiz: "创建测验",
    tryDemo: "体验演示",
    createTitle: "创建你的测验",
    createText: "添加 5 到 10 条关于你自己的陈述。所有内容都在一个页面中完成，更快更直接。",
    quizTitle: "测验标题",
    addStatement: "添加更多陈述",
    correctAnswer: "正确答案",
    showAnswers: "测验结束后显示正确答案",
    optionalSetting: "创建者可选设置",
    continueToShare: "继续分享",
    shareReady: "你的测验已准备好",
    shareTitle: "现在发送挑战",
    shareText: "非常适合群聊和私聊。发得越快，参与的人越多。",
    shareHint: "提示：把它当成挑战发出去，不只是一个链接。",
    copyLink: "复制挑战文本",
    copied: "已复制",
    shareWhatsApp: "通过 WhatsApp 发起挑战",
    shareInstagram: "发布挑战",
    previewQuiz: "预览测验",
    back: "返回",
    dashboard: "创建者面板",
    playQuiz: "开始答题",
    enterName: "输入你的名字后开始，整个过程大约 20 秒。",
    yourName: "你的名字或昵称",
    startQuiz: "开始",
    statement: "陈述",
    true: "正确",
    false: "错误",
    yourResult: "你的结果",
    averageScore: "平均得分",
    correctAnswers: "正确答案",
    createOwn: "创建你自己的测验",
    shareResult: "发回去",
    topScore: "最高分",
    playedAt: "作答时间",
    reportQuiz: "举报测验",
    reportTitle: "举报此测验",
    reportReason: "原因",
    reportText: "补充说明（可选）",
    submitReport: "提交举报",
    cancel: "取消",
    reportSubmitted: "举报已提交",
    reportReasons: ["虚假信息", "冒犯性内容", "隐私侵权"],
    resultHigh: "很好。这个分数很难超过。",
    resultMid: "还不错，但你漏掉了几个挺明显的问题。",
    resultLow: "分数不太理想，也许你们应该再聊聊。",
    avgHint: "你能超过最高分吗？",
    creatorDesc: "简单的 MVP 视图：谁参加了、得了多少分、何时参与。",
    view: "查看",
    resultNudge: "说真的：你比其他人更了解吗？",
    resultOutro: "把结果发回去，或者现在就创建你自己的挑战。",
    language: "语言"
  }
};

const defaultStatements: Record<Lang, Omit<Statement, "id">[]> = {
  en: [
    { text: "I prefer coffee over tea.", answer: true },
    { text: "I hate traveling by plane.", answer: false },
    { text: "My favorite season is summer.", answer: true },
    { text: "I have never been to a concert.", answer: false },
    { text: "I am usually a morning person.", answer: false }
  ],
  de: [
    { text: "Ich trinke lieber Kaffee als Tee.", answer: true },
    { text: "Ich hasse Flugreisen.", answer: false },
    { text: "Meine Lieblingsjahreszeit ist der Sommer.", answer: true },
    { text: "Ich war noch nie auf einem Konzert.", answer: false },
    { text: "Ich bin meistens ein Morgenmensch.", answer: false }
  ],
  es: [
    { text: "Prefiero café antes que té.", answer: true },
    { text: "Odio viajar en avión.", answer: false },
    { text: "Mi estación favorita es el verano.", answer: true },
    { text: "Nunca he ido a un concierto.", answer: false },
    { text: "Normalmente soy madrugador.", answer: false }
  ],
  fr: [
    { text: "Je préfère le café au thé.", answer: true },
    { text: "Je déteste voyager en avion.", answer: false },
    { text: "Ma saison préférée est l’été.", answer: true },
    { text: "Je ne suis jamais allé à un concert.", answer: false },
    { text: "Je suis plutôt du matin.", answer: false }
  ],
  zh: [
    { text: "比起茶，我更喜欢咖啡。", answer: true },
    { text: "我讨厌坐飞机旅行。", answer: false },
    { text: "我最喜欢的季节是夏天。", answer: true },
    { text: "我从来没去过演唱会。", answer: false },
    { text: "我通常是个早起的人。", answer: false }
  ]
};

const starterParticipants: Result[] = [
  { name: "Sarah", score: 8, total: 10, time: "Today, 14:12" },
  { name: "Mike", score: 6, total: 10, time: "Today, 13:47" },
  { name: "Lena", score: 9, total: 10, time: "Today, 12:58" },
  { name: "Chris", score: 5, total: 10, time: "Yesterday, 20:11" }
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function mapStatements(lang: Lang): Statement[] {
  return defaultStatements[lang].map((s) => ({ ...s, id: uid() }));
}

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function ChallengeText({
  text,
  secondary = false
}: {
  text: string;
  secondary?: boolean;
}) {
  return <p className={secondary ? "helper secondary" : "helper"}>{text}</p>;
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const t = UI[lang] as Record<string, string | string[]>;
  const [screen, setScreen] = useState("landing");
  const [quizTitle, setQuizTitle] = useState("How well do you know Alex?");
  const [showAnswers, setShowAnswers] = useState(false);
  const [statements, setStatements] = useState<Statement[]>(mapStatements("en"));
  const [quizId, setQuizId] = useState("demo-alex");
  const [shareUrl, setShareUrl] = useState("knowme-test.vercel.app/q/demo-alex");
  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playIndex, setPlayIndex] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<boolean[]>([]);
  const [results, setResults] = useState<Result[]>(starterParticipants);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState((UI.en.reportReasons as string[])[0]);
  const [reportText, setReportText] = useState("");
  const [reportDone, setReportDone] = useState(false);

  useEffect(() => {
    const savedQuiz = safeGet("knowme-current-quiz", null as null | {
      lang: Lang;
      quizTitle: string;
      showAnswers: boolean;
      statements: Statement[];
      quizId: string;
    });
    const savedResults = safeGet("knowme-results", starterParticipants);

    if (savedQuiz) {
      setLang(savedQuiz.lang || "en");
      setQuizTitle(savedQuiz.quizTitle || "How well do you know Alex?");
      setShowAnswers(Boolean(savedQuiz.showAnswers));
      setStatements(savedQuiz.statements?.length ? savedQuiz.statements : mapStatements("en"));
      setQuizId(savedQuiz.quizId || "demo-alex");
      setShareUrl(`knowme-test.vercel.app/q/${savedQuiz.quizId || "demo-alex"}`);
    }
    setResults(savedResults);
  }, []);

  useEffect(() => {
    safeSet("knowme-current-quiz", { lang, quizTitle, showAnswers, statements, quizId });
  }, [lang, quizTitle, showAnswers, statements, quizId]);

  useEffect(() => {
    safeSet("knowme-results", results);
  }, [results]);

  const cleanStatements = useMemo(
    () => statements.filter((item) => item.text.trim()),
    [statements]
  );

  const score = useMemo(
    () =>
      playerAnswers.reduce(
        (acc, current, index) => acc + (current === cleanStatements[index]?.answer ? 1 : 0),
        0
      ),
    [playerAnswers, cleanStatements]
  );

  const averageScore = useMemo(() => {
    if (!results.length) return "0.0";
    const total = results.reduce((acc, item) => acc + item.score, 0);
    return (total / results.length).toFixed(1);
  }, [results]);

  const topScore = useMemo(() => {
    if (!results.length) return null;
    return [...results].sort((a, b) => b.score - a.score)[0];
  }, [results]);

  const progress = cleanStatements.length
    ? ((playIndex + 1) / cleanStatements.length) * 100
    : 0;

  const updateStatement = (id: string, patch: Partial<Statement>) => {
    setStatements((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addStatement = () => {
    setStatements((prev) => [...prev, { id: uid(), text: "", answer: true }]);
  };

  const handleLanguageChange = (nextLang: Lang) => {
    setLang(nextLang);
    const currentTitleIsDefault =
      quizTitle === "How well do you know Alex?" ||
      quizTitle === "Wie gut kennst du Alex?" ||
      quizTitle === "¿Qué tanto conoces a Alex?" ||
      quizTitle === "À quel point connais-tu Alex ?" ||
      quizTitle === "你有多了解 Alex？";

    if (currentTitleIsDefault) {
      const defaultTitles: Record<Lang, string> = {
        en: "How well do you know Alex?",
        de: "Wie gut kennst du Alex?",
        es: "¿Qué tanto conoces a Alex?",
        fr: "À quel point connais-tu Alex ?",
        zh: "你有多了解 Alex？"
      };
      setQuizTitle(defaultTitles[nextLang]);
      setStatements(mapStatements(nextLang));
    }
    setReportReason((UI[nextLang].reportReasons as string[])[0]);
  };

  const goToShare = () => {
    const id = uid();
    setQuizId(id);
    setShareUrl(`knowme-test.vercel.app/q/${id}`);
    setScreen("share");
  };

  const startQuiz = () => {
    setPlayIndex(0);
    setPlayerAnswers([]);
    setPlayerName("");
    setScreen("play_intro");
  };

  const answerQuestion = (value: boolean) => {
    const nextAnswers = [...playerAnswers, value];
    setPlayerAnswers(nextAnswers);

    if (playIndex < cleanStatements.length - 1) {
      setPlayIndex((prev) => prev + 1);
      return;
    }

    const nextScore = nextAnswers.reduce(
      (acc, current, index) => acc + (current === cleanStatements[index]?.answer ? 1 : 0),
      0
    );

    const nextResult: Result = {
      name: playerName || "Anonymous",
      score: nextScore,
      total: cleanStatements.length,
      time: new Date().toLocaleString()
    };

    setResults((prev) => [nextResult, ...prev]);
    setScreen("result");
  };

  const restartPrototype = () => {
    setScreen("landing");
    setPlayIndex(0);
    setPlayerAnswers([]);
    setPlayerName("");
    setCopied(false);
  };

  const generateChallengeText = () => {
    const total = cleanStatements.length || 5;
    const randomTarget = Math.max(3, Math.min(total, Math.floor(Math.random() * total) + 1));

    if (lang === "de") {
      return `Du schaffst keine ${randomTarget}/${total} 😄 Beweis es: https://${shareUrl}`;
    }
    if (lang === "es") {
      return `No sacas más de ${randomTarget}/${total} 😄 Demuéstralo: https://${shareUrl}`;
    }
    if (lang === "fr") {
      return `Tu ne feras pas plus de ${randomTarget}/${total} 😄 Prouve-le : https://${shareUrl}`;
    }
    if (lang === "zh") {
      return `你拿不到超过 ${randomTarget}/${total} 😄 试试看：https://${shareUrl}`;
    }
    return `You won't get more than ${randomTarget}/${total} 😄 Prove it: https://${shareUrl}`;
  };

  const handleCopy = async () => {
    const text = generateChallengeText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const submitReport = () => {
    const reports = safeGet<{ quizId: string; reportReason: string; reportText: string; createdAt: string }[]>(
      "knowme-reports",
      []
    );
    reports.push({
      quizId,
      reportReason,
      reportText,
      createdAt: new Date().toISOString()
    });
    safeSet("knowme-reports", reports);
    setReportDone(true);
    setTimeout(() => {
      setReportDone(false);
      setReportOpen(false);
      setReportText("");
    }, 1000);
  };

  const showResultText = () => {
    if (score >= Math.ceil(cleanStatements.length * 0.8)) return String(t.resultHigh);
    if (score >= Math.ceil(cleanStatements.length * 0.5)) return String(t.resultMid);
    return String(t.resultLow);
  };

  return (
    <main className="page">
      <div className="shell">
        <header className="topbar">
          <div>
            <div className="eyebrow">KnowMe</div>
            <h1 className="pageTitle">MVP Codebase Demo</h1>
          </div>

          <div className="topbarActions">
            <div className="langBox">
              <span>{String(t.language)}:</span>
              <select value={lang} onChange={(e) => handleLanguageChange(e.target.value as Lang)}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="zh">中文</option>
              </select>
            </div>

            <div className="navButtons">
              <button className="ghostButton" onClick={() => setScreen("landing")}>Landing</button>
              <button className="ghostButton" onClick={() => setScreen("create")}>Create</button>
              <button className="ghostButton" onClick={() => setScreen("share")}>Share</button>
              <button className="ghostButton" onClick={() => setScreen("dashboard")}>Dashboard</button>
            </div>
          </div>
        </header>

        <div className="layout">
          <section>
            {screen === "landing" && (
              <div className="card heroCard">
                <div className="badge">{String(t.landingBadge)}</div>
                <h2 className="heroTitle">{String(t.landingTitle)}</h2>
                <p className="heroText">{String(t.landingText)}</p>
                <ChallengeText text={String(t.noSignup)} secondary />
                <div className="buttonRow">
                  <button className="primaryButton" onClick={() => setScreen("create")}>
                    {String(t.createQuiz)}
                  </button>
                  <button className="ghostButton big" onClick={startQuiz}>
                    {String(t.tryDemo)}
                  </button>
                </div>
              </div>
            )}

            {screen === "create" && (
              <div className="card">
                <h2>{String(t.createTitle)}</h2>
                <p className="cardText">{String(t.createText)}</p>

                <label className="label">{String(t.quizTitle)}</label>
                <input
                  className="textInput"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />

                <div className="stack">
                  {statements.map((item, index) => (
                    <div className="statementCard" key={item.id}>
                      <div className="statementMain">
                        <div className="miniLabel">{String(t.statement)} {index + 1}</div>
                        <input
                          className="textInput"
                          value={item.text}
                          onChange={(e) => updateStatement(item.id, { text: e.target.value })}
                          placeholder={
                            lang === "de"
                              ? "z. B. Ich hasse Bier"
                              : lang === "es"
                                ? "p. ej. odio la cerveza"
                                : lang === "fr"
                                  ? "ex. je déteste la bière"
                                  : lang === "zh"
                                    ? "例如：我讨厌啤酒"
                                    : "e.g. I hate beer"
                          }
                        />
                      </div>

                      <div className="answerBox">
                        <span className="answerLabel">{String(t.correctAnswer)}</span>
                        <div className="buttonRow">
                          <button
                            className={item.answer ? "smallPrimaryButton" : "smallGhostButton"}
                            onClick={() => updateStatement(item.id, { answer: true })}
                          >
                            {String(t.true)}
                          </button>
                          <button
                            className={!item.answer ? "smallPrimaryButton" : "smallGhostButton"}
                            onClick={() => updateStatement(item.id, { answer: false })}
                          >
                            {String(t.false)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="betweenRow">
                  <button className="ghostButton" onClick={addStatement}>
                    {String(t.addStatement)}
                  </button>

                  <div className="switchBox">
                    <div>
                      <div className="switchTitle">{String(t.showAnswers)}</div>
                      <div className="switchHint">{String(t.optionalSetting)}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showAnswers}
                      onChange={(e) => setShowAnswers(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="rightRow">
                  <button
                    className="primaryButton"
                    onClick={goToShare}
                    disabled={cleanStatements.length < 3}
                  >
                    {String(t.continueToShare)}
                  </button>
                </div>
              </div>
            )}

            {screen === "share" && (
              <div className="card">
                <div className="badge success">{String(t.shareReady)}</div>
                <h2>{String(t.shareTitle)}</h2>
                <p className="cardText">{String(t.shareText)}</p>

                <div className="shareBox">
                  <div className="shareUrl">https://{shareUrl}</div>
                  <button className="ghostButton" onClick={handleCopy}>
                    {copied ? String(t.copied) : String(t.copyLink)}
                  </button>
                </div>

                <ChallengeText text={String(t.shareHint)} />

                <div className="buttonRow">
                  <button className="primaryButton">{String(t.shareWhatsApp)}</button>
                  <button className="ghostButton">{String(t.shareInstagram)}</button>
                  <button className="ghostButton" onClick={startQuiz}>
                    {String(t.previewQuiz)}
                  </button>
                </div>

                <div className="buttonRow topGap">
                  <button className="ghostButton" onClick={() => setScreen("create")}>
                    {String(t.back)}
                  </button>
                  <button className="primaryButton" onClick={() => setScreen("dashboard")}>
                    {String(t.dashboard)}
                  </button>
                </div>
              </div>
            )}

            {screen === "play_intro" && (
              <div className="card narrow">
                <div className="eyebrow">{String(t.playQuiz)}</div>
                <h2>{quizTitle}</h2>
                <p className="cardText">{String(t.enterName)}</p>
                <input
                  className="textInput"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder={String(t.yourName)}
                />
                <div className="topGap">
                  <button
                    className="primaryButton full"
                    onClick={() => setScreen("play")}
                    disabled={!playerName.trim()}
                  >
                    {String(t.startQuiz)}
                  </button>
                </div>
              </div>
            )}

            {screen === "play" && (
              <div className="card narrow">
                <div className="playMeta">
                  <span>{playerName || "Player"}</span>
                  <span>{playIndex + 1} / {cleanStatements.length}</span>
                </div>

                <div className="progressTrack">
                  <div className="progressBar" style={{ width: `${progress}%` }} />
                </div>

                <div className="miniLabel">{String(t.statement)} {playIndex + 1}</div>
                <h2>{cleanStatements[playIndex]?.text || "Untitled statement"}</h2>

                <div className="buttonRow">
                  <button className="primaryButton full" onClick={() => answerQuestion(true)}>
                    {String(t.true)}
                  </button>
                  <button className="ghostButton big full" onClick={() => answerQuestion(false)}>
                    {String(t.false)}
                  </button>
                </div>

                <div className="rightRow topGap">
                  <button className="linkButton" onClick={() => setReportOpen(true)}>
                    {String(t.reportQuiz)}
                  </button>
                </div>
              </div>
            )}

            {screen === "result" && (
              <div className="card narrow">
                <div className="eyebrow">{String(t.yourResult)}</div>
                <div className="score">{score}/{cleanStatements.length}</div>
                <p className="resultText">{showResultText()}</p>

                <div className="statsBox">
                  <div className="statsLabel">{String(t.averageScore)}</div>
                  <div className="statsScore">{averageScore}/{cleanStatements.length || 10}</div>
                  {topScore && (
                    <div className="statsTop">
                      {String(t.topScore)}: {topScore.name} ({topScore.score}/{topScore.total})
                    </div>
                  )}
                  <div className="statsHint">{String(t.avgHint)}</div>
                </div>

                {showAnswers && (
                  <div className="stack">
                    <div className="label">{String(t.correctAnswers)}</div>
                    {cleanStatements.map((item) => (
                      <div className="answerRow" key={item.id}>
                        <span>{item.text}</span>
                        <strong>{item.answer ? String(t.true) : String(t.false)}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <ChallengeText text={String(t.resultNudge)} />
                <div className="buttonRow">
                  <button className="primaryButton" onClick={restartPrototype}>
                    {String(t.createOwn)}
                  </button>
                  <button className="ghostButton big">
                    {String(t.shareResult)}
                  </button>
                </div>
                <ChallengeText text={String(t.resultOutro)} secondary />
              </div>
            )}

            {screen === "dashboard" && (
              <div className="card">
                <h2>{String(t.dashboard)}</h2>
                <p className="cardText">{String(t.creatorDesc)}</p>

                {topScore && (
                  <div className="statsBox">
                    <div className="statsLabel">{String(t.topScore)}</div>
                    <div className="statsScore">{topScore.name} ({topScore.score}/{topScore.total})</div>
                    <div className="statsHint">{results.length} results</div>
                  </div>
                )}

                <div className="stack">
                  {results.map((person) => (
                    <div className="resultRow" key={`${person.name}-${person.time}`}>
                      <div>
                        <div className="resultName">{person.name}</div>
                        <div className="resultTime">{String(t.playedAt)}: {person.time}</div>
                      </div>
                      <div className="resultScore">{person.score}/{person.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="card sidebar">
            <h3>MVP-ready scope</h3>
            <p className="cardText">What this codebase demonstrates</p>
            <ul className="sidebarList">
              <li>6-screen MVP flow</li>
              <li>Language selector with 5 languages</li>
              <li>Quiz creation on one screen</li>
              <li>One-question-per-screen play flow</li>
              <li>Local persistence via localStorage</li>
              <li>Result saving and basic dashboard</li>
              <li>Challenge-based share copy</li>
              <li>Report flow for legal MVP coverage</li>
              <li>Ready to swap localStorage for Supabase later</li>
            </ul>
          </aside>
        </div>
      </div>

      {reportOpen && (
        <div className="modalOverlay">
          <div className="modalCard">
            <h3>{String(t.reportTitle)}</h3>

            <label className="label">{String(t.reportReason)}</label>
            <select
              className="textInput"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              {(t.reportReasons as string[]).map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>

            <label className="label">{String(t.reportText)}</label>
            <textarea
              className="textArea"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />

            <div className="buttonRow topGap">
              <button className="ghostButton" onClick={() => setReportOpen(false)}>
                {String(t.cancel)}
              </button>
              <button className="primaryButton" onClick={submitReport}>
                {reportDone ? String(t.reportSubmitted) : String(t.submitReport)}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
