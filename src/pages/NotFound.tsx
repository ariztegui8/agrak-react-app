import { MdKeyboardBackspace } from "react-icons/md"
import { Link, useRouteError } from "react-router-dom"

type RouteError = {
  statusText: string
  message: string
}

const NotFound = () => {

  const error = useRouteError() as RouteError;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 bg-[#F3F4F6] min-h-screen p-6">
      <div className="w-36 h-36 border-2 border-white overflow-hidden rounded-full">
        <img src="/images/agrak.png" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="text-center sm:text-start">
        <h1 className="text-4xl font-bold mb-3">OOPS! PAGE NOT FOUND</h1>
        <p className="text-2xl mb-6">Error 404 - <span className="text-xl" >{error?.statusText || error?.message}</span></p>
        <div className="flex justify-center sm:justify-start ">
          <Link to="/">
            <button className='bg-[#3A7C96] text-white py-1 px-3 duration-300 hover:bg-[#336c83] flex items-center gap-1'>
              <MdKeyboardBackspace
                size={20}
                color="#fff"
              />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound