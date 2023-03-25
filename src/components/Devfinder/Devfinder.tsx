import { motion } from "framer-motion";
//===========================================
import Search from "../Search/Search";
import Card from "../Card/Card";
import Header from "../Header/Header";
//===========================================
import styles from './devfinder.module.scss';
import { componentVariants } from './animation';

const components = [
    { element: <Header />, class: 'header' },
    { element: <Search />, class: 'search' },
    { element: <Card />, class: 'card' }
]

const Devfinder: React.FC = () => {
    return (
        <div className={styles.devfinder}>
            <div className={styles.container}>

                <ul className={styles.userCard}>
                    {
                        components.map((item, index) => (
                            <motion.li
                                variants={componentVariants}
                                initial='hidden'
                                animate='visible'
                                custom={index}
                                className={styles[item.class]}
                                key={index}
                            >
                                {item.element}
                            </motion.li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
}

export default Devfinder;