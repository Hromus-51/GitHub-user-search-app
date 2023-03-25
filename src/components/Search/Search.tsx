/** @jsxImportSource theme-ui */
//===========================================
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
//===========================================
import { setSearchValue, selectSearchValue } from '../../redux/search/slice';
import { selectStatus } from '../../redux/user/slice';
import { fetchUser } from '../../redux/user/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { url } from '../../utils/url';
import styles from './search.module.scss';
import searchIcon from '../../assets/image/icon-search.svg';

const Search: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useSelector(selectSearchValue);
    const status = useSelector(selectStatus);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setSearchValue(e.target.value.trim()))
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const userName = searchValue ? searchValue : '';
        if (searchValue !== '') {
            dispatch(fetchUser({ url, userName }))
            dispatch(setSearchValue(''))
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.search}>
            <input
                sx={{
                    bg: 'cardBackground',
                    '::placeholder': { color: 'text' },
                    boxShadow: t => `0px 16px 30px -10px ${t.colors?.shadow}`,
                    color: 'logo'
                }}
                ref={inputRef}
                onChange={handleOnChange}
                value={searchValue}
                className={clsx(styles.searchInput, status === 'error' && styles.searchInput_notFount)}
                type="text"
                placeholder='Search GitHub username…'
            />
            <img className={styles.searchIcon} src={searchIcon} alt="searchIcon" />
            <AnimatePresence>
                {status === 'error' &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={styles.noResult}>
                        No results
                    </motion.div>}
            </AnimatePresence>
            <button className={styles.bittonSearch}>Search</button>
        </form>
    );
}

export default Search;