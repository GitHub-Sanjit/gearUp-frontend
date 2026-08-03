import DashboardSidebar from "./DashboardSidebar";


type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";


interface DashboardLayoutProps {
  children: React.ReactNode;
  role: Role;
}


export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {

  return (

    <div className="flex min-h-screen">

      <DashboardSidebar role={role}/>


      <main className="flex-1 p-6">

        {children}

      </main>


    </div>

  );
}