import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Blockchain Demo
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Store Number
            </Link>
          </li>
          <li>
            <Link href="/retrieve" className="hover:text-gray-300">
              Retrieve Number
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

