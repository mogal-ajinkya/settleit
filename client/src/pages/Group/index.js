import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message} from "antd";
import Divider from "../../components/Divider";
import { useParams } from "react-router-dom";
import { GetExpenseByGrpId } from "../../apicalls/expense";
import { useNavigate } from "react-router-dom";

function Group() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {

      dispatch(SetLoader(true));
      const response = await GetExpenseByGrpId(id);
      
      if (response.success) {
        dispatch(SetLoader(false));
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

      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`expenses`)}
      >
        <div className="px-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            expenses
          </h1>
      <Divider></Divider>
        </div>
      </div>

      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`members`)}
      >
        <div className="px-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            persons
          </h1>
      <Divider></Divider>
        </div>
      </div>
      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`settle`)}
        >
        <div className="px-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            to paid
          </h1>
        <Divider></Divider>
        </div>
      </div>
      <div
        className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer flex-wrap"
        onClick={() => navigate(`settlehistory`)}
        >
        <div className="px-2 flex flex-col">
          <h1 className="sm:text-lg sm:font-semibold max-sm:text-[10px]">
            paid history
          </h1>
        <Divider></Divider>
        </div>
      </div>

    </div>
  );
}

export default Group;
