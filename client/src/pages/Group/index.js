import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message} from "antd";
import Divider from "../../components/Divider";
import { useParams } from "react-router-dom";
import { GetGroupById } from "../../apicalls/groups";
import { useNavigate } from "react-router-dom";

function Group() {
  const { user } = useSelector((state) => state.users);
  const [groups, setGroups] = React.useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

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
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className=" flex gap-5 flex-col">
      <div className="flex justify-center">

      <h1 className="text-2xl font-bold text-gray-800">
        { groups?.name}
          </h1>
          </div>
      
      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`expenses`)}
      >
        <div className="px-2 flex flex-col p-2">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            Group Expenses
          </h1>
      <Divider></Divider>
        </div>
      </div>

      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`members`)}
      >
        <div className=" flex flex-col p-2">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            Group Members
          </h1>
      <Divider></Divider>
        </div>
      </div>
      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`settle`)}
        >
        <div className="p-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            To be paid
          </h1>
        <Divider></Divider>
        </div>
      </div>
      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`settlehistory`)}
        >
        <div className="p-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            Paid history
          </h1>
        <Divider></Divider>
        </div>
      </div>

    </div>
  );
}

export default Group;
