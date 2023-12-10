import {
    NoBookmarks, SubCategory, Bookmark,
} from '.';


function CategoryBody(props) {
    const styles = props.styles;
    const category = props.category;
    const showSubCategories = props.settings.show_bookmark_sub_categories;
    const subCategories = props.bookmarkSubCategoryGroups[category.id];

    if (showSubCategories && subCategories) {
        return (
            <>
            <div className={styles.bookmarkSubCategories}>
                {subCategories.map((subCategory, index) => (
                    <SubCategory key={`${category.id}+${index}`} styles={styles} subCategory={subCategory} {...props} />
                ))}
            </div>
            </>
        );
    }

    const bookmarks = props.bookmarks[category.id];
    if (!bookmarks?.length) {
        return <NoBookmarks styles={styles} {...props} />;
    }

    return <Bookmark styles={styles} bookmarksArray={bookmarks} {...props} />
}

export default CategoryBody;