import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, message, Table } from "antd";
import moment from "moment";

import { SetLoader } from "../../redux/loadersSlice";
import ExpensesForm from "./ExpensesForm";
import { GetExpense, DeleteExpense } from "../../apicalls/expense";

const Expense = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = React.useState(null);
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  const [showExpenseForm, setshowExpenseForm] = React.useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetExpense({
        groupId: id,
        type: "expense",
      });
      if (response.success) {
        dispatch(SetLoader(false));
        setExpenses(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteExpense(id);
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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Who Paid",
      dataIndex: "payer",
      // className:"flex items-center bg-gray-100 p-2 rounded-lg shadow-sm",
      className:"text-lg font-medium text-gray-800 mr-2"
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (record) => moment(record.date).format("DD-MM-YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text,record) => {
        return (
          <div className="flex gap-5 items-center">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteExpense(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedExpense(record);
                setshowExpenseForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
    {
      title: "For Whom",
render: (text, record) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {record.payees?.map((payee) => (
        <div key={payee.identifier} className="flex items-center bg-gray-100 p-2 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-800 mr-2">
            {payee.identifier}
          </p>
          <p className="text-sm text-gray-600">
            {payee.amount.toFixed(2)} {/* Ensure amount is displayed with two decimal places */}
          </p>
        </div>
      ))}
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
        <Button
          type="default"
          onClick={() => {
            setshowExpenseForm(true);
            setSelectedExpense(null);
          }}
        >
          Add Expense
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={expenses}
        scroll={{ x: "max-content" }}
      ></Table>
      {showExpenseForm && (
        <ExpensesForm
          showExpenseForm={showExpenseForm}
          setshowExpenseForm={setshowExpenseForm}
          selectedExpense={selectedExpense}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Expense;
