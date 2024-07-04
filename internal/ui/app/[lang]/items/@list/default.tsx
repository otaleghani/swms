import Link from "next/link"

export default async function ListItemsDefaultPage() {
  return (
    <>
      <div className="h-screen w-full bg-red-300 hidden xl:flex xl:flex-col gap-4">
        List item here DEFAULT
        <Link href="/items/123">123</Link>
        <Link href="/items/456">456</Link>
        <Link href="/items/789">789</Link>
      </div>
    </>
  )
}
