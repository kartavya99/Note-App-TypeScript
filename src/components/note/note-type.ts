export type Priority = "high" | "medium" | "low";

export type NoteType = {
  id: string;
  text: string;
  priority: Priority;
};

export enum Color {
  high = "rgb(246, 114, 94)",
  medium = "rgb(204, 246, 164)",
  low = "rgb(224, 230, 232)",
}
