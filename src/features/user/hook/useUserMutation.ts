import { useTransition } from "react";
import { MutationOption, MutationResult } from "@/types";
import { updateUserAction } from "../server/action";
import { UserForm } from "../type";

export const useUserMutation = (
  options?: MutationOption,
): MutationResult<void, UserForm> => {
  const [isPending, startTransition] = useTransition();

  const mutate = async (data: UserForm) => {
    startTransition(async () => {
      const response = await updateUserAction(data);

      if (response.success) {
        options?.onSuccess?.(response);
      } else {
        options?.onError?.(response);
      }
    });
  };

  return {
    isPending,
    mutate,
  };
};
