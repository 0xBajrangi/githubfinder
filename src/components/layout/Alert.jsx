import { useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext'
import { FaPlus } from "react-icons/fa";

function Alert() {
  const { alert } = useContext(AlertContext);

  return alert!==null &&(
    <span className="flex items-center mb-4 space-x-2 ">
      {alert.type === "error" && (
        <FaPlus style={{transform: "rotate(-45deg)"} }/>
        
   )}
      <p className="flex-1 text-base font-semibold leading leading-7 text-white">
        <strong>{alert.msg}</strong>
      </p>
</span>
  )
}

export default Alert

