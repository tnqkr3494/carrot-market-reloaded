export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex justify-center items-center p-8 capitalize">
      <div className="bg-white w-full rounded-sm p-6 max-w-screen-sm shadow-lg flex flex-col has-[:invalid]:bg-red-300 gap-2">
        {["Nico", "Me", "You", "Nickelback"].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 odd:bg-cyan-300 rounded-xl p-3"
          >
            <div className="size-7 bg-cyan-500 rounded-full" />
            <span>{person}</span>
            <div className="size-6 bg-red-500 flex items-center justify-center rounded-full text-white text-sm">
              <span className="z-10">{index}</span>
              <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
