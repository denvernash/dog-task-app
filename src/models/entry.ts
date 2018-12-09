export class Pet {
    id: number;
    title: string;
    text: string;
    image: string;
    timestamp: Date;
    time: number;
}

export class Task {
    id: number;
    pet_id: number;
    title: string;
    notes: string;
    deadline: string;
    schedule: string;
    dayNum: number;
    complete: boolean;
    completed_date: Date;
    time: number;

}

export class Day {
    today: Date;
    shownDay: string;
    numMonth: number;
    numWeek: number;
    id: number;
    tasks: Task[];
    name: string;
    start_date: Date;
    start_time: number;
    end_date: Date;
    end_time: number;
    todaytasks: boolean;
    alltasks: boolean;
}

export class Photo {
    id: number;
    pet_id: number;
    filename: string;
    title: string;
    timestamp: Date;
    time: number;
    
}