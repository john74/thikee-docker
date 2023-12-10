"use client";

import Svg from '../Svg';

import {
    Button,
} from '@components';

import {
    useHandleProxyRequest,
} from '@hooks';


function SubCategoryActions(props) {
    const styles = props.styles;
    const subCategory = props.subCategory;

    const {
        isMarkedForDeletion,
        markForDeletion,
        unmark
    } = props.markForDeletionHook;

    const {
        openForm
    } = props.formVisibilityHook;

    const confirmSubCategoryDeletion = async (event, subCategoryId) => {
        event.preventDefault();
        event.stopPropagation();

        unmark();
        const method = "DELETE";
        const targetEndpoint = "api/sub-categories/bulk-delete/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = {"ids": [subCategoryId]};

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        const subCategoryGroups = responseJSON.sub_categories;
        props.setBookmarkSubCategoryGroups(subCategoryGroups);
    }

    return (
        <>
        <div className={styles.actions}>
            <div className={styles.buttons}>
                <Button className={styles.editButton} title="Edit" onClick={() => openForm("editSubCategoryForm", subCategory)}>
                    <Svg content={<><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>}/>
                    <span>Edit</span>
                </Button>
                {isMarkedForDeletion !== subCategory.id ? (
                    <Button className={styles.deleteButton} title="Delete" onClick={() => markForDeletion(subCategory.id)}>
                        <Svg content={<><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></>}/>
                        <span>Delete</span>
                    </Button>
                ) : (
                    <Button className={styles.confirmButton} title="Confirm" onMouseLeave={unmark} onClick={(event) => confirmSubCategoryDeletion(event, subCategory.id)}>
                        <Svg content={<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>}/>
                        <span>Confirm</span>
                    </Button>
                )}
            </div>
            <div className={styles.icon}>
                <Svg class={styles.svg} content={<><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/></>}/>
            </div>
        </div>
        </>
    );
  }

export default SubCategoryActions;