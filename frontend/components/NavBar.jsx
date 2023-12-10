import styles from '../styles/NavBar.module.css';
import {
    NavLinks, NavMenu,
} from './NavBarParts';


function NavBar(props) {

    return (
        <>
        <div className={styles.navBar}>
            <NavLinks styles={styles} {...props} />
            <NavMenu styles={styles} {...props} />
        </div>
        </>
    )
}

export default NavBar