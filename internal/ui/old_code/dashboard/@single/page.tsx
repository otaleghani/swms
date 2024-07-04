import Link from "next/link"

export default function Page() {
  return (
    <div className="h-screen w-full bg-blue-500 flex flex-col gap-4">ITEMS
      <Link href="/dashboard/123">Something</Link>
      <Link href="/dashboard/456">Something</Link>
      <Link href="/dashboard/789">Something</Link>
    </div>
  )
}
