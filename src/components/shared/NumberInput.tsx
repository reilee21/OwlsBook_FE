import React, { useEffect } from 'react';
import { Input } from "../ui/input";

interface InputProps {
    name:string;
    initvalue: number;
    change: (val: number) => void;
    isRequired: boolean;
    placeholder: string;
    maxNumber: number;
}

export default function NumberInput({ initvalue,name, change, isRequired, placeholder, maxNumber }: InputProps) {
    const [numb,setNumb] = React.useState(initvalue); 

    useEffect(()=>{
        if(initvalue){
            setNumb(initvalue)
        }
    },[initvalue])

    const validateNumber = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const theEvent = evt || window.event;
        let key: string;
        if (theEvent.type === 'paste') {
            key = (evt as ClipboardEvent).clipboardData!.getData('text/plain');
        } else {
            key = theEvent.key;
        }
        const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
        const regex = /^[0-9\b]+$/;
        if (!regex.test(key) && !specialKeys.includes(key)) {
            theEvent.preventDefault();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let val = value.replace(/,/g, '');
        const numericVal = Number(val);

        if (numericVal <= maxNumber) {
            setNumb(numericVal)
            change(numericVal);
        }
    };

    return (
        <Input
            name={name}
            placeholder={placeholder}
            type="text"
            value={numb.toLocaleString()}
            onChange={handleChange}
            onKeyDown={validateNumber}
            required={isRequired}
        />
    );
}
