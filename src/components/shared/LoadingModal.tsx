import { useEffect, useState } from "react"
import { ModalLayout } from "./Modal"
import { Loading } from "./Loading"


export const LoadingModal = ({message}) =>{
   
    return(
        <ModalLayout
        icon={
            <Loading/>
        }
        mess={message}
    />
    )
}