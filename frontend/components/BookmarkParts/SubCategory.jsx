import {
    Bookmark, SubCategoryActions,
} from '.';


function SubCategory(props) {
    const styles = props.styles;
    const subCategory = props.subCategory;
    const bookmarksArray = props.bookmarks[subCategory.id];
    const {
        toggleMenu,
        openMenuId,
    } = props.toggleMenuHook;

    return (
        <div key={'bookmark-sub-category-' + subCategory.id} className={styles.bookmarkSubCategory}>
            <div className={styles.top}>
                <p className={styles.subCategoryName} onClick={(event) => toggleMenu(event, subCategory.id)}>{subCategory.name}</p>
                <SubCategoryActions styles={styles} subCategory={subCategory} {...props} />
            </div>
            {openMenuId == subCategory.id && <Bookmark styles={styles} bookmarksArray={bookmarksArray} {...props} />}
        </div>
      );
  }

export default SubCategory;