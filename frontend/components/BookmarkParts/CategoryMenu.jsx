import Svg from '../Svg';

import {
    useHandleProxyRequest,
} from '@hooks';


function CategoryMenu(props) {
    const styles = props.styles;
    const category = props.category;

    const {
        openMenuId,
    } = props.toggleMenuHook;

    const {
        openForm
    } = props.formVisibilityHook;

    const {
        isMarkedForDeletion,
        markForDeletion,
        unmark
    } = props.markForDeletionHook;

    const confirmBookmarkCategoryDeletion = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        unmark();
        const method = "DELETE";
        const targetEndpoint = "api/categories/bulk-delete/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = {"ids": [category.id]};

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        const categories = responseJSON.categories;
        const shortcuts = responseJSON.shortcuts;
        props.setBookmarkCategoryGroups(categories);
        props.setShortcuts(shortcuts);
    }

    return (
        <ul className={`${styles.actions} ${openMenuId == category.id ? styles.open : ''}`}>
            <li key={category.id + 'add'} className={styles.action} onClick={() => openForm("addBookmarkForm")}>
                <Svg content={<><path d="M5 12h14"/><path d="M12 5v14"/></>}/>
                <span className={styles.add}>Add bookmark</span>
            </li>
            <li key={category.id + 'edit'} className={styles.action} onClick={() => openForm("editBookmarkCategoryForm", category)}>
                <Svg content={<><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>}/>
                <span className={styles.edit}>Edit category</span>
            </li>
            {isMarkedForDeletion ? (
            <li key={category.id + 'confirm'} className={styles.action} onMouseLeave={unmark} onClick={confirmBookmarkCategoryDeletion}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>}/>
                <span className={styles.confirm}>Click to confirm</span>
            </li>
            ): (
            <li key={category.id + 'delete'} className={styles.action} onClick={() => markForDeletion(category.id)} data-delete>
                <Svg content={<><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></>}/>
                <span className={styles.delete}>Delete category</span>
            </li>
            )}
        </ul>
    );
  }

export default CategoryMenu;