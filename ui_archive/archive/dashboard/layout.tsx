interface DashboardLayoutProps {
  items: React.ReactNode;
  single: React.ReactNode;
}
export default function Layout({ items, single }: DashboardLayoutProps) {
  return (
    <>
      <div className="grid grid-cols-2">
        {items}
        {single}
      </div>
    </>
  )
}
