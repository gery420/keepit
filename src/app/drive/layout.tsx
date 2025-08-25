import DriveNavbar from "@/app/drive/drive_navbar.jsx";
import Navbar from "@/app/components/Common/Navbar";

export default function DriveLayout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Navbar />
      <DriveNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
