// /get-settlement/:id

import { axiosInstance } from "./axiosinstance";

// add a new expense
// export const AddExpense = async (payload) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/expense/add-expense",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };

// get all expense
// export const GetExpense = async () => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/expense/get-expenses"
//     );
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };

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

// edit a expense
// export const EditExpense = async (id, payload) => {
//     try {
//       const response = await axiosInstance.put(
//         `/api/expense/edit-expense/${id}`,
//         payload
//       );
//       return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   };
  
// delete a expense by id
// export const DeleteExpense = async (id) => {
//   try {
//     const response = await axiosInstance.delete(
//       `/api/expense/delete-expense/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };

