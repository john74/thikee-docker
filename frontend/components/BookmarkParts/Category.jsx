import {
    CategoryHead, CategoryBody, CategoryMenu,
} from '.';


function Category(props) {
    const styles = props.styles;
    const category = props.category;

    return (
        <div key={'bookmark-category-' + category.id} className={styles.bookmarkCategory}>
            <CategoryHead styles={props.styles} {...props} />
            <CategoryBody styles={props.styles} {...props} />
            <CategoryMenu styles={props.styles} {...props} />
        </div>
    );
  }

export default Category;