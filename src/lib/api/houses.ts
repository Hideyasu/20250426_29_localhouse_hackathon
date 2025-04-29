const url = "https://script.google.com/macros/s/AKfycbx1a4sZvZZgHcg9qO1h2cw2nmHpsOmq3nAkZxWd0_FC5eDKB9HUUz6URSNX3pLkYKkq_g/exec?target=houses"

export type House = {
    id: number
    link: string
    price: number
    constructedAt: string
    layout: string
    buildingArea: string
    city: string
    districtAddress: string
}

export const getHouses = (): Promise<House[]> => fetch(url).then((res) => res.json())