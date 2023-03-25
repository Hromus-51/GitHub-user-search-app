/** @jsxImportSource theme-ui */
//===========================================
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
//===========================================
import { ReactComponent as LocationIcon } from '../../assets/image/icon-location.svg';
import { ReactComponent as TwitterIcon } from '../../assets/image/icon-twitter.svg';
import { ReactComponent as WebsiteIcon } from '../../assets/image/icon-website.svg';
import { ReactComponent as CompanyIcon } from '../../assets/image/icon-company.svg';
//===========================================
import { selectUser } from '../../redux/user/slice';
import { selectStatus } from '../../redux/user/slice';
import { User } from './types';
import styles from './card.module.scss';
import { persistor, useAppDispatch } from '../../redux/store';
import { url } from '../../utils/url';
import { fetchUser } from '../../redux/user/asyncActions';
//===========================================

const numericItems = ['Repos', 'Followers', 'Following'];
const links = [
    { name: 'location', component: <LocationIcon /> },
    { name: 'twitter_username', component: <TwitterIcon /> },
    { name: 'blog', component: <WebsiteIcon /> },
    { name: 'company', component: <CompanyIcon /> },
]

const Card: React.FC = () => {
    const user: User = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const dispatch = useAppDispatch();
    //===========================================
    const isTabletMin = useMediaQuery({ minWidth: 769 })
    const isTabletMax = useMediaQuery({ maxWidth: 768 })
    //===========================================

    useEffect(() => {
        persistor.pause();

        if (localStorage.getItem('persist:root')) {
            persistor.persist();
        } else {
            const userName = 'octocat'
            dispatch(fetchUser({ url, userName }))
            persistor.persist();
        }
    }, [])

    const formatDate = () => {
        const dayjs = require('dayjs');
        require('dayjs/locale/en');
        const date = dayjs(user.created_at);
        const formattedDate = date.locale('en').format('DD MMM YYYY');

        return formattedDate;
    }

    return (
        <div
            sx={{ bg: 'cardBackground', boxShadow: t => `0px 16px 30px -10px ${t.colors?.shadow}` }}
            className={styles.card}>

            {isTabletMin &&
                <div className={styles.avatarContainer}>
                    <img className={styles.avatar} src={user.avatar_url} />
                </div>
            }

            <div className={styles.userDates}>

                {isTabletMin &&
                    <div className={styles.cardHeader}>

                        <h2
                            sx={{ color: 'contrast' }}
                            className={styles.name}>
                            {status === 'loading' ? 'Loading...' : user.name}
                        </h2>

                        <div
                            sx={{ color: 'secondaryText' }}
                            className={styles.joined}>
                            {status === 'loading' ? 'Loading...' : (`Joinded ${formatDate()}`)}
                        </div>

                        <h4 className={styles.linkName}>
                            {status === 'loading' ? 'Loading...' : `@${user.login}`}
                        </h4>

                    </div>
                }

                {isTabletMax &&
                    <div className={styles.cardHeaderTablet}>

                        <div className={styles.avatarContainer}>
                            <img className={styles.avatar} src={user.avatar_url} />
                        </div>

                        <div className={styles.userInfo}>
                            <h2
                                sx={{ color: 'contrast' }}
                                className={styles.name}>
                                {status === 'loading' ? 'Loading...' : user.name}
                            </h2>
                            <h4 className={styles.linkName}>
                                {status === 'loading' ? 'Loading...' : `@${user.login}`}
                            </h4>
                            <div
                                sx={{ color: 'secondaryText' }}
                                className={styles.joined}>
                                {status === 'loading' ? 'Loading...' : (`Joinded ${formatDate()}`)}
                            </div>
                        </div>

                    </div>
                }

                <p
                    sx={{ color: user.bio ? 'text' : 'transparentText' }}
                    className={styles.bio}>
                    {status === 'loading' ? 'Loading...' : (!user.bio ? 'This profile has no bio' : user.bio)}
                </p>

                <ul
                    sx={{ bg: 'background' }}
                    className={styles.numericData}>
                    {
                        numericItems.map(item => (
                            <li className={styles.column} key={item}>
                                <h5 className={styles.numericTitle}>{item}</h5>
                                <div
                                    sx={{ color: 'contrast' }}
                                    className={styles.numbers}>
                                    {status === 'loading' && 0}
                                    {item === 'Repos' && user.public_repos}
                                    {item === 'Followers' && user.followers}
                                    {item === 'Following' && user.following}
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <ul className={styles.links}>
                    {links.map((item, index) => (
                        <li
                            key={index}
                            sx={{ color: user[item.name as keyof User] ? 'text' : 'transparentText' }}
                            className={styles.linksItem} >
                            {React.cloneElement(item.component, { className: styles.icon })}

                            {item.name === 'location' && (user.location || 'Not Available')}
                            {item.name === 'twitter_username' && (user.twitter_username || 'Not Available')}
                            {item.name === 'blog' &&
                                (user.blog ?
                                    <a
                                        className={clsx(styles.link, user.blog && styles.link_hover)}
                                        href={user.blog}>
                                        {user.blog}
                                    </a> : 'Not Available')}
                            {item.name === 'company' && (user.company || 'Not Available')}
                        </li>
                    ))}
                </ul>

            </div>
        </div >
    );
}

export default Card;


