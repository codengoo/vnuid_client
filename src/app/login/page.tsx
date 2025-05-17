"use client";

import { LangButton, VnButton, VnInputFormik, VnToast } from "@/components";
import { login } from "@/actions/login";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuLock, LuMail } from "react-icons/lu";
import { toast } from "react-toastify";
import { object, string } from "yup";

interface IFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { push } = useRouter();

  const handleLogin = async () => {
    try {
      await login(formik.values.username, formik.values.password);
      toast.success("Login thành công");
      push("/lesson");
    } catch (error) {
      toast.error((error as Error).message);
      formik.setValues({ ...formik.values, password: "" });
    }
  };

  const formik = useFormik<IFormData>({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: object({
      username: string().length(8).required(),
      password: string().required(),
    }),
    onSubmit: async () => {
      await handleLogin();
    },
  });

  return (
    <main className="bg-primary w-screen h-screen overflow-hidden flex justify-center items-center px-10">
      <div className="w-full xl:w-1/2 h-2/3 bg-white rounded-3xl shadow-2xl flex">
        <div className="p-5 w-full sm:w-[350px] flex-none flex flex-col">
          <div className="flex justify-end items-center w-full">
            <LangButton />
          </div>
          <div className="flex flex-col gap-12 h-full px-7">
            <div className="">
              <div className="p-5 space-y-2">
                <h1 className="text-3xl text-center font-bold tracking-widest text-gray-800 font-lobster">
                  Login
                </h1>
                <p className="text-center text-gray-600">
                  Login to manage your classes
                </p>
              </div>

              <form className="space-y-8" onSubmit={formik.handleSubmit}>
                <div className="space-y-2">
                  <VnInputFormik
                    id="username"
                    label="Username"
                    icon={LuMail}
                    type="text"
                    placeholder="Enter username"
                    formik={formik}
                  />
                  <VnInputFormik
                    id="password"
                    label="Password"
                    icon={LuLock}
                    type="password"
                    placeholder="Enter password"
                    formik={formik}
                  />
                </div>

                <VnButton type="submit" id="login" fullSized label="Login" />
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex bg-secondary h-full grow rounded-3xl border-tertiary border-2 justify-center items-center overflow-hidden">
          <div className="w-full max-w-[640px]">
            <Image
              src={"/images/login_deco.png"}
              alt="login_deco"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
      <VnToast />
    </main>
  );
}
