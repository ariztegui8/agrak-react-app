import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api/usersApi';
import { UserTypeApi } from '../types/type';
import { MdKeyboardBackspace } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebase';

const UserCreate = () => {
    
    const [form, setForm] = useState({
        first_name: '',
        second_name: '',
        email: '',
    });
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const { first_name, second_name, email } = form;

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/');
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        let avatarUrl = null;

        if (avatar) {
            const storageRef = ref(storage, `avatars/${avatar.name}`);
            try {
                await uploadBytes(storageRef, avatar);
                avatarUrl = await getDownloadURL(storageRef);
            } catch (error) {
                console.error('Error al cargar la imagen', error);
                setLoading(false);
                return;
            }
        }

        const userData: UserTypeApi = {
            first_name: first_name,
            second_name: second_name,
            email: email,
            avatar: avatarUrl,
        };

        try {
            await addUserMutation.mutateAsync(userData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-6'>
            <div className='mb-4 flex'>
                <Link to="/">
                    <button className='bg-[#3A7C96] text-white py-1 px-3 duration-300 hover:bg-[#336c83] flex items-center gap-1'>
                        <MdKeyboardBackspace
                            size={20}
                            color="#fff"
                        />
                        Volver
                    </button>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className='max-w-3xl m-auto'>
                <div className='mb-5'>
                    <h2 className="text-xl text-[#0F172A] font-semibold">Crear Nuevo Usuario</h2>
                </div>
                <div className='mb-3'>
                    <p className='font-semibold mb-1 text-sm'>Nombre:</p>
                    <input
                        type="text"
                        className='w-full border border-gray-300 p-2 outline-[#85C88A]'
                        name='first_name'
                        value={first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <p className='font-semibold mb-1 text-sm'>Apellido:</p>
                    <input
                        type="text"
                        className='w-full border border-gray-300 p-2 outline-[#85C88A]'
                        name='second_name'
                        value={second_name}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <p className='font-semibold mb-1 text-sm'>Email:</p>
                    <input
                        type="email"
                        className='w-full border border-gray-300 p-2 outline-[#85C88A]'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-6'>
                    <p className='font-semibold mb-1 text-sm'>Avatar:</p>
                    <input
                        type="file"
                        className='w-full border border-gray-300 p-2 outline-[#85C88A]'
                        onChange={handleFileChange}
                    />
                </div>

                <div className='flex gap-2 justify-end'>
                    <Link to="/">
                        <button className='bg-[#048ABF] text-white py-1 px-6 duration-300 hover:bg-[#056c95]'>Cancelar</button>
                    </Link>
                    <button type='submit' className={`bg-[#85C88A] text-white py-1 px-3 duration-300 hover:bg-[#72ac76] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                        {loading ? 'Creando...' : 'Crear Usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserCreate;
