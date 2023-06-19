import styles from './app.module.css';
import { data } from '../../utils/data';
import { AppHeader } from '../app-header/AppHeader';

function App() {
  return (
    <div className={styles.app}>
      <pre
        style={{
          margin: 'auto',
          fontSize: '1.5rem',
        }}
      >
        Измените src/components/app/app.jsx и сохраните для обновления.
      </pre>
    </div>
  );
}
