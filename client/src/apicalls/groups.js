import { axiosInstance } from "./axiosinstance";

// add a new Group
export const AddGroup = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/groups/add-group",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all Groups
export const GetGroups = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/groups/get-groups"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get a Group by id
export const GetGroupById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/groups/get-group-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a group
export const EditGroup = async (id, payload) => {
    try {
      const response = await axiosInstance.put(
        `/api/groups/edit-group/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  };
  
// delete a group
export const DeleteGroup = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/groups/delete-group/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
