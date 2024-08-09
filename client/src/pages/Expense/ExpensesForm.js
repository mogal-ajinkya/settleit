import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice"
import { useParams } from "react-router-dom";
import { EditExpense } from "../../apicalls/expense";
import { AddExpense } from "../../apicalls/expense";
import { GetGroupById } from "../../apicalls/products";
import { useState } from "react";

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
  const [SelectedTab, setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));

      const totalAmount = values.amount;
      const selectedMembers = Object.keys(values)
        .filter(key => key.startsWith('paidFor_') && values[key])
        .map(key => key.replace('paidFor_', ''));

      const amountPerPayee = totalAmount / selectedMembers.length;

      // Format payees array
      const payeesData = selectedMembers.map(member => ({
        identifier: member,
        amount: amountPerPayee,
      }));

      // Clean up values to remove any dynamic fields
      Object.keys(values)
        .filter(key => key.startsWith('paidFor_'))
        .forEach(key => delete values[key]);
      
      values.payees = payeesData;
      values.groupId = id;
      values.type = 'expense';

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

  useEffect(() => {
    if (selectedExpense) {
      formRef.current.setFieldsValue(selectedExpense);
    }
  }, [selectedExpense]);

  const getGroupData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetGroupById(id);
      // console.log(response);
      dispatch(SetLoader(false));
      if (response.success) {
        // console.log(response.data);
        setGroups(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    // console.log(filters)
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
      {...(SelectedTab === "2" && { footer: false })}
    >
      <div>
        <div className="text-2xl text-primary text-center font-semibold uppercase">
          {selectedExpense ? "Edit Product" : "Add Product"}
        </div>
        <Tabs
          defaultActiveKey="1"
          activeKey={SelectedTab}
          onChange={(key) => setSelectedTab(key)}
          // width="80vw"
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Date" name="date" rules={rules}>
                <Input
                  type="date"
                  // defaultValue={new Date().toISOString().split("T")[0]}
                />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules}>
                <Input Type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Amount" name="amount" rules={rules}>
                    <Input Type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Who Paid" name="payer" rules={rules}>
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
                
              <div className="flex gap-10 flex-col">
                <p>Paid for Whom : </p>
                {groups?.members?.map((member, index) => (
                  <Form.Item
                    key={index}
                    label={member}
                    name={`paidFor_${member}`}
                    valuePropName="checked"
                  >
                    <Input
                      type="checkbox"
                    />
                  </Form.Item>
                ))}
              </div>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ExpensesForm;
