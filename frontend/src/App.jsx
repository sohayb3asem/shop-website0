import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

const translations = {
  ar: {
    title: 'منصة ريادة',
    welcome: 'أهلاً بك،',
    founder: 'مؤسس مشروع',
    investor: 'مستثمر',
    logout: 'تسجيل خروج',
    loginTitle: 'تسجيل الدخول',
    emailPlaceholder: 'البريد الإلكتروني',
    passPlaceholder: 'كلمة المرور',
    loginBtn: 'دخول',
    noAccount: 'ليس لديك حساب؟',
    registerNow: 'سجل الآن',
    registerTitle: 'إنشاء حساب جديد',
    namePlaceholder: 'الاسم',
    registerBtn: 'تسجيل',
    haveAccount: 'لديك حساب بالفعل؟',
    loginNow: 'سجل دخول',
    addProjectTitle: 'أضف مشروعاً جديداً للبحث عن تمويل',
    projTitlePlaceholder: 'عنوان المشروع',
    projDescPlaceholder: 'وصف المشروع',
    fundingNeededPlaceholder: 'المبلغ المطلوب للتمويل ($)',
    publishBtn: 'نشر المشروع',
    manageTasks: 'إدارة مهام المشروع',
    newTaskPlaceholder: 'مهمة جديدة...',
    addBtn: 'إضافة',
    availableInvestors: 'المستثمرون المتاحون',
    interests: 'الاهتمامات:',
    maxFunding: 'الحد الأقصى للتمويل:',
    contactBtn: 'تواصل',
    latestStartups: 'أحدث المشاريع الناشئة',
    noProjects: 'لا توجد مشاريع متاحة حالياً.',
    fundingNeededText: 'التمويل المطلوب:',
    investBtn: 'الاستثمار في هذا المشروع',
    testAccountsTitle: 'حسابات تجريبية (قم بتسجيل حساب جديد إذا أردت):',
    testAccountsDesc: 'يمكنك إنشاء حساب جديد لتجربة النظام.',
    projAddedSuccess: 'تم إضافة مشروعك بنجاح!',
    connError: 'حدث خطأ في الاتصال بالخادم',
    invalidCreds: 'بيانات الدخول غير صحيحة'
  },
  fr: {
    title: 'Plateforme Riyada',
    welcome: 'Bienvenue,',
    founder: 'Fondateur',
    investor: 'Investisseur',
    logout: 'Déconnexion',
    loginTitle: 'Connexion',
    emailPlaceholder: 'E-mail',
    passPlaceholder: 'Mot de passe',
    loginBtn: 'Se connecter',
    noAccount: 'Pas de compte ?',
    registerNow: 'S\'inscrire',
    registerTitle: 'Créer un nouveau compte',
    namePlaceholder: 'Nom',
    registerBtn: 'S\'inscrire',
    haveAccount: 'Vous avez déjà un compte ?',
    loginNow: 'Se connecter',
    addProjectTitle: 'Ajouter un nouveau projet',
    projTitlePlaceholder: 'Titre du projet',
    projDescPlaceholder: 'Description du projet',
    fundingNeededPlaceholder: 'Financement requis ($)',
    publishBtn: 'Publier le projet',
    manageTasks: 'Gérer les tâches',
    newTaskPlaceholder: 'Nouvelle tâche...',
    addBtn: 'Ajouter',
    availableInvestors: 'Investisseurs disponibles',
    interests: 'Intérêts :',
    maxFunding: 'Investissement max :',
    contactBtn: 'Contacter',
    latestStartups: 'Dernières Startups',
    noProjects: 'Aucun projet disponible pour le moment.',
    fundingNeededText: 'Financement requis :',
    investBtn: 'Investir dans ce projet',
    testAccountsTitle: 'Comptes de test (créez-en un nouveau si vous le souhaitez) :',
    testAccountsDesc: 'Vous pouvez créer un nouveau compte pour essayer le système.',
    projAddedSuccess: 'Votre projet a été ajouté avec succès !',
    connError: 'Erreur de connexion au serveur',
    invalidCreds: 'Identifiants invalides'
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'register', 'dashboard'
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    // تحديث اتجاه الصفحة بناءً على اللغة (rtl للعربية، ltr للفرنسية)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="app-container">
      <header>
        <h1>{t.title}</h1>
        <div className="header-actions">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="lang-select">
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
          </select>
          {user && (
            <div className="user-info">
              <span>{t.welcome} {user.name} ({user.role === 'founder' ? t.founder : t.investor})</span>
              <button onClick={() => setUser(null)} className="btn-logout">{t.logout}</button>
            </div>
          )}
        </div>
      </header>
      
      <main>
        {!user ? (
          view === 'login' 
            ? <Login setView={setView} setUser={setUser} t={t} /> 
            : <Register setView={setView} setUser={setUser} t={t} />
        ) : (
          user.role === 'founder' 
            ? <FounderDashboard user={user} t={t} /> 
            : <InvestorDashboard user={user} t={t} />
        )}
      </main>
    </div>
  );
}

function Login({ setView, setUser, t }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        alert(t.invalidCreds || data.error);
      }
    } catch (err) {
      console.error(err);
      alert(t.connError);
    }
  };

  return (
    <div className="auth-container">
      <h2>{t.loginTitle}</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder={t.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder={t.passPlaceholder} value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{t.loginBtn}</button>
      </form>
      <p>{t.noAccount} <span onClick={() => setView('register')} className="link">{t.registerNow}</span></p>
      
      <div className="test-accounts">
        <p><strong>{t.testAccountsTitle}</strong></p>
        <p>{t.testAccountsDesc}</p>
      </div>
    </div>
  );
}

function Register({ setView, setUser, t }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('founder');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>{t.registerTitle}</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder={t.namePlaceholder} value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder={t.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder={t.passPlaceholder} value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="founder">{t.founder}</option>
          <option value="investor">{t.investor}</option>
        </select>
        <button type="submit">{t.registerBtn}</button>
      </form>
      <p>{t.haveAccount} <span onClick={() => setView('login')} className="link">{t.loginNow}</span></p>
    </div>
  );
}

function FounderDashboard({ user, t }) {
  const [investors, setInvestors] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingNeeded, setFundingNeeded] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'إعداد دراسة الجدوى / Étude de faisabilité', completed: true },
    { id: 2, text: 'تجهيز العرض التقديمي (Pitch Deck)', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/investors`)
      .then(res => res.json())
      .then(data => setInvestors(data))
      .catch(console.error);
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ founderId: user.id, title, description, fundingNeeded: Number(fundingNeeded) })
    });
    alert(t.projAddedSuccess);
    setTitle('');
    setDescription('');
    setFundingNeeded('');
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h3>{t.manageTasks}</h3>
        <form onSubmit={addTask} style={{ flexDirection: 'row', gap: '10px', marginBottom: '15px' }}>
          <input type="text" placeholder={t.newTaskPlaceholder} value={newTask} onChange={e => setNewTask(e.target.value)} style={{ flex: 1 }} />
          <button type="submit">{t.addBtn}</button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '10px', background: '#f9fafb', borderRadius: '4px' }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '20px', height: '20px' }} />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1, color: '#000' }}>{task.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>{t.addProjectTitle}</h3>
        <form onSubmit={handleAddProject}>
          <input type="text" placeholder={t.projTitlePlaceholder} value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder={t.projDescPlaceholder} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
          <input type="number" placeholder={t.fundingNeededPlaceholder} value={fundingNeeded} onChange={e => setFundingNeeded(e.target.value)} required />
          <button type="submit">{t.publishBtn}</button>
        </form>
      </div>

      <div className="card">
        <h3>{t.availableInvestors}</h3>
        <div className="grid">
          {investors.map(inv => (
            <div key={inv.id} className="item-card">
              <h4>{inv.name}</h4>
              <p><strong>{t.interests}</strong> {inv.interests}</p>
              <p><strong>{t.maxFunding}</strong> ${inv.maxInvestment}</p>
              <button>{t.contactBtn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestorDashboard({ user, t }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard">
      <h2>{t.latestStartups}</h2>
      <div className="grid">
        {projects.length === 0 ? <p>{t.noProjects}</p> : null}
        {projects.map(proj => (
          <div key={proj.id} className="item-card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <p className="funding"><strong>{t.fundingNeededText}</strong> ${proj.fundingNeeded}</p>
            <button>{t.investBtn}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
