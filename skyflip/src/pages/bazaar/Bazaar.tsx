import Header from "../../components/header/Header.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Table from "../../components/table/Table.tsx"
import { useState, useEffect } from "react"

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState(null)
  const [itemsData, setItemsData] = useState(null)

  const tax: 0.01 | 0.01125 | 0.0125 = 0.01125

  async function getBazaarData() {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar"
    try {
      const response = await fetch(url)
      const json = await response.json()

      if (json.success === false) throw json.cause

      setBazaarData(json)
    } catch (error) {
      console.log(error)
    }
  }

  function refreshBazaarData() {
    useEffect(() => {
      getBazaarData()
    }, [])
  }

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