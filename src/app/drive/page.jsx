"use client";

const DrivePage = () => {
  return (
    <div>
      <div className="h-[200dvh] w-[80dvw] ml-[15%] mt-52">
        <h1 className="text-4xl font-bold text-black">My Drive</h1>
        <div className="mt-10 text-black w-full h-[20%] flex flex-row justify-between items-start">
          <p className="font-bold text-lg">Folders</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">New Folder</button>
        </div>
        <div className="mt-10 text-black w-full h-[20%] flex flex-row justify-between items-start">
          <p className="font-bold text-lg">Files</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">New File</button>
        </div>
      </div>
    </div>
  );
};

export default DrivePage;
