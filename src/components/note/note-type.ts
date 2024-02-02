export type Priority = "high" | "medium" | "low";

export type NoteType = {
  id: string;
  text: string;
  priority: Priority;
};

export enum ColorLight {
  high = "rgb(246, 114, 94)",
  medium = "rgb(204, 246, 164)",
  low = "rgb(224, 230, 232)",
}

export enum ColorDark {
  high = "rgb(136, 25, 8)",
  medium = "rgb(32, 183, 241)",
  low = "rgb(135, 231, 43)",
}
