import "./alert.css";
import { useSelector } from "react-redux";

// export interface AlertInfo {
//   text: string;
//   status: string;
// }

const Alert = () => {
  const alertInfo: any = useSelector((state: any) => state.alert.value);
  const {text, status} = alertInfo;

  return (
    <div
      className={`alert-container ${status}`}
    >{text}
    </div>
  );
};

export default Alert;