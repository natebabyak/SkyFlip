import Header from "../../components/header/Header.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Table from "../../components/table/Table.tsx"
import { useState, useEffect } from "react"

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState(null)
  const [itemsData, setItemsData] = useState(null)

  async function fetchBazaarData() {
    const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar")
    const data = await response.json()
    setBazaarData(data)
  }

  async function fetchItemsData() {
    const response = await fetch("https://api.hypixel.net/v2/resources/skyblock/items")
    const data = await response.json()
    setItemsData(data)
  }

  useEffect(() => {
    fetchBazaarData()
    const interval = setInterval(fetchBazaarData, 60000)
  }, [])

  const headers = [
    "Item",
    "Insta-Buy",
    "Insta-Sell",
    "Profit",
    "Flips/h",
    "Coins/h"
  ]

  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}