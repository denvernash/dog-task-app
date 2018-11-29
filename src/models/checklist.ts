export class Checklist {
    id: string;
    title: string;
    deadline: string;
    schedule: string;
    items: ChecklistItem[];
}

export class ChecklistItem {
    title: string;
    checked: boolean;
}