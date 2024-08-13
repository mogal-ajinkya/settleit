import { Modal, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { AddGroup,EditGroup } from "../../apicalls/groups";

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
          {selectedGroup ? "Edit Group" : "Add Group"}
        </div>
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              
              <Form.Item label="Group Name" name="name" rules={rules} className="text-lg font-semibold mb-2">
                <Input Type="text" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules} className="text-lg font-semibold mb-2">
                <Input Type="text" />
              </Form.Item>
            </Form>
      </div>
    </Modal>
  );
}

export default ProductsForm;
