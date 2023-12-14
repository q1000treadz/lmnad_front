export type WaveRecordType = { 
    latitude: number, 
    longitude: number, 
    information: string, 
    start_date: Date, 
    end_date: Date, 
    wave_types: any[], 
    scale: string,
    weather: string,
    source_generation: string, 
    files: any[]
};