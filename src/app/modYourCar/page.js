'use client';

export default function HowToModYourCar() {
  return (
    <div style={styles.pageContainer}>
      {/* Popular Mods Section */}
      <div style={styles.section}>
        <h1 style={styles.title}>Популярни модификации</h1>

        {/* Engine Mods */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Модернизации на двигателя</h2>
          <div style={styles.container}>
            <img src="images/engine-mod.jpg" alt="Engine Mod" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Модернизациите на двигателя са сърцето на силовия тунинг, като ви позволяват значително да подобрите мощността и отзивчивостта на вашия автомобил. Ето някои популярни модификации:
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Cold Air Intakes:</strong> Тези системи заменят ограничените фабрични въздушни кутии, за да доставят по-хладен, по-гъст въздух в двигателя, което води до подобрено ускорение и по-агресивен звук.
                </li>
                <li>
                  <strong>Турбиниране/Суперзареждане:</strong> Добавянето на турбина или суперзареждане изпомпва повече въздух в двигателя, като значително увеличава мощността и въртящия момент.
                </li>
                <li>
                  <strong>Изпускателни системи:</strong> Високопроизводителните изпускателни системи намаляват контрапродукцията и подобряват потока, отключвайки допълнителна мощност.
                </li>
                <li>
                  <strong>ECU настройка:</strong> Ремапирането на компютъра на автомобила настройва горивните карти, времето за запалване и нивото на налягането за турбинирани двигатели за максимална производителност.
                </li>
              </ul>
              <button style={styles.button}>Пазарувай модификации на двигателя</button>
            </div>
          </div>
        </div>

        {/* Suspension and Brakes */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Модернизации на окачване и спирачки</h2>
          <div style={styles.container}>
            <img src="images/suspension-brakes.jpg" alt="Suspension and Brakes" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Модернизациите на окачването и спирачките подобряват управлението, безопасността и общото шофиране на автомобила. Ето някои опции за постигане на перфектната настройка:
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Coilovers:</strong> Тези регулируеми амортисьори и пружини позволяват прецизно настройване на височината на колата, твърдостта и амортизацията.
                </li>
                <li>
                  <strong>Високопроизводителни спирачки:</strong> Подмяната с прорезни или пробити дискове подобрява охлаждането, а производителните накладки и много-бутониралните спирачни апарати осигуряват стабилна спирачната сила.
                </li>
                <li>
                  <strong>Анти-рол барове:</strong> Намаляват наклона на каросерията при агресивно завиване, подобрявайки стабилността.
                </li>
                <li>
                  <strong>Китове за камбър:</strong> Позволяват настройване на изправянето на колелата за оптимално сцепление и износване на гумите.
                </li>
              </ul>
              <button style={styles.button}>Пазарувай окачване и спирачки</button>
            </div>
          </div>
        </div>

        {/* Aerodynamics */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Аеродинамични модификации</h2>
          <div style={styles.container}>
            <img src="images/aero-mod.jpg" alt="Aerodynamic Enhancements" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Аеродинамичните модификации подобряват производителността, като намаляват съпротивлението на въздуха и увеличават притискателната сила.
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Спойлери:</strong> Задните спойлери пренасочват въздушния поток, за да генерират притискателна сила и да увеличат сцеплението.
                </li>
                <li>
                  <strong>Сплитери:</strong> Те помагат за управлението на въздушния поток под шасито, намалявайки подемната сила.
                </li>
                <li>
                  <strong>Диффузери:</strong> Изглаждат въздушния поток, излизащ от автомобила, намалявайки турбуленцията.
                </li>
                <li>
                  <strong>Ширококаросерийни комплекти:</strong> Подобряват аеродинамиката и позволяват по-широки гуми за по-добро сцепление.
                </li>
              </ul>
              <button style={styles.button}>Пазарувай аеро модификации</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Compliance Section */}
      <div style={styles.section}>
        <h1 style={styles.title}>Правна съвместимост</h1>
        <div style={styles.contentRow}>
          {/* Emissions Compliance */}
          <div style={styles.subSection}>
            <h2 style={styles.subtitle}>Съответствие с емисиите</h2>
            <div style={styles.container}>
              <p style={styles.text}>
                Поддържането на съответствие с емисиите осигурява, че автомобилът ви отговаря на екологичните регулации.
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Катализатори с висока пропускливост:</strong> Подменяйте фабричните катализатори с високопропускливи, които запазват стандартите за емисии и подобряват потока на газовете.
                </li>
                <li>
                  <strong>Изпускателни системи:</strong> Изберете системи, които запазват компонентите за контрол на емисиите, като сензори за кислород и катализатори.
                </li>
                <li>
                  <strong>ECU настройка:</strong> Уверете се, че настройката на ECU отговаря на изискванията за емисии или използва софтуер, одобрен от CARB.
                </li>
              </ul>
            </div>
          </div>

          {/* Safety Standards */}
          <div style={styles.subSection}>
            <h2 style={styles.subtitle}>Стандарти за безопасност</h2>
            <div style={styles.container}>
              <p style={styles.text}>
                Модификациите трябва да отговарят на стандартите за безопасност, за да защитят както водача, така и останалите участници в движението.
              </p>
              <ul style={styles.list}>
                <li>Използвайте компоненти, одобрени от DOT за гуми, светлини и стъкла.</li>
                <li>Уверете се, че всички части са професионално инсталирани, за да се избегнат рискове за безопасността.</li>
                <li>Запазете документацията за всички модификации, за да улесните проверките.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '2rem',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#1f1f1f',
    color: '#fff',
  },
  section: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#3C5173',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  modSection: {
    marginBottom: '2.5rem',
  },
  subtitle: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#3C5173',
  },
  container: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: '#2c2c2c',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '40%',
    borderRadius: '8px',
  },
  textContent: {
    flex: 1,
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#3C5173',
    color: '#f5eded',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#7fa1c3f',
  },
  subSection: {
    flex: 1,
    marginBottom: '1.5rem',
  },
};
