interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full flex">
      <h1>Items</h1>
      {children}
    </div>
  )
}
