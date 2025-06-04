import { icons } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: keyof typeof icons;
};

export type SubNavItem = Omit<NavItem, "icon">;

export type ServerActionResult<T = unknown> =
  | ServerActionSuccess<T>
  | ServerActionFailure;

export type ServerActionSuccess<T> = {
  success: true;
  message: string;
  payload?: T;
};

export type ServerActionFailure = {
  success: false;
  message: string;
};

export type MutationResult<TPayload = unknown, TInput = void> = {
  isPending: boolean;
  mutate: (input: TInput) => void | Promise<void>;
  state?: TPayload;
};

export type MutationOption<TPayload = unknown> = {
  onSuccess?: (response: ServerActionSuccess<TPayload>) => void;
  onError?: (response: ServerActionFailure) => void;
};

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;
