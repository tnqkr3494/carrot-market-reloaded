export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex justify-center items-center p-8 capitalize">
      <div className="bg-white w-full rounded-md p-6 max-w-screen-sm shadow-lg flex flex-col">
        <input
          type="email"
          placeholder="Email"
          required
          className="bg-gray-300 rounded-full px-4 py-2 mb-4 outline-none focus:ring ring-green-500 ring-offset-2 invalid:focus:ring-red-500 peer"
        />
        <span className="text-red hidden peer-invalid:block">
          Email is required
        </span>
        <button className="bg-black text-white px-6 py-2 rounded-full active:scale-90 transition-transform">
          Log in
        </button>
      </div>
    </main>
  );
}
