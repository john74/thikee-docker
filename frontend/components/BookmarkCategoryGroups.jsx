import styles from '../styles/BookmarkCategoryGroups.module.css';
import {
    CategoriesGroup, EmptyGroups,
} from './BookmarkParts';
import {
    useHandleProxyRequest,
} from '@hooks';


function BookmarkCategoryGroups(props) {
    const groups = props.bookmarkCategoryGroups;

    const createBookmarkCategory = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "POST";
        const targetEndpoint = "api/categories/bulk-create/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = [{
            "name": "New Category",
            "color": "#fff"
        }];

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        const categories = responseJSON.categories;
        props.setBookmarkCategoryGroups(categories);
    };

    if (!groups?.length) {
        return <EmptyGroups styles={styles} {...props} />;
    }

    return (
        <>
        <div className={styles.bookmarkCategoryGroups}>
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    <span onClick={createBookmarkCategory}>Add new category</span>
                </div>
                {groups.map((group, index) => (
                    <CategoriesGroup key={`bookmark-category-group-${index}`} styles={styles} group={group} {...props} />
                ))}
            </div>
        </div>
        </>
    )
}

export default BookmarkCategoryGroups