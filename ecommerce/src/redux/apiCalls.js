import axios from "axios";
import { publicRequest} from "../requestMethods";
import { loginFailure, loginSuccess, loginStart, updateFailure, updateStart, updateSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

export const register = async(dispatch, userInfo) => {
  dispatch(registerStart())
  if(userInfo.password !== userInfo.confirmPassword){
    dispatch(registerFailure())
    return
  }
  try{  
      await publicRequest.post('/auth/register', userInfo)
      dispatch(registerSuccess())
      alert("Registration Successful!")
  }catch(err){
    dispatch(registerFailure())
  }
}

  export const updateAccount = async(dispatch, id, accessToken, userInfo) => {
    dispatch(updateStart());
    try{
      const userRequest = axios.create({baseURL:"https://logo-ecommerce-app.herokuapp.com/api/",headers:{token:`Bearer ${accessToken}`}})
      const res = await userRequest.put(`/users/${id}`, userInfo) // res shud return data in User modal manner
      res.data.accessToken = accessToken;
      dispatch(updateSuccess(res.data))
      alert("Update Successful!")
    }catch(err){
      dispatch(updateFailure())
      alert("Update Failed!")
    }
  }

