import './globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export const metadata = {
  title: 'Performance Parts',
  description: 'Upgrade Your Ride with the Best Performance Parts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <Navbar />
        <main style={styles.main}>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: '0',
  },
};

