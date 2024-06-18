import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onLoginWithFacebook, onLoginWithGoogle } from "../../../store/actions";
import { toast } from "react-toastify";

const LoginSuccessSocial = () => {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { userId, provider } = useParams()

  const dispatch = useDispatch()

  const callApiLogin = async () => {
    
    if (userId && provider) {
      if (provider === 'facebook') {
        const facebook = await dispatch(onLoginWithFacebook({ userId, provider }))
        if (facebook?.payload?.metaData?.customer) {
          toast.success("Đăng nhập bằng facebook thành công")
        } else {
          toast.error("Đăng nhập bằng facebook không thành công")
        }
      }
      if (provider === 'google') {
        const google = await dispatch(onLoginWithGoogle({ userId, provider }))
        console.log("aaaa", google)
        if (google?.payload?.metaData?.customer) {
          toast.success("Đăng nhập bằng google thành công")
        } else {
          toast.error("Đăng nhập bằng google không thành công")
        }
      }
    }
  }
  useEffect(() => {
    callApiLogin()
  }, [])
  // useEffect(() => {
  //   if (userInfo) {
  //     toast.success(`Đăng nhập bằng ${provider} thành công`)
  //   } else {
  //     toast.error(`Vui lòng đăng nhập lại`)
  //   }
  // }, [])

  return userInfo ? <Navigate to="/" /> : <Navigate to="/dang-nhap" />;
};

export default LoginSuccessSocial;
