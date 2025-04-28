const url = "https://script.google.com/macros/s/AKfycbzJ9B_kRKnVI6YTFbajc3zGU2zSo2s46ZkcNQU6zeAhte1-R78mSSTINfTdPtQcHtYBQw/exec?target=houses"

export type House = {
    link: string
    price: number
    constructedAt: string
    layout: string
    buildingArea: string
    city: string
    districtAddress: string
}

export const getHouses = (): Promise<House[]> => fetch(url).then((res) => res.json())