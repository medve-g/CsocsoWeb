function LogInSignUp() {
  return (
    <div className="w-full mt-96 relative">
      <div className="bg-white max-w-md px-10 py-20 rounded-xl drop-shadow-lg max-sm:px-1 max-sm:py-8 absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-10 mx-5 text-[45px] text-center max-sm:text-[35px]  text-black font-semibold">
          Bejelentkezés
        </h1>
        <div className="flex flex-col">
          <div className="px-5 text-left">
            <label className="font-medium text-lg">Email</label>
            <input
              className="w-full border rounded-xl p-3 mt-1 mb-3"
              placeholder="Írja be az email címét"
              type="email"
            />
          </div>
          <div className="px-5 text-left">
            <label className="font-medium text-lg">Jelszó</label>
            <input
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Írja be a jelszavát"
              type="password"
            />
          </div>
          <div className="text-right pr-5 mt-2 hover:text-green-600 cursor-pointer">
            <p>Elfelejtette jelszavát?</p>
          </div>
          <div className="w-full p-5 mt-3">
            <button
              className="w-full border-2 rounded-md p-3 font-bold bg-green-600 text-white text-lg border-gray-500 hover:text-gray-600 hover:bg-white hover:border-green-600"
              type="submit"
            >
              Bejelentkezés
            </button>
          </div>
          <div className="flex mt-3 px-5 justify-between">
            <p>Nincs még fiókod</p>
            <p className="hover:text-green-600 cursor-pointer">Regisztráció</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInSignUp;
