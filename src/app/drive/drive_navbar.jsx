import Link from "next/link";
const DriveNavbar = () => {
  return (
    <nav className="bg-white fixed w-[10dvw] ml-4 top-[15dvh] h-[20dvh] border-2 rounded-[2rem] text-black">
      <div className="flex size-full">
        <ul className="cursor-pointer ml-2 flex flex-col size-full justify-center">
            <Link href="/drive" className="py-2 px-4 w-fit rounded-xl hover:bg-gray-300">My Drive</Link>
            <Link href="/drive/recent" className="py-2 px-4 w-fit rounded-xl hover:bg-gray-300">Recent</Link>
            <Link href="/drive/trash" className="py-2 px-4 w-fit rounded-xl hover:bg-gray-300">Trash</Link>
        </ul>
      </div>
    </nav>
  );
};

export default DriveNavbar;
