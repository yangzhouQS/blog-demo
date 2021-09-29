export interface GradientObject {
    id?: number
    type: String
    colorStoop: GradientColorStop[]
    global: boolean
}

export interface GradientColorStop {
    offset: number
    color: string
}
