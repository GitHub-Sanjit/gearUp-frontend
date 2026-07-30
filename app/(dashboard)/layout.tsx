export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* <DashboardSidebar /> */}

      <main>{children}</main>
    </div>
  );
}
