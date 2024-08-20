import { useEffect, useState } from "react"
import { ModalLayout } from "./Modal"
import SuccessIcon from './../icons/SuccessIcon';



export const SuccessModal = ({message,onClose}) =>{
   
    return(
        <ModalLayout
        icon={
            <SuccessIcon/>
        }
        mess={message}
        onClose={onClose}
    />
    )
}