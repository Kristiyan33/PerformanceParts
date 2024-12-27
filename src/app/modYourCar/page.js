'use client';

export default function HowToModYourCar() {
  return (
    <div style={styles.pageContainer}>
      {/* Popular Mods Section */}
      <div style={styles.section}>
        <h1 style={styles.title}>Popular Mods</h1>

        {/* Engine Mods */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Engine Upgrades</h2>
          <div style={styles.contentRow}>
            <img src="images/engine-mod.jpg" alt="Engine Mod" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Engine upgrades are the heart of performance tuning, allowing you to significantly enhance your car's power and responsiveness. Here's a deeper dive into popular modifications:
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Cold Air Intakes:</strong> These systems replace restrictive factory airboxes to deliver cooler, denser air to the engine. The result is improved throttle response, a slight horsepower increase, and a more aggressive engine sound.
                </li>
                <li>
                  <strong>Turbocharging/Supercharging:</strong> Adding a turbo or supercharger forces more air into the engine, dramatically increasing horsepower and torque. Proper tuning and supporting mods, such as upgraded fuel systems and intercoolers, are essential.
                </li>
                <li>
                  <strong>Exhaust Systems:</strong> High-performance exhausts reduce backpressure and improve flow, unlocking additional power. Pair them with headers and catalytic converters for optimal gains.
                </li>
                <li>
                  <strong>ECU Tuning:</strong> A remap of your car's computer adjusts fuel maps, ignition timing, and boost levels (for turbocharged engines) to maximize performance.
                </li>
              </ul>
              <button style={styles.button}>Shop Engine Mods</button>
            </div>
          </div>
        </div>

        {/* Suspension and Brakes */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Suspension and Brake Upgrades</h2>
          <div style={styles.contentRow}>
            <img src="images/suspension-brakes.jpg" alt="Suspension and Brakes" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Suspension and brake upgrades improve handling, safety, and overall driving experience. Explore these options for the ultimate setup:
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Coilovers:</strong> These adjustable shock and spring assemblies allow you to fine-tune your car's ride height, damping, and stiffness. They're perfect for both street and track use.
                </li>
                <li>
                  <strong>Performance Brakes:</strong> Upgrading to slotted or drilled rotors improves heat dissipation, while performance pads and multi-piston calipers provide consistent braking force, even under extreme conditions.
                </li>
                <li>
                  <strong>Anti-Roll Bars:</strong> Reduce body roll during hard cornering, improving stability and steering precision. Pair with upgraded bushings for the best results.
                </li>
                <li>
                  <strong>Camber Kits:</strong> These kits allow you to adjust wheel alignment for optimal grip and tire wear, especially beneficial for lowered cars or those used on the track.
                </li>
              </ul>
              <button style={styles.button}>Shop Suspension & Brakes</button>
            </div>
          </div>
        </div>

        {/* Aerodynamics */}
        <div style={styles.modSection}>
          <h2 style={styles.subtitle}>Aerodynamic Enhancements</h2>
          <div style={styles.contentRow}>
            <img src="images/aero-mod.jpg" alt="Aerodynamic Enhancements" style={styles.image} />
            <div style={styles.textContent}>
              <p style={styles.text}>
                Aerodynamic modifications enhance performance by reducing drag and increasing downforce, improving high-speed stability and cornering. Key options include:
              </p>
              <ul style={styles.list}>
                <li>
                  <strong>Spoilers:</strong> Rear spoilers redirect airflow to generate downforce, improving traction at higher speeds. They're essential for rear-wheel-drive cars.
                </li>
                <li>
                  <strong>Splitters:</strong> Mounted at the front of the car, splitters help manage airflow under the chassis, reducing lift and increasing downforce.
                </li>
                <li>
                  <strong>Diffusers:</strong> Installed at the rear, diffusers smooth airflow exiting the car, reducing turbulence and drag.
                </li>
                <li>
                  <strong>Widebody Kits:</strong> Enhance aerodynamics and allow for wider tires, which improve grip and handling.
                </li>
              </ul>
              <button style={styles.button}>Shop Aero Mods</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Compliance Section */}
      <div style={styles.section}>
        <h1 style={styles.title}>Legal Compliance</h1>
        <div style={styles.contentRow}>
          {/* Emissions Compliance */}
          <div style={styles.subSection}>
            <h2 style={styles.subtitle}>Emissions Compliance</h2>
            <p style={styles.text}>
              Maintaining emissions compliance ensures your car meets environmental regulations. Here’s what you should know:
            </p>
            <ul style={styles.list}>
              <li>
                <strong>High-Flow Catalytic Converters:</strong> Replace stock converters with high-flow units to maintain emissions standards while improving exhaust flow.
              </li>
              <li>
                <strong>Exhaust Systems:</strong> Choose systems that retain emissions control components such as oxygen sensors and catalytic converters.
              </li>
              <li>
                <strong>ECU Tuning:</strong> Ensure your tuning setup retains factory emissions compliance or uses CARB-approved software.
              </li>
            </ul>
          </div>

          {/* Safety Standards */}
          <div style={styles.subSection}>
            <h2 style={styles.subtitle}>Safety Standards</h2>
            <p style={styles.text}>
              Modifications must adhere to safety standards to protect both the driver and other road users. Key points include:
            </p>
            <ul style={styles.list}>
              <li>Use DOT-approved components for tires, lights, and glass.</li>
              <li>Ensure all parts are professionally installed to avoid safety hazards.</li>
              <li>Keep documentation for all modifications to streamline inspections.</li>
            </ul>
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
    backgroundColor: '#f5eded',
    color: '#333',
  },
  section: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#6582ad',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  modSection: {
    marginBottom: '2.5rem',
  },
  subtitle: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#6582ad',
  },
  contentRow: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  image: {
    width: '40%',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  textContent: {
    flex: 1,
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#7fa1c3fa',
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
