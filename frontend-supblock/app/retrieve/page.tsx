import Header from '@/components/Header'
import RetrieveNumber from '@/components/RetrieveNumber'

export default function Retrieve() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Retrieve a Number</h1>
        <RetrieveNumber />
      </main>
    </div>
  )
}

