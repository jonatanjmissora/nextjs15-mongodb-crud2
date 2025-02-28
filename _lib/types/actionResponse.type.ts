export type ServerResponse = {
  success: boolean;
  prevState: { title: string, content: string };
  errors: { title: string, content: string };
} | null