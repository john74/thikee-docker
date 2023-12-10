import styles from '../styles/WebSearch.module.css';
import {
    SearchBar, SearchEngines
} from './WebSearchParts';


function WebSearch(props) {
    const defaultEngine = props.searchEngines.default;

    return (
        <>
        <div className={styles.webSearch}>
            <form action={defaultEngine.url} method={defaultEngine.method}>
                <SearchEngines styles={styles} defaultEngine={defaultEngine} {...props} />
                <SearchBar styles={styles} defaultEngine={defaultEngine} {...props} />
            </form>
        </div>
        </>
    )
}

export default WebSearch