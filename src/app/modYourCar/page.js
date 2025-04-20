'use client';

import Link from "next/link"; // Import Link for navigation

export default function HowToModYourCar() {
  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>🔧 Как да модифицираш своя автомобил</h1>
        <p style={styles.tagline}>Открий най-добрите подобрения за стил, мощност и безопасност.</p>
      </div>

      {/* Popular Mods */}
      <Section
        title="Популярни модификации"
        mods={[
          {
            title: 'Подобрения на двигателя',
            image: '/images/Engine mods.webp',
            description: 'Подобренията на двигателя са сърцето на силовия тунинг...',
            items: [
              'Cold Air Intakes: По-студен въздух за повече мощност.',
              'Системи за принудително пълнене: Турбо или суперчарджър за максимално ускорение.',
              'Изпускателни системи: Подобрен поток, по-добър звук.',
              'ECU настройка: Прецизен контрол върху двигателя.'
            ],
            buttonText: 'Пазарувай модификации на двигателя',
            link: '/shop?category=engine' // Example of linking to shop with a category filter
          },
          {
            title: 'Окачване и спирачки',
            image: '/images/suspension mods.jpg',
            description: 'Подобри управлението, сцеплението и безопасността с правилното окачване...',
            items: [
              'Coilovers: Регулируема височина и твърдост.',
              'Спортни спирачки: Вентилирани дискове и по-добро спиране.',
              'Стабилизиращи щанги: По-малко наклон при завиване.',
              'Китове за камбър: Максимално сцепление.'
            ],
            buttonText: 'Пазарувай окачване и спирачки',
            link: '/shop?category=suspension' // Example of linking to shop with a category filter
          },
          {
            title: 'Аеродинамични модификации',
            image: '/images/aero mods.webp',
            description: 'Подобри аеродинамиката и визията на колата си...',
            items: [
              'Спойлери: Притискателна сила и агресивен стил.',
              'Сплитери: Контрол над въздушния поток.',
              'Дифузьори: Минимално съпротивление, максимална стабилност.'
            ],
            buttonText: 'Пазарувай аеро модификации',
            link: '/shop?category=aero' // Example of linking to shop with a category filter
          }
        ]}
      />

      {/* Legal Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Правна съвместимост</h2>
        <div style={styles.legalWrapper}>
          <LegalCard
            title="Съответствие с емисиите"
            points={[
              'Катализатори с висока пропускливост – екологични и ефективни.',
              'Запазване на контролни сензори и катализатори.',
              'CARB-одобрени ECU настройки.'
            ]}
          />
          <LegalCard
            title="Стандарти за безопасност"
            points={[
              'Компоненти с DOT сертификат.',
              'Професионален монтаж за сигурност.',
              'Документация за всички модове.'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// Section Component
const Section = ({ title, mods }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    {mods.map((mod, idx) => (
      <div key={idx} style={styles.card}>
        <img src={mod.image} alt={mod.title} style={styles.image} />
        <div style={styles.cardContent}>
          <h3 style={styles.cardTitle}>{mod.title}</h3>
          <p style={styles.cardText}>{mod.description}</p>
          <ul style={styles.list}>
            {mod.items.map((item, i) => (
              <li key={i} style={styles.listItem}>✅ {item}</li>
            ))}
          </ul>
          {/* Button that links to the Shop page with category filter */}
          <Link href={mod.link} style={styles.button}>
            {mod.buttonText}
          </Link>
        </div>
      </div>
    ))}
  </div>
);

// Legal Card
const LegalCard = ({ title, points }) => (
  <div style={styles.legalCard}>
    <h3 style={styles.cardTitle}>{title}</h3>
    <ul style={styles.list}>
      {points.map((point, idx) => (
        <li key={idx} style={styles.listItem}>📌 {point}</li>
      ))}
    </ul>
  </div>
);

// Styles
const styles = {
  pageContainer: {
    backgroundColor: '#111',
    color: '#fff',
    padding: '2rem',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  mainTitle: {
    fontSize: '3rem',
    color: '#70c0ff',
    marginBottom: '0.5rem',
  },
  tagline: {
    fontSize: '1.3rem',
    color: '#ccc',
  },
  section: {
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: '#ffbe5c',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    backgroundColor: '#1b1b1b',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
  },
  image: {
    flex: '1 1 300px',
    maxWidth: '400px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  cardContent: {
    flex: '2 1 500px',
  },
  cardTitle: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#4fc3f7',
  },
  cardText: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#ddd',
  },
  list: {
    paddingLeft: '1rem',
    marginBottom: '1rem',
  },
  listItem: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    lineHeight: '1.5',
  },
  button: {
    padding: '0.7rem 1.4rem',
    backgroundColor: '#4fc3f7',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none', // To ensure it looks like a button
    display: 'inline-block', // So it behaves like a button
    textAlign: 'center',
  },
  legalWrapper: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
  },
  legalCard: {
    backgroundColor: '#1b1b1b',
    padding: '1.5rem',
    borderRadius: '10px',
    flex: '1 1 45%',
    boxShadow: '0 0 10px rgba(255, 190, 92, 0.2)',
  },
};
