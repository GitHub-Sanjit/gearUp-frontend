import DashboardLayout from "@/components/dashboard/DashboardLayout";


export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <DashboardLayout role="PROVIDER">
      {children}
    </DashboardLayout>
  );

}