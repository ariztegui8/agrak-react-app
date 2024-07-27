import { MdEmail } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";

const Navbar = () => {
    return (
        <div className='bg-[#048ABF] py-2 px-6 mb-6'>
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border-2 border-white overflow-hidden rounded-full bg-gray-50">
                        <img src="/images/agrak.png" className="w-full h-full object-cover" alt="" />
                    </div>
                    <p className="text-white font-semibold">JORGE ARIZTEGUI</p>
                </div>

                <div className="flex items-center gap-5">
                    <MdEmail
                        size={20}
                        color="#fff"
                        className="cursor-pointer"
                    />
                    <IoNotifications
                        size={20}
                        color="#fff"
                        className="cursor-pointer"
                    />
                    <IoMdMore
                        size={20}
                        color="#fff"
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar