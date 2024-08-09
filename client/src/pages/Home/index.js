import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { Button } from "antd/es/radio";
import { GetGroups } from "../../apicalls/products";
import Divider from "../../components/Divider";
import GroupsForm from "./GroupsForm";

function Home() {
  const [groups, setGroups] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [showGroupForm, setshowGroupForm] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetGroups();
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
    getData();
  }, []);

  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col gap-5 w-full">
        {/*create group button  */}
        <div className="flex justify-end mb-2">
          <Button
            type="default"
            onClick={() => {
              setshowGroupForm(true);
              setSelectedGroup(null);
            }}
          >
            Add Product
          </Button>
        </div>
        {showGroupForm && (
          <GroupsForm
            showGroupForm={showGroupForm}
            setshowGroupForm={setshowGroupForm}
            selectedGroup={selectedGroup}
            getData={getData}
          />
        )}
        <div className="grid-cols-5 max-sm:grid-cols-3">
          {groups?.map((group) => {
            return (
              <div className="flex flex-row border border-gray-300 rounded border-solid pb-2 ">
                <div
                  className="flex flex-col gap-2 cursor-pointer flex-wrap"
                  key={group._id}
                  onClick={() => navigate(`/product/${group._id}`)}
                >
                  <div className="px-2 flex flex-col">
                    <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
                      {group.name}
                    </h1>
                    <Divider />
                  </div>
                </div>
                <i
                  className="ri-pencil-line"
                  onClick={() => {
                    setshowGroupForm(true);
                    setSelectedGroup(group);
                  }}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
