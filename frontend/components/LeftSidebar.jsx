import styles from '../styles/LeftSidebar.module.css';

import {
    Actions,
} from './LeftSidebarParts';


function LeftSidebar(props) {
    const shortcuts = props.shortcuts;

    return (
        <ul className={styles.leftSidebar}>
        {shortcuts?.map(shortcut => (
            <li key={shortcut.id} className={styles.shortcut}>
                <a className={styles.link} href={shortcut.url} title={shortcut.name} target="_blank">
                    <img className={styles.image} src={shortcut.icon_url} alt={shortcut.name} />
                </a>
                <Actions styles={styles} shortcut={shortcut} {...props} />
            </li>
        ))}
        </ul>
    );
}

export default LeftSidebar