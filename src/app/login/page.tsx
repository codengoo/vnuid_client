import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="bg-primary w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="w-1/2 h-2/3 bg-white rounded-3xl shadow-2xl flex">
        <div className="p-5 w-1/3 flex-none">
          <div className="flex justify-end items-center w-full">
            <button className="rounded-full overflow-hidden p-1 w-8 h-8">
              <Image
                src={"/images/flag_vn.png"}
                alt="flag_en"
                width={100}
                height={100}
                className="rounded-full object-cover h-full"
              />
            </button>
          </div>
          <div className="p-5">
            <h1 className="text-3xl text-center font-bold tracking-widest text-gray-700 font-lobster">
              Đăng nhập
            </h1>
            <p className="text-center">Login to manage your classes</p>
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
