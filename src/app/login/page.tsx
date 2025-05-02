"use client";

import Image from "next/image";
import { IoLogoGoogle } from "react-icons/io";
import { LuLock, LuMail } from "react-icons/lu";
import { LangButton, VnButton, VnInput } from "../components/ui";

export default function LoginPage() {
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
                  />
                  <VnInput
                    id="password"
                    label="Password"
                    icon={LuLock}
                    type="password"
                    placeholder="Enter password"
                  />
                </div>

                <VnButton id="login" fullSized label="Login" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-center text-sm font-semibold text-gray-800">OR</p>

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
    </main>
  );
}
