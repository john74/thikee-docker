import Svg from '../Svg';

import {
    useHandleProxyRequest,
} from '@hooks';


function SearchBar(props) {
    const styles = props.styles;
    const defaultEngine = props.defaultEngine;
    const {
        toggleMenu,
        openMenuId,
        setOpenMenuId,
    } = props.toggleMenuHook;

    const addSearchEngine = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "POST";
        const targetEndpoint = "api/search-engines/bulk-create/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [{
            "name": "New Engine"
        }];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        props.setSearchEngines(responseJSON);
        setOpenMenuId("webSearchMenu");
    }

    return (
        <>
        <div className={styles.searchBar}>
            <input type="search" name={defaultEngine.name_attribute}/>
            <span className={styles.addEngine} title="Add search engine" onClick={(event) => addSearchEngine(event)}>
                <Svg content={<><path d="M5 12h14"/><path d="M12 5v14"/></>}/>
            </span>
        </div>
        </>
    );
  }

export default SearchBar;