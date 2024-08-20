import Sidebar from "@/components/shared/header/AdminSidebar";



export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
     <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full">
          {children}
        </div>
      </div>
   </>
  

  );
}
