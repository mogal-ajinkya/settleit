import { axiosInstance } from "./axiosinstance";

// get a expense by group id
export const GetSettlementByGrpId = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/settlement/get-settlement/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
