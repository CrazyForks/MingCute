import { getCurrentInstance, useId, type ComponentInternalInstance } from 'vue';

const stableIds = new WeakMap<ComponentInternalInstance, string>();

export function useStableIconId(): string {
  const instance = getCurrentInstance();
  if (!instance) return useId();
  const existing = stableIds.get(instance);
  if (existing) return existing;
  const id = useId();
  stableIds.set(instance, id);
  return id;
}
