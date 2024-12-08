'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function StoreNumber() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<{ value: string, blockNumber: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/store/${number}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error storing number:', error)
    }
    setLoading(false)
  }

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle className="blockchain-title">Store a Number</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number"
            className="blockchain-input mb-4"
          />
          <Button type="submit" disabled={loading} className="blockchain-button">
            {loading ? 'Storing...' : 'Store Number'}
          </Button>
        </form>
      </CardContent>
      {result && (
        <CardFooter>
          <p className="blockchain-hash">Stored Value: {result.value}, Block Number: {result.blockNumber}</p>
        </CardFooter>
      )}
    </Card>
  )
}