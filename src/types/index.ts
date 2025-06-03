import { IconName } from "lucide-react/dynamic";

export type NavItem = {
  label: string;
  path: string;
  icon: IconName;
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
