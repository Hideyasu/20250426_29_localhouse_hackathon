const baseUrl = "https://script.google.com/macros/s/AKfycbzNL5fzzAJYj31xq5Coi7GhMqpdLsPCOYHVCbymV4QbuTH1LVEl8erbVQQBvr8k5mpkIg/exec"
const housesUrl = `${baseUrl}?target=houses`
const equipmentsUrl = `${baseUrl}?target=equipments`

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

export type Equipment = {
    id: number
    name: string
    price: number
}

export const getHouses = (): Promise<House[]> => fetch(housesUrl).then((res) => res.json())

export const getEquipments = (): Promise<Equipment[]> => fetch(equipmentsUrl).then((res) => res.json())