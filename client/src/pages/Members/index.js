import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetGroupById } from "../../apicalls/groups";
// import { Button } from "antd/es/radio";
import { AddGroup, EditGroup } from "../../apicalls/groups";
import { Button, Table } from "antd";

const Members = () => {
  const { id } = useParams();

  const [groups, setGroups] = React.useState([]);
  const [newMember, setNewMember] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
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
    // console.log(filters)
    getData();
  }, []);

  const onFinish = async () => {
    try {
      dispatch(SetLoader(true));
      console.log(groups);
      let response = await EditGroup(groups._id, groups);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        dispatch(SetLoader(false));
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const addMember = () => {
    if (newMember) {
      setGroups((prevGroup) => ({
        ...prevGroup,
        members: [...prevGroup.members, newMember],
      }));
      console.log(groups);
      setNewMember("");
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6  border border-gray-300 rounded border-solid shadow-lg">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{groups.name}</h2>
        <p className="text-gray-600">{groups.description}</p>
        <div className="flex flex-row gap-4 m-4">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter member Name"
            className="p-2 border border-gray-300 shadow-sm focus:outline-none w-[95%]"
          />
            <Button type="primary" onClick={addMember}>
              Add Member
            </Button>
        </div>

        <div>
            <p>Current Members :- </p>
        </div>
        {groups?.members?.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {groups.members.map((member, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded-md shadow-sm">
                  {`${index+1} . ${member}`}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No Members</div>
        )}
        <Button onClick={onFinish} type="primary">
          Save Group
        </Button>
      </div>
    </div>
  );
};

export default Members;
