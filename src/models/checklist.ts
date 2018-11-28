export class Checklist {
    id: string;
    title: string;
    items: ChecklistItem[];
}

export class ChecklistItem {
    title: string;
    checked: boolean;
}