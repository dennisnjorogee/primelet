
const Login = () => {



  return (
    <div className='flex flex-col p-6 items-center justify-between'>
        <div className="flex flex-col justify-between items-center gap-6 m-2 p-4 border-0 border-black rounded-lg bg-gray-100 shadow-2xl  w-[60vh]">
            <div className="bg-blue-500 px-4 py-2 rounded-full ">
                <h1 className="text-amber-500 text-2xl font-bold">Sign In</h1>
            </div>

            <div className="bg-gray-400 px-4 py-2 rounded-2xl">
                <p className="text-white font-semibold">Sign in with your account</p>
            </div>
            
            <div className="flex flex-col justify-between items-center gap-6">
                <input className="py-3 px-2 border-0 rounded-full bg-blue-50" type="email" placeholder="Email" />
                <input className="py-3 px-2 border-0 rounded-full bg-blue-50" type="password" placeholder="password" />
            </div>

            <div>
                <button className="bg-blue-500 px-4 py-2 rounded-full cursor-pointer text-white font-bold" >Sign In</button>
            </div>

        </div>
    </div>
  )
}

export default Login