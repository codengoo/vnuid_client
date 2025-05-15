import { VnButton } from "@/components";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type IViewMode = "create" | "view";

export type IHelpTextSet<T, U extends keyof T> = Record<
  keyof Pick<T, U>,
  string | undefined
>;

interface IDataFormProps<T extends { id: string }> {
  value: T | null;
  values: T[];
  onChange?: () => void;
  onAdd: (value: T) => Promise<boolean>;
  onDel: (id: string) => Promise<boolean>;
  onCreateMode?: () => void;
}

export function useDataForm<T extends { id: string }, K extends keyof T>({
  onAdd,
  onDel,
  onChange,
  onCreateMode,
  value: outerValue,
  values,
}: IDataFormProps<T>) {
  const [value, setValue] = useState<T | null>(null);
  const [mode, setMode] = useState<IViewMode>("view");
  const [isLoading, setLoading] = useState(false);
  const [helpTextSet, setHelpTextSet] = useState<IHelpTextSet<T, K>>();

  const handleSave = async () => {
    console.log(value);

    if (!value) return;
    try {
      setLoading(true);
      await onAdd(value);
      toast.success("Thêm thành công");
      setValue(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!value) return;
    try {
      setLoading(true);
      await onDel(value.id);
      toast.success("Xóa thành công");
      setValue(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, key: keyof T) => {
    const text = e.currentTarget.value;
    // @ts-ignore
    setValue({
      ...(value || {}),
      [key]: text,
    });
  };

  const handleCheck = (e: KeyboardEvent<HTMLInputElement>, key: keyof T) => {
    const value = e.currentTarget.value;
    for (let i = 0; i < values.length; i++) {
      if (values[i][key] === value) {
        // @ts-ignore
        setHelpTextSet({ ...(helpTextSet || {}), [key]: "Đã tồn tại" });
        return;
      }
    }

    // @ts-ignore
    setHelpTextSet({ ...(helpTextSet || {}), [key]: void 0 });
  };

  const isCreatable = (input?: IHelpTextSet<T, K>) => {
    if (!input) return true;
    for (let key in input) {
      if (input[key as keyof IHelpTextSet<T, K>] !== undefined) return false;
    }
    return true;
  };

  const changeToCreateMode = () => {
    setValue(null);
    setMode("create");
    onCreateMode?.();
  };

  useEffect(() => {
    setValue(outerValue);
    setMode("view");
  }, [outerValue]);

  const Header = ({ title }: { title: string }) => {
    return (
      <div className="flex justify-between items-center h-16 ">
        <h1 className="font-semibold text-2xl text-gray-700">{title}</h1>
        <div className="flex gap-2">
          {mode == "view" && value && (
            <VnButton
              label="Xóa"
              color={"red"}
              disabled={isLoading}
              onClick={handleDelete}
            />
          )}
          {mode == "view" && (
            <VnButton
              label="Thêm"
              onClick={changeToCreateMode}
              disabled={isLoading}
            />
          )}
          {mode == "create" && (
            <VnButton
              label="Lưu"
              onClick={handleSave}
              disabled={!isCreatable(helpTextSet) || isLoading}
            />
          )}
        </div>
      </div>
    );
  };

  return {
    value,
    setValue,
    mode,
    Header,
    handleChange,
    handleCheck,
    helpTextSet
  };
}
