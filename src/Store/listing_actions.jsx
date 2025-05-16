import axios from "axios";
import { toast } from "react-toastify";
import { listActions } from "./listItems";

export const fetchListData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://stayfinder-website-default-rtdb.firebaseio.com/listings.json");
      const data = res.data;

      if (!data) {
        dispatch(listActions.replaceList({ items: [] }));
        return;
      }

      const transformedData = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      dispatch(listActions.replaceList({ items: transformedData }));
    } catch (error) {
      console.log(error)
      toast.error("Fetching listings failed!");
    }
  };
};

export const editListing = (updatedItem) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `https://stayfinder-website-default-rtdb.firebaseio.com/listings/${updatedItem.id}.json`,
        updatedItem
      );
      dispatch(listActions.updateItemInList(updatedItem));
      toast.success("Listing updated successfully!");
    } catch (error) {
      toast.error("Updating listing failed!");
    }
  };
};

export const deleteListing = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://stayfinder-website-default-rtdb.firebaseio.com/listings/${id}.json`
      );
      dispatch(listActions.removeItemFromList(id));
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Deleting listing failed!");
    }
  };
};

export const addNewListing = (listing) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://stayfinder-website-default-rtdb.firebaseio.com/listings.json",
        listing
      );
      const id = res.data.name; 
      dispatch(listActions.addItemToList({ id, ...listing }));
      toast.success("Listing added successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Adding listing failed!");
    }
  };
};
