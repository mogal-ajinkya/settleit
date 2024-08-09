import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { SetLoader } from "../../../redux/loadersSlice";
import { SetLoader } from "../../redux/loadersSlice";
// import { AddProduct, EditProduct } from "../../../apicalls/products";
import { AddGroup,EditGroup } from "../../apicalls/products";
// import Images from "./Images";
// import Images from
// import FormItem from "antd/es/form/FormItem";
// import PhoneInput from "antd-phone-input";

const rules = [
  {
    required: true,
    message: "Required",
  },
];
function ProductsForm({
  showGroupForm,
  setshowGroupForm,
  selectedGroup,
  getData,
}) {
  const [SelectedTab, setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));

      let response = null;
      if (selectedGroup) {
        response = await EditGroup(selectedGroup._id, values);
      } else {
        values.owner = user._id;
        console.log(values);
        response = await AddGroup(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setshowGroupForm(false);
      } else {
        message.error(response.message);
        dispatch(SetLoader(false));
        setshowGroupForm(false);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedGroup) {
      formRef.current.setFieldsValue(selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <Modal
      title=""
      open={showGroupForm}
      onCancel={() => setshowGroupForm(false)}
      centered
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <div className="text-2xl text-primary text-center font-semibold uppercase">
          {selectedGroup ? "Edit Product" : "Add Product"}
        </div>
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              
              <Form.Item label="Product Name" name="name" rules={rules}>
                <Input Type="text" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules}>
                <Input Type="text" />
              </Form.Item>
            </Form>
      </div>
    </Modal>
  );
}

export default ProductsForm;
