export interface Cell {
    id: string;
    type: CellType;
    content: string;
}

export type CellType = "code" | "text";
