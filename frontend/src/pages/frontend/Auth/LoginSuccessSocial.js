import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onLoginWithFacebook, onLoginWithGoogle } from "../../../store/actions";

const LoginSuccessSocial = () => {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { userId, provider } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    userId && (provider === 'facebook' ? dispatch(onLoginWithFacebook({ userId, provider})) : dispatch(onLoginWithGoogle({ userId, provider })))
  }, [])

  return userInfo ? <Navigate to="/" /> : <Navigate to="/login" replace={true} />;
};

export default LoginSuccessSocial;
