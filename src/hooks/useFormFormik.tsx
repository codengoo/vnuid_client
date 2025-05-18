import { VnButton } from "@/components";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type IViewMode = "create" | "view";

export type IHelpTextSet<T, U extends keyof T> = Record<
  keyof Pick<T, U>,
  string | undefined
>;

interface IDataFormFormikProps<T extends { id: string }> {
  listValues: T[];
  onChange?: () => void;
  onAdd: (value: T) => Promise<boolean>;
  onDel: (id: string) => Promise<boolean>;
  onCreateMode?: () => void;
  initial: T;
  schema: any;
  uniqueKeys?: (keyof T)[];
}

export function useDataFormFormik<T extends { id: string }>({
  onAdd,
  onDel,
  onChange,
  onCreateMode,
  listValues,
  initial,
  schema,
  uniqueKeys = [],
}: IDataFormFormikProps<T>) {
  const [mode, setMode] = useState<IViewMode>("view");
  const formik = useFormik<T>({
    validateOnChange: false,
    initialValues: initial,
    validationSchema: schema,
    validate: (values) => {
      const errors: Record<keyof T, string> = {} as Record<keyof T, string>;

      for (let key of uniqueKeys) {
        for (let i = 0; i < listValues.length; i++) {
          if (listValues[i][key] === values[key]) {
            errors[key] = "Đã tồn tại";
            return;
          }
        }
      }
    },
    onSubmit: async () => {
      if (mode === "create") await handleSave();
      else if (mode === "view") await handleDelete();
    },
  });

  const handleSave = async () => {
    try {
      await onAdd(formik.values);
      toast.success("Thêm thành công");
      formik.resetForm();
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      await onDel(formik.values.id);
      toast.success("Xóa thành công");
      formik.resetForm();
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const isCreatable = () => {
    for (let key in formik.errors) {
      if (formik.errors[key] !== undefined) return false;
    }
    return true;
  };

  const changeToCreateMode = () => {
    formik.resetForm();
    setMode("create");
    onCreateMode?.();
  };

  useEffect(() => {
    formik.setValues(initial);
    setMode("view");
  }, [initial]);

  const Header = ({ title }: { title: string }) => {
    return (
      <div className="flex justify-between items-center h-16 ">
        <h1 className="font-semibold text-2xl text-gray-700">{title}</h1>
        <div className="flex gap-2">
          {mode == "view" && (
            <VnButton
              label="Xóa"
              color={"red"}
              disabled={formik.isSubmitting}
              onClick={handleDelete}
              type="submit"
            />
          )}
          {mode == "view" && (
            <VnButton
              label="Thêm"
              onClick={changeToCreateMode}
              disabled={formik.isSubmitting}
            />
          )}
          {mode == "create" && (
            <VnButton
              label="Lưu"
              disabled={!isCreatable() || formik.isSubmitting}
              type="submit"
            />
          )}
        </div>
      </div>
    );
  };

  return {
    mode,
    Header,
    formik,
  };
}
