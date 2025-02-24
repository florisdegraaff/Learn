import { useCallback } from "react";

const eventBus = new EventTarget();

export default function useEvent<T extends string>(name: T, eventInitDict?: CustomEventInit<unknown> | undefined) {
  const triggerEvent = useCallback(function () {
    eventBus.dispatchEvent(new CustomEvent(name, eventInitDict))
  }, [eventInitDict, name])

  const addEventListener = useCallback(function (func: () => void) {
    eventBus.addEventListener(name, func)
  }, [name])

  const removeEventListener = useCallback(function (func: () => void) {
    eventBus.removeEventListener(name, func)
  }, [name])

  return {
    triggerEvent, addEventListener, removeEventListener
  }
}