import React, { Fragment } from "react";
import { useState } from "react";
import {
  loginService,
  updateEmail,
  updatePassword,
} from "../../services/user.services";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/actions/user.actions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toogleEmail, tooglePassword } from "../../redux/reducers/User";
import { requestPayment } from "../../services/service.services";
const PaymentEmail = (props) => {
  const { onClose } = props;
  const backdrop = () => {
    onClose(false);
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const handleLogin = async () => {
    const [response, error] = await requestPayment({
      receiverPaypalEmail: data.email,
    });
    if (response) {
      toast.success(response.data);
      onClose(false);
    } else {
      if (error.response.data.errors) {
        error.response.data.errors.forEach((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error(error.response.data.msg);
      }
    }
  };
  const handleInput = (e, type) => {
    if (type === "remember") {
      setData({ ...data, [type]: e.target.checked });
    } else {
      setData({ ...data, [type]: e.target.value });
    }
  };
  return (
    <div className="min-h-screen fixed top-[0%] left-[0%] w-[100vw]  z-[122200] flex flex-col justify-center items-center sm:py-12">
      <div
        onClick={() => backdrop()}
        className="w-full h-full absolute top-0 left-0 backdrop-blur-sm bg-black/50 z-[1]"
      ></div>
      <div className="bg-white pt-5 md:w-full md:max-w-md shadow w-full rounded-[20px] z-[22] flex flex-col justify-center items-center">
        <div className="px-7 py-7 w-[80%]">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Paypal Email ID
          </label>
          <input
            onChange={(e) => handleInput(e, "email")}
            type="email"
            value={data.email}
            className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
          />

          <button
            type="button"
            className="transition mt-2 duration-200 bg-accent hover:bg-secondary focus:bg-secondary focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            onClick={handleLogin}
          >
            <span className="inline-block mr-2">Redeem</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentEmail;
