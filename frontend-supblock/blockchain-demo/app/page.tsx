import Header from '@/components/Header'
import StoreNumber from '@/components/StoreNumber'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Store a Number</h1>
        <StoreNumber />
      </main>
    </div>
  )
}

