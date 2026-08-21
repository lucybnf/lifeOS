export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskContext = "personal" | "faculty" | "work" | "home" | "project";

export type TaskRelation = {
  entityType: "subject" | "project";
  entityId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  priority: TaskPriority;
  status: TaskStatus;
  context: TaskContext;
  reminder?: string;
  relation?: TaskRelation;
  createdAt: string;
};

export type NewTask = Omit<Task, "id" | "createdAt">;
