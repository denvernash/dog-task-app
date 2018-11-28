export class Entry {
    id: number;
    title: string;
    text: string;
    image: string;
    timestamp: Date;
    time: number;
    tasks: Task[];
}

export class Task {
    id: number;
    title: string;
    due: string;
    recur: string;
    complete: boolean;

}