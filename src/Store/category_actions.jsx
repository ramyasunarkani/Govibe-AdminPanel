import axios from "axios";
import { toast } from "react-toastify";
import { categoryActions } from "./categoryItems";

export const fetchCategoriesData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://stayfinder-website-default-rtdb.firebaseio.com/categories.json");
      const data = res.data;

      if (!data) {
        dispatch(categoryActions.replaceCategories({ categories: [] }));
        return;
      }

      const transformedData = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      dispatch(categoryActions.replaceCategories({ categories: transformedData }));
    } catch (error) {
      toast.error("Fetching listings failed!");
    }
  };
};

export const editCategories = (updatedCategory) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `https://stayfinder-website-default-rtdb.firebaseio.com/categories/${updatedCategory.id}.json`,
        updatedCategory
      );
      dispatch(categoryActions.updateItemInCategories(updatedCategory));
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Updating Category failed!");
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://stayfinder-website-default-rtdb.firebaseio.com/categories/${id}.json`
      );
      dispatch(categoryActions.removeItemFromCategories(id));
      toast.success(" Category successfully!");
    } catch (error) {
      toast.error("Deleting Category failed!");
    }
  };
};

export const addNewCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://stayfinder-website-default-rtdb.firebaseio.com/categories.json",
        category
      );
      const id = res.data.name;
      dispatch(categoryActions.addItemToCategories({ id, ...category }));
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Adding category failed!");
    }
  };
};
