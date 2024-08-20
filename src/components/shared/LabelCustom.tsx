



interface LabelProps{
    label:string;
    value:string;

    className:string;
}

export default function OwlsLabel ({label='123',value='123',className}:LabelProps){
    return(
        <div className={'w-full flex flex-row  items-center '+`${className ? className : 'justify-between'}`}>
            <h5 className="text-sm font-semibold">
                {label}
            </h5>
            <h5 className="text-sm font-normal">
                {value}
            </h5>
        </div>
    )
}