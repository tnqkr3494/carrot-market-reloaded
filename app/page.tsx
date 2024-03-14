export default function Home() {
  return (
    <main className="bg-gray-400 h-screen flex justify-center items-center p-8 capitalize">
      <div className="bg-white w-full rounded-md p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-gray-600">in transit</span>
            <span className="text-2xl font-bold -mt-2">coolblue</span>
          </div>
          <div className="w-10 h-10 bg-orange-400 rounded-full" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white bg-green-400 px-2.5 py-1 rounded-xl">
            Today
          </span>
          <span>9:30-10:30u</span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-300 h-2 rounded-lg absolute" />
          <div className="w-2/3 bg-green-300 h-2 rounded-lg absolute" />
        </div>
        <div className="mt-4 flex justify-between text-gray-500">
          <span>expected</span>
          <span>sorting center</span>
          <span>in transit</span>
          <span className="text-gray-400">Deliverd</span>
        </div>
      </div>
    </main>
  );
}
