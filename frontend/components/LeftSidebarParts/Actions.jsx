import {
    Button, Svg,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function Actions(props) {
    const styles = props.styles;
    const shortcut = props.shortcut;
    const {
        isMarkedForDeletion,
        markForDeletion,
        unmark
    } = props.markForDeletionHook;


    const confirmShortcutDeletion = async (event, shortcutId) => {
        event.preventDefault();
        event.stopPropagation();

        unmark();
        const method = "DELETE";
        const targetEndpoint = "api/shortcuts/bulk-delete/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = {"ids": [shortcutId]};

        const responseJSON = await useHandleProxyRequest(url, method, body);
        if (!responseJSON) return;

        const bookmarks = responseJSON.bookmarks;
        const shortcuts = responseJSON.shortcuts;
        props.setBookmarks(bookmarks);
        props.setShortcuts(shortcuts);
    }

    return (
        <>
        <div className={styles.actions}>
        {isMarkedForDeletion !== shortcut.id ? (
            <Button className={styles.deleteButton} title="Remove" onClick={() => markForDeletion(shortcut.id)}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
            </Button>
            ) : (
            <Button className={styles.confirmButton} title="Confirm" onMouseLeave={unmark} onClick={(event) => confirmShortcutDeletion(event, shortcut.id)}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>}/>
            </Button>
            )}
        </div>
        </>
    );
  }

export default Actions;