import React, { useState } from "react";
import { Button, message, Table } from "antd";
import ExpensesForm from "./ExpensesForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetGroups } from "../../apicalls/products";
import { useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetExpense } from "../../apicalls/expense";
import { DeleteExpense } from "../../apicalls/expense";
const Expense = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
  const [expenses, setExpenses] = React.useState(null);
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  const [showExpenseForm, setshowExpenseForm] = React.useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetExpense({
        groupId:id,
        type:"expense"
      });
      console.log(response.data);
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
      className:"max-sm:hidden",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className:"max-sm:hidden",
    },
    {
      title: "Who Paid",
      dataIndex: "payer",
      className:"max-sm:hidden",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        moment(record.date).format("DD-MM-YYYY"),
      // moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
      className:"max-sm:hidden"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
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
      title: "To Whom",
      // dataIndex: "payees",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            {/* {console.log(record.identifier)} */}
            {/* {console.log(record)} */}
            {/* {text} */}
            {/* {console.log(text)} */}
            {
              record.payees?.map((payee)=>{
                console.log(payee.identifier)
                return <p>{payee.identifier} {payee.amount}</p>
              })
            }
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
      <Table columns={columns} dataSource={expenses} scroll={{ x: 'max-content' }}></Table>
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
