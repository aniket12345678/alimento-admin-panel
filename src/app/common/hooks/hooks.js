import { categoryFindAll } from "../../slices/category.slice"

function allCategories() {
    dispatch(categoryFindAll())
}

export { allCategories };