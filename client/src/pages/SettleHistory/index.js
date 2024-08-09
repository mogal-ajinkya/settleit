import React, { useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { useEffect } from "react";
// import { DeleteGroup } from "../../../";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetExpense } from "../../apicalls/expense";

const SettleHistory = () => {
  const {id} = useParams();
  const [settledExpenses, setSettledExpenses] = React.useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetExpense({
        groupId:id,
        type:"settlement"
      });
      console.log(response.data);
      if (response.success) {
        dispatch(SetLoader(false));
        setSettledExpenses(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  // const deleteProduct = async (id) => {
  //   try {
  //     dispatch(SetLoader(true));
  //     const response = await DeleteGroup(id);
  //     dispatch(SetLoader(false));
  //     if (response.success) {
  //       message.success(response.message);
  //       getData();
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (error) {
  //     dispatch(SetLoader(false));
  //     message.error(error.message);
  //   }
  // };

  const columns = [
    {
      title: "From ",
      dataIndex: "payer",
      className: "max-sm:hidden",
    },
    {
      title: "to",
      // dataIndex: "payee",
      className: "max-sm:hidden",
      render : (record)=>{
        return (
          <p>{ record.payees?.[0].identifier }</p>
        )
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className: "max-sm:hidden",
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
      </div>
      <p>Amount Paid to Settle Debit</p>
      <Table columns={columns} dataSource={settledExpenses} scroll={{ x: 'max-content' }}></Table>
    </div>
  );
};

export default SettleHistory;
