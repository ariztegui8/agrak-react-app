import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/usersApi"
import User from "./User"
import { UserType } from "../types/type"
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import { ClipLoader } from "react-spinners"


const UsersList = () => {

    const { isLoading, data, isError, error } = useQuery<UserType[]>({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="px-6">
            {isLoading ?
                <div className="m-auto text-center">
                    <ClipLoader
                        color="#048ABF"
                        size={35}
                    />
                </div>

                :

                <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
                        <h2 className="text-xl text-[#0F172A] font-semibold">Listado de Usuarios</h2>
                        <Link to="/create">
                            <button className='bg-[#85C88A] text-white py-1 px-3 duration-300 hover:bg-[#72ac76] flex items-center gap-1'>
                                <IoMdAdd
                                    size={20}
                                    color="#fff"
                                />
                                Agregar Usuario
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
                        {data?.map(user => (
                            <User
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default UsersList