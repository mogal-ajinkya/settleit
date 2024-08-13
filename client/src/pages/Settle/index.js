import React, { useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSettlementByGrpId } from "../../apicalls/settlement";
import { AddExpense } from "../../apicalls/expense";

const Settle = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
  const [settlement, setSettlement] = React.useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetSettlementByGrpId(id);
      console.log(response);
      if (response.success) {
        dispatch(SetLoader(false));
        setSettlement(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const Settle = async (record) => {
    try {
      dispatch(SetLoader(true));
      const newExpenseData = {
        amount: record.amount,
        description: "",
        payer: record.from,
        payees: [
          {
            identifier:record.to, 
            amount: record.amount,
          }
        ],
        groupId: id,
        date:Date.now(),
        type: "settlement",
      };
      console.log(newExpenseData)
      const response = await AddExpense(newExpenseData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "From ",
      dataIndex: "from",
      className:"text-lg font-medium text-gray-800 mr-2 max-sm:hidden"
    },
    {
      title: "to",
      dataIndex: "to",
      className:"text-lg font-medium text-gray-800 mr-2 max-sm:hidden"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className:"text-lg font-medium text-gray-800 mr-2 max-sm:hidden"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => {
                Settle(record);
              }}
              className="text-lg font-medium text-gray-800 mr-2 max-sm:hidden"
            >
              Pay{" "}
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
      </div>
      <Table
        columns={columns}
        dataSource={settlement}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};

export default Settle;
