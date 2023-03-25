import { ThemeProvider } from 'theme-ui';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
//===========================================
import Devfinder from '../Devfinder/Devfinder';
//===========================================
import { persistor, store } from '../../redux/store';
import { theme } from '../../utils/theme';
import styles from './app.module.scss';
import './null.scss';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <div className={styles.app}>
                        <main className={styles.main}>
                            <Devfinder />
                        </main>
                    </div>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;