import Link from "next/link"

export default async function ListItemsPage() {
  return (
    <>
      <div className="xl:flex h-screen w-full bg-red-300">
        List item here
        <Link href="/items/123">123</Link>
        <Link href="/items/456">456</Link>
        <Link href="/items/789">789</Link>
      </div>
      <div className="xl:flex h-screen w-full bg-purple-400">
        List item here DEFAULT
        <Link href="/items/123">123</Link>
        <Link href="/items/456">456</Link>
        <Link href="/items/789">789</Link>
      </div>
    </>
  )
}
