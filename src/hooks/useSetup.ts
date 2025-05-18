import { useEffect, useState } from "react";

interface ISetup<T> {
  defaultValues: T;
  preloadFn: () => Promise<T[] | null>;
}

export function useSetup<T>({ defaultValues, preloadFn }: ISetup<T>) {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<T[]>([]);
  const [value, setValue] = useState<T>(defaultValues);

  const preload = async () => {
    try {
      setLoading(true);
      const tmp = await preloadFn();
      if (!tmp) return;
      setValues(tmp);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (value: T) => setValue(value);

  useEffect(() => {
    preload();
  }, []);

  return {
    isLoading,
    values,
    value,
    handleRowClick,
    preload
  };
}
