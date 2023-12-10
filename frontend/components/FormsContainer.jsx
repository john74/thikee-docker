import styles from '../styles/Forms.module.css';
import {
    AddBookmarkForm, EditBookmarkCategoryForm,
    EditBookmarkForm, EditSearchEngineForm,
} from '@components';

const FormsContainer = (props) => {
    const {
        formName
    } = props.formVisibilityHook;

    return (
        <>
        <div className={styles.formContainer}>
        {formName == "addBookmarkForm" && ( <AddBookmarkForm styles={styles} {...props} /> )}
        {formName == "editBookmarkCategoryForm" && ( <EditBookmarkCategoryForm styles={styles} {...props} /> )}
        {formName == "editBookmarkForm" && ( <EditBookmarkForm styles={styles} {...props} /> )}
        {formName == "editSearchEngineForm" && ( <EditSearchEngineForm styles={styles} {...props} /> )}
        </div>
        </>
    )
}

export default FormsContainer;