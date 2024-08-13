import { Modal, Form, Input, Row, Col, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { useParams } from "react-router-dom";
import { EditExpense } from "../../apicalls/expense";
import { AddExpense } from "../../apicalls/expense";
import { GetGroupById } from "../../apicalls/groups";

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ExpensesForm({
  showExpenseForm,
  setshowExpenseForm,
  selectedExpense,
  getData,
}) {
  const { id } = useParams();
  const [groups, setGroups] = React.useState([]);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));

      const totalAmount = values.amount;
      const selectedMembers = Object.keys(values)
        .filter((key) => key.startsWith("paidFor_") && values[key])
        .map((key) => key.replace("paidFor_", ""));

      const amountPerPayee = totalAmount / selectedMembers.length;

      // Format payees array
      const payeesData = selectedMembers.map((member) => ({
        identifier: member,
        amount: amountPerPayee,
      }));

      // Clean up values to remove any dynamic fields
      Object.keys(values)
        .filter((key) => key.startsWith("paidFor_"))
        .forEach((key) => delete values[key]);

      values.payees = payeesData;
      values.groupId = id;
      values.type = "expense";

      let response = null;
      if (selectedExpense) {
        response = await EditExpense(selectedExpense._id, values);
      } else {
        response = await AddExpense(values);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setshowExpenseForm(false);
      } else {
        message.error(response.message);
        dispatch(SetLoader(false));
        setshowExpenseForm(false);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);

  // useEffect(() => {
  //   // console.log
  //   if (selectedExpense) {
  //     formRef.current.setFieldsValue(selectedExpense);
  //   } else {
  //     formRef.current.resetFields();
  //   }
  // }, [selectedExpense]);

  useEffect(() => {
    if (selectedExpense && formRef.current) {
      const reconstructedValues = {
        ...selectedExpense, // Preserve existing fields
        payer: selectedExpense.payer || "",
        date: selectedExpense.date ? selectedExpense.date.split("T")[0] : "",
      };

      if (selectedExpense.payees) {
        selectedExpense.payees.forEach((payee) => {
          const key = `paidFor_${payee.identifier}`;
          reconstructedValues[key] = true;
        });
      }

      formRef.current.setFieldsValue(reconstructedValues);
    } else if (formRef.current) {
      formRef.current.resetFields();
    }
  }, [selectedExpense]);

  const getGroupData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetGroupById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setGroups(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getGroupData();
  }, []);
  return (
    <Modal
      title=""
      open={showExpenseForm}
      onCancel={() => setshowExpenseForm(false)}
      centered
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <div className="text-2xl text-primary text-center font-semibold uppercase">
          {selectedExpense ? "Edit Expense" : "Add Expense"}
        </div>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item
            label="Date"
            name="date"
            rules={rules}
            className="text-lg font-semibold mb-2"
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={rules}
            className="text-lg font-semibold mb-2"
          >
            <Input Type="text" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Amount"
                name="amount"
                rules={rules}
                className="text-lg font-semibold mb-2"
              >
                <Input Type="number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Who Paid"
                name="payer"
                rules={rules}
                className="text-lg font-semibold mb-2"
              >
                <select name="" id="">
                  <option value="">Select</option>
                  {console.log(groups)}
                  {groups?.members?.map((member, index) => (
                    <option key={index} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-2">Paid for Whom:</p>
            <div className="space-y-4">
              {groups?.members?.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Form.Item
                    name={`paidFor_${member}`}
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Input type="checkbox" className="h-5 w-5" />
                  </Form.Item>
                  <span className="text-base">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default ExpensesForm;
