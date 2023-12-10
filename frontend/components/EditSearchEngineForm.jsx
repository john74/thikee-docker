"use client";

import { useState } from 'react';

import {
    Button, Svg,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function EditSearchEngineForm(props) {
    const styles = props.styles;
    const {
        setSelectedEngine
    } = props.selectSearchEngineHook;

    const {
        selectedItem,
        closeForm
    } = props.formVisibilityHook;

    const [formData, setFormData] = useState({
        id: selectedItem.id,
        name: selectedItem.name,
        url: selectedItem.url,
        method: selectedItem.method,
        name_attribute: selectedItem.name_attribute,
        is_default: selectedItem.is_default,
      });

    const { id, name, url, method, name_attribute, is_default } = formData;
    const onChange = event => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const editSearchEngine = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "PUT";
        const targetEndpoint = "api/search-engines/bulk-update/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [formData];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        props.setSearchEngines(responseJSON);
        setSelectedEngine(null);
        closeForm();
    };

    return (
        <form className={styles.form} onSubmit={editSearchEngine}>
            <Button className={styles.closeButton} title="Close" onClick={() => closeForm()}>
                <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
            </Button>
            <h1 className={styles.title}>Edit Search engine</h1>
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
                    <label className={styles.label} htmlFor="method">Method:</label>
                    <input className={styles.input} type="text" id="method" name="method" value={method} onChange={onChange} required />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name_attribute">Name attribute:</label>
                    <input className={styles.input} type="text" id="name_attribute" name="name_attribute" value={name_attribute} onChange={onChange} required />
                </div>
                <input className={styles.input} type="submit" value="Save" />
            </div>
        </form>
    )
}

export default EditSearchEngineForm;