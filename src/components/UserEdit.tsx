import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../api/usersApi';
import { UserType } from '../types/type';
import { MdKeyboardBackspace } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebase';
import { ClipLoader } from 'react-spinners';

const UserEdit = () => {

  const { id } = useParams<{ id: UserType['id'] }>();
  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    email: '',
    avatar: '',
    createdAt: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { first_name, second_name, email, avatar, createdAt } = form;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const data = await getUser(id);
      setForm({
        first_name: data.first_name,
        second_name: data.second_name,
        email: data.email,
        avatar: data.avatar,
        createdAt: data.createdAt
      });
      return data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
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
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let avatarUrl = avatar;

    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${avatarFile.name}`);
      try {
        await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error al cargar la imagen', error);
        setLoading(false);
        return;
      }
    }

    const userData: UserType = {
      id: id!,
      first_name: first_name,
      second_name: second_name,
      email: email,
      avatar: avatarUrl,
      createdAt: createdAt
    };

    try {
      await updateUserMutation.mutateAsync(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(id!);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='px-6'>

      {isLoading ?
        <div className="m-auto text-center">
          <ClipLoader
            color="#048ABF"
            size={35}
          />
        </div>

        :

        <>
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
              <h2 className="text-xl text-[#0F172A] font-semibold">Actualizar Usuario</h2>
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

            <div className='flex flex-col sm:flex-row gap-2 justify-end'>
              <Link to="/">
                <button className='bg-[#048ABF] text-white py-1 px-3 duration-300 hover:bg-[#056c95] w-full'>Cancelar</button>
              </Link>
              <button type='button' onClick={handleDelete} className='bg-[#D49BC5] text-white py-1 px-3 duration-300 hover:bg-[#c08db2]'>Eliminar</button>
              <button type='submit' className={`bg-[#85C88A] text-white py-1 px-3 duration-300 hover:bg-[#72ac76] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </form>

        </>

      }

    </div>
  );
}

export default UserEdit;
