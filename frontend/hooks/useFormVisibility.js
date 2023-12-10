import { useState } from 'react';


export default function useFormVisibility() {
    const [formName, setFormName] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const openForm = (formName, selectedItem=null) => {
        setSelectedItem(selectedItem);
        setFormName(formName);
    }

    const closeForm = () => {
        setSelectedItem(null);
        setFormName(false);
    }

    return {
        selectedItem,
        formName,
        openForm,
        closeForm
    }
}