import Image from "next/image"
import Container from "../shared/Container"
import { useRouter } from "next/navigation"




const EmptyCart = ()=>{
    const router = useRouter();
    return(
        <Container>
            <div className="p-8 m-8 rounded-xl shadow flex flex-col items-center justify-center">
                <Image
                    alt="empty"
                    width={200}
                    height={200}
                    src={`/empty.png`}/>
                
                <div onClick={()=>router.push('/')}
                 className="cursor-pointer rounded-lg bg-stone-800 hover:bg-stone-900 text-white p-[12px] text-md font-semibold">
                    TIẾP TỤC MUA HÀNG
                </div>
            </div>
               
        </Container>
    )
}

export default EmptyCart