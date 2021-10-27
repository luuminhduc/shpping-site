import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { firestore } from "../../firebase/config";
import { getCurrentUser } from "../../redux/action/loginAction/actions";

const EditAddress = ({ checkout }) => {
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const { currentUser } = useSelector((state) => state.loginReducer);
  const { address } = currentUser;

  const history = useHistory();

  const dispatch = useDispatch();

  // FROM USE FORM
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  // LIST
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const watchCity = watch("city");
  const watchDistrict = watch("district");

  //   SUBMIT
  const submit = (data) => {
    console.log(data);
    firestore
      .collection("users")
      .doc(uid)
      .update({
        address: data,
      })
      .then(() => {
        dispatch(getCurrentUser(uid));
        if (checkout) {
          history.push("/checkout/payment");
        }
      });
  };

  useEffect(() => {
    if (address.city) {
      const { phoneNumber } = address;

      setValue("phoneNumber", phoneNumber);
      setValue("address", address.address);
    }
  }, [address, setValue]);

  //   FETCH CITY DATA
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => setCityList(res.data));
  }, []);

  //   WHEN CITY LIST WAS FETCHED, SET VALUE FOR CITY
  useEffect(() => {
    const { city } = address;
    if (cityList?.length > 0) {
      if (city) {
        setValue("city", city);
      } else {
        setValue("city", cityList[0].name);
      }
    }
  }, [cityList, address, setValue]);

  //   WHEN WATCH CITY CHANGES,
  useEffect(() => {
    if (watchCity) {
      setDistrictList(cityList.find((el) => el.name === watchCity)?.districts);
    }
    // eslint-disable-next-line
  }, [watchCity]);

  //   WHEN DISTRICT LIST IS FILLED, SET VALUE FOR DISTRICT
  useEffect(() => {
    const { district, city } = address;
    if (districtList?.length > 0) {
      if (district && city === watchCity) {
        setValue("district", district);
      } else {
        setValue("district", districtList[0].name);
      }
    }
  }, [districtList, setValue, address, watchCity]);

  // WHEN WATCH DISTRICT CHANGES, GET WARD LIST
  useEffect(() => {
    if (watchDistrict) {
      setWardList(districtList.find((el) => el.name === watchDistrict)?.wards);
    }
    // eslint-disable-next-line
  }, [watchDistrict]);

  //   WHEN WARD LIST IS FILLED, SET VALUE FOR WARD
  useEffect(() => {
    const { district, ward } = address;
    if (wardList?.length > 0) {
      if (ward && district === watchDistrict) {
        setValue("ward", ward);
      } else {
        setValue("ward", wardList[0].name);
      }
    }
  }, [wardList, address, watchDistrict, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit((data) => submit(data))}>
        {/* PHONE NUMBER */}
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm text-gray-600 font-light">
            Phone number
          </label>
          <input
            placeholder="Your phone number"
            {...register("phoneNumber", { required: true })}
            type="text"
            className={`w-full focus:outline-none focus:border-blue-600 p-3 rounded border border-solid border-gray-200 ${
              errors.phoneNumber && "border-red-500"
            }`}
          />
          {errors.phoneNumber && (
            <small className="text-red-500 text-sm">
              Phone number can not be blank
            </small>
          )}
        </div>

        {/* CITY */}
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm text-gray-600 font-light">City</label>
          <select
            {...register("city", { required: true })}
            className={`w-full focus:outline-none focus:border-blue-600 text-sm p-3 rounded border border-solid border-gray-200`}
          >
            {cityList?.length > 0 &&
              cityList.map((el, i) => <option key={i}>{el.name}</option>)}
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm text-gray-600 font-light">District</label>
          <select
            {...register("district", { required: true })}
            className={`w-full focus:outline-none focus:border-blue-600 text-sm p-3 rounded border border-solid border-gray-200`}
          >
            {districtList?.length > 0 &&
              districtList.map((el, i) => <option key={i}>{el.name}</option>)}
          </select>
        </div>

        {/* Ward */}
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm text-gray-600 font-light">Ward</label>
          <select
            {...register("ward", { required: true })}
            className={`w-full focus:outline-none focus:border-blue-600 text-sm p-3 rounded border border-solid border-gray-200`}
          >
            {wardList?.length > 0 &&
              wardList.map((el, i) => <option key={i}>{el.name}</option>)}
          </select>
        </div>

        {/* Address */}
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm text-gray-600 font-light">Address</label>
          <input
            {...register("address", { required: true })}
            type="text"
            placeholder="Detailed address"
            className={`w-full focus:outline-none focus:border-blue-600 p-3 rounded border border-solid border-gray-200 ${
              errors.address && "border-red-500"
            }`}
          />
          {errors.address && (
            <small className="text-red-500 text-sm">
              Address can not be blank
            </small>
          )}
        </div>

        {/* BUTTON */}
        <div className="flex mt-5 flex-row justify-end items-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-3xl"
            type="submit"
          >
            {checkout ? "Next step" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
