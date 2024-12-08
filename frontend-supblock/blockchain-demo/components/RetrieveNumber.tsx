'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function RetrieveNumber() {
  const [hash, setHash] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/retrieve/${hash}`)
      const data = await response.text()
      setResult(data)
    } catch (error) {
      console.error('Error retrieving number:', error)
    }
    setLoading(false)
  }

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle className="blockchain-title">Retrieve a Number</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter transaction hash"
            className="blockchain-input mb-4"
          />
          <Button type="submit" disabled={loading} className="blockchain-button">
            {loading ? 'Retrieving...' : 'Retrieve Number'}
          </Button>
        </form>
      </CardContent>
      {result && (
        <CardFooter>
          <p className="blockchain-hash">{result}</p>
        </CardFooter>
      )}
    </Card>
  )
}