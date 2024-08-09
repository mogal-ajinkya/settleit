import { message} from "antd";
import React from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { SetLoader } from "../redux/loadersSlice";
import { GetCurrentUser } from "../apicalls/users";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));

      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };



  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
      // message.error("Please login to access this page");
    }
  }, []);


  return (
    user && (
      <div>
        {/* header  */}
        <div className="flex justify-between items-center bg-primary p-5 w-full ">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            SPLIT IT
          </h1>


          <div className="bg-white py-2 px-5 rounded flex gap-2 items-center">
            <span
              className="cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              <div className="max-sm:hidden underline ">
              {user.name}
              </div>
              <div className="sm:hidden">
              <i class="ri-account-circle-line font-size-[34px]"></i>
                
              </div>
            </span>
            <i
              className ="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>



        </div>
        {/* body */}


        <div className="p-5">{children}</div>

      </div>
    )
  );
}

export default ProtectedPage;
