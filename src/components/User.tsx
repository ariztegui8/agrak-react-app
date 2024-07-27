import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/usersApi";
import { UserType } from "../types/type";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";

type UserProps = {
    user: UserType;
};

const User = ({ user }: UserProps) => {
    const { first_name, second_name, avatar, email } = user;

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate("/");
        },
    });

    const handleEdit = () => {
        navigate(`/edit/${user.id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteUserMutation.mutateAsync(user.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="border shadow-md p-4 bg-white rounded-sm">
            <div className="mb-3">
                <p className="text-[#64748B] font-semibold break-words">{first_name} {second_name}</p>
            </div>
            <div className="w-44 h-44 border-2 border-white rounded-xl shadow-lg m-auto relative mb-6">
                <img src={avatar} className="w-full h-full object-cover rounded-xl" alt="" />
                <div onClick={handleEdit} className="absolute -bottom-4 -right-4 w-11 h-11 bg-white/80 shadow-lg shadow-[#A1A1A1]/25 flex items-center justify-center rounded-full cursor-pointer duration-150 hover:bg-white">
                    <RiEdit2Line
                        size={26}
                        color="#64748B"
                    />
                </div>
            </div>

            <div className="mb-6">
                <p className="text-[#64748B] break-words">{email}</p>
            </div>

            <div>
                <button onClick={handleDelete} className='bg-[#D49BC5] w-full text-white py-1 px-4 duration-300 hover:bg-[#c08db2]' >Eliminar</button>
            </div>
        </div>
    );
};

export default User;
