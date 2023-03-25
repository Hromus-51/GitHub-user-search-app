/** @jsxImportSource theme-ui */
//===========================================
import { useColorMode } from 'theme-ui';
//===========================================
import { ReactComponent as MoonIcon } from '../../assets/image/icon-moon.svg';
import { ReactComponent as SunIcon } from '../../assets/image/icon-sun.svg';
//===========================================
import styles from './header.module.scss';

const Header: React.FC = () => {
    const [colorMode, setColorMode] = useColorMode();

    return (
        <div className={styles.appHeader}>
            <h1
                sx={{ color: 'logo' }}
                className={styles.appTitle}>
                devfinder
            </h1>

            <button
                sx={{
                    color: 'secondaryText',
                    '&:hover': { color: 'toggleHover' }
                }}
                className={styles.toggle}
                onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
                {colorMode === 'light' ? 'DARK' : 'LIGHT'}
                {colorMode === 'light' ?
                    <MoonIcon className={styles.themeIcon} /> :
                    <SunIcon className={styles.themeIcon} />
                }
            </button>
        </div>
    );
}

export default Header;