import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { Button } from "antd/es/radio";
import { GetGroups } from "../../apicalls/groups";
import Divider from "../../components/Divider";
import GroupsForm from "./GroupsForm";
import {DeleteGroup} from "../../apicalls/groups"

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

  const deleteExpense = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteGroup(id);
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


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-5 w-full">
        {/*create group button  */}
        <div className="flex justify-end mb-4">
          <Button
            type="default"
            onClick={() => {
              setshowGroupForm(true);
              setSelectedGroup(null);
            }}
          >
            Create New Sheet
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

        {groups?.map((group) => {
          return (
            <div className="flex flex-col gap-2 border border-gray-300 rounded border-solid p-2 ">
              <div className="flex flex-row">
                <div
                  className="flex flex-col cursor-pointer w-[98%]"
                  key={group._id}
                  onClick={() => navigate(`/product/${group._id}`)}
                >
                  <div className="flex flex-col">
                    <h1 className="text-lg">
                      {group.name}
                    </h1>
                  </div>
                </div>
                <i
                  className="ri-pencil-line cursor-pointer p-1"
                  onClick={() => {
                    setshowGroupForm(true);
                    setSelectedGroup(group);
                  }}
                ></i>
                <i
              className="ri-delete-bin-line p-1"
              onClick={() => {
                deleteExpense(group._id);
              }}
            ></i>
              </div>
              <Divider />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
