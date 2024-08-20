import { useEffect, useState } from "react"
import { ModalLayout } from "./Modal"
import Error from "@/components/icons/ErrorIcon"


export const ErrorModal = ({message,onClose}) =>{
   
    return(
        <ModalLayout
        icon={
            <Error/>
        }
        mess={message}
        onClose={onClose}
    />
    )
}