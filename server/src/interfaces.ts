type SearchType = 'location' | 'name'
export interface IGetSingleQuery {
    value: string
    searchType: SearchType
}

export interface ISuggestion {
    id: number,
    name: string,
    street: string,
    city: string,
    state: string
  }

type SalesStatus = 'Pre-Sales' | 'Sold Out' | 'In Sales'
type ConstructionStatus = 'Under Construction' | 'Built' | 'Planning' | 'Pre-Launch'
export interface IProperty {
    id: number
    name: string,
    street: string,
    city: string,
    state: string,
    available: boolean,
    sales_status: SalesStatus,
    construction_status: ConstructionStatus,
    developer: string,
    floors: number,
    units: IUnit[]
}

export interface IUnit {
    id: number,
    name: number,
    price: string,
    floor: number,
    bedrooms: number,
    bathrooms: number,
    available: boolean
}