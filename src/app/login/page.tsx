"use client";

import { login } from "@/helpers/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io";
import { LuLock, LuMail } from "react-icons/lu";
import { toast } from "react-toastify";
import { LangButton, VnButton, VnInput } from "../../components/ui";
import { VnToast } from "@/components";

export default function LoginPage() {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(username, password);
      toast.success("Login thành công");
      push("/lesson");
    } catch (error) {
      toast.error((error as Error).message);
      setPassword("")
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-primary w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="w-1/2 h-2/3 bg-white rounded-3xl shadow-2xl flex">
        <div className="p-5 w-2/5 flex-none flex flex-col">
          <div className="flex justify-end items-center w-full">
            <LangButton />
          </div>
          <div className="flex flex-col gap-12 h-full px-7">
            <div className="">
              <div className="p-5 space-y-2">
                <h1 className="text-3xl text-center font-bold tracking-widest text-gray-800 font-lobster">
                  LOGIN
                </h1>
                <p className="text-center text-gray-600">
                  Login to manage your classes
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <VnInput
                    id="username"
                    label="Username"
                    icon={LuMail}
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleChangeUsername}
                  />
                  <VnInput
                    id="password"
                    label="Password"
                    icon={LuLock}
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChangePassword}
                    onKeyUp={handleKeyPress}
                  />
                </div>

                <VnButton
                  id="login"
                  fullSized
                  label="Login"
                  onClick={handleLogin}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-center text-sm font-semibold text-gray-800">
                OR
              </p>

              <VnButton
                id="login_by_google"
                fullSized
                color="alternative"
                label="Login with Google"
                icon={IoLogoGoogle}
              />
            </div>
          </div>
        </div>

        <div className="bg-secondary h-full grow rounded-3xl border-tertiary border-2 flex justify-center items-center">
          <div className="w-2/3">
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
