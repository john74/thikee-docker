"use client";

import { useState } from 'react';

import {
    Button, Svg,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function EditBookmarkCategoryForm(props) {
    const styles = props.styles;
    const {
        selectedItem,
        closeForm
    } = props.formVisibilityHook;

    const {
        lastSelectedId
    } = props.toggleMenuHook;

    const [formData, setFormData] = useState({
        id: lastSelectedId,
        name: selectedItem.name,
        color: selectedItem.color
      });

    const { id, name, color } = formData;
    const onChange = event => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const editCategory = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "PUT";
        const targetEndpoint = "api/categories/bulk-update/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [formData];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        const grouped_categories = responseJSON.categories;
        props.setBookmarkCategoryGroups(grouped_categories);
        closeForm();
    };

    return (
        <form className={styles.form} onSubmit={editCategory}>
            <Button className={styles.closeButton} title="Close" onClick={() => closeForm()}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
            </Button>
            <h1 className={styles.title}>Edit category</h1>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input className={styles.input} type="text" id="name" name="name" value={name} onChange={onChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="color">Color:</label>
                    <input className={styles.input} type="text" id="color" name="color" value={color} onChange={onChange} />
                </div>
                <input className={styles.input} type="submit" value="Save" />
            </div>
        </form>
    )
}

export default EditBookmarkCategoryForm;