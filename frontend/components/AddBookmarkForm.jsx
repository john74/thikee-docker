"use client";

import { useState } from 'react';

import {
    Button, Svg,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function AddBookmarkForm(props) {
    const styles = props.styles;
    const {
        closeForm
    } = props.formVisibilityHook;

    const {
        lastSelectedId
    } = props.toggleMenuHook;

    const [formData, setFormData] = useState({
        category: lastSelectedId,
        name: "",
        url: "",
        icon_url: "",
        is_shortcut: false,
      });

    const { category, name, url, icon_url, is_shortcut } = formData;
    const onChange = event => {
        let { name, value, type, checked } = event.target;
        value = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: value });
    }

    const createBookmark = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "POST";
        const targetEndpoint = "api/bookmarks/bulk-create/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [formData];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        closeForm();
        const bookmarks = responseJSON.bookmarks;
        const shortcuts = responseJSON.shortcuts;
        props.setBookmarks({ ...bookmarks });
        props.setShortcuts(shortcuts);
    };

    return (
        <form className={styles.form} onSubmit={createBookmark}>
            <Button className={styles.closeButton} title="Close" onClick={() => closeForm()}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
            </Button>
            <h1 className={styles.title}>Create bookmark</h1>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input className={styles.input} type="text" id="name" name="name" value={name} onChange={onChange} required />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="url">Url:</label>
                    <input className={styles.input} type="text" id="url" name="url" value={url} onChange={onChange} required />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="icon_url">Icon url:</label>
                    <input className={styles.input} type="text" id="icon_url" name="icon_url" value={icon_url} onChange={onChange} required />
                </div>
                <div className={`${styles.field} ${styles.row}`}>
                    <label className={styles.label} htmlFor="is_shortcut">Is shortcut:</label>
                    <input className={styles.input} type="checkbox" id="is_shortcut" name="is_shortcut" checked={is_shortcut} onChange={onChange} />
                </div>
                <input className={styles.input} type="submit" value="Save" />
            </div>
        </form>
    )
}

export default AddBookmarkForm;