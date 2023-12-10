"use client";

import { useEffect, useRef, useState } from 'react';

import {
    Button, Svg,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function EditBookmarkForm(props) {
    const styles = props.styles;
    const [isRestCategoriesVisible, setIsRestCategoriesVisible] = useState(false);
    const menuRef = useRef(null);

    const toggleRestCategories = () => {
      setIsRestCategoriesVisible(!isRestCategoriesVisible);
    };

    const {
        selectedItem,
        closeForm
    } = props.formVisibilityHook;

    const [formData, setFormData] = useState({
        category: selectedItem.category,
        id: selectedItem.id,
        name: selectedItem.name,
        url: selectedItem.url,
        icon_url: selectedItem.icon_url,
        is_shortcut: selectedItem.is_shortcut,
      });

      const handleCategoryClick = (newCategory) => {
        setFormData({
          ...formData,
          category: newCategory,
        });
        setIsRestCategoriesVisible(!isRestCategoriesVisible);
      };

      useEffect(() => {
        // Add a click event listener to detect clicks on the menu toggler or outside the menu, and close the menu if necessary
        const closeMenuOnClick = event => {
            // Check if the click occurred inside the menu
            const userClickedInsideMenu = menuRef.current?.contains(event.target);
            if (!userClickedInsideMenu) setIsRestCategoriesVisible(false);
        }

        // Attach and then remove the event listener to prevent memory leaks
        document.body.addEventListener('click', closeMenuOnClick);
        return () => document.body.removeEventListener('click', closeMenuOnClick);
    }, []);

    const { category, id, name, url, icon_url, is_shortcut } = formData;
    const onChange = event => {
        let { name, value, type, checked } = event.target;
        value = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: value });
    }

    const editBookmark = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "PUT";
        const targetEndpoint = "api/bookmarks/bulk-update/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [formData];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        const bookmarks = responseJSON.bookmarks;
        const shortcuts = responseJSON.shortcuts;
        props.setBookmarks({ ...bookmarks });
        props.setShortcuts(shortcuts);
        closeForm();
    };

    const bookmarkCategories = {};
    props.bookmarkCategoryGroups?.flat().forEach(category => {
        bookmarkCategories[category.id] = category.name;
    });

    const restCategories = Object.entries(bookmarkCategories).filter(([id, _]) => id != category);

    return (
        <form className={styles.form} onSubmit={editBookmark}>
            <Button className={styles.closeButton} title="Close" onClick={() => closeForm()}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
            </Button>
            <h1 className={styles.title}>Edit bookmark</h1>
            <div className={styles.fields}>
                <div className={styles.field} ref={menuRef}>
                    <div className={styles.dropdown} onClick={toggleRestCategories}>
                        <p className={styles.title}>{bookmarkCategories[category]}</p>
                        <Svg content={<><path d="m6 9 6 6 6-6"/></>}/>
                    </div>
                    {isRestCategoriesVisible && (
                        <ul className={styles.menu}>
                        {restCategories.map(([id, name]) => (
                            <li key={id+name} onClick={() => handleCategoryClick(id)}>{name}</li>
                        ))}
                        </ul>
                    )}
                </div>
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

export default EditBookmarkForm;