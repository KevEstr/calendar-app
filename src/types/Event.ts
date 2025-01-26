export interface Event {
    id: string
    title: string
    description: string
    startTime: string
    endTime: string
    date: Date
    color: string
    status: 'active' | 'expired';
  }
  