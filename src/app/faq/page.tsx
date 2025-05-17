import { VnAccordion, VnAccordionPanel } from "@/components";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function Faq() {
  return (
    <div className="w-screen bg-gray-100 min-h-screen">
      <div className="container mx-auto pt-32 p-10 lg:px-56">
        <div>
          <Link href={"/lesson"} className="flex gap-2 items-center">
            <LuArrowLeft className="text-tertiary" />
            <span className="text-tertiary hover:underline">Quay về</span>
          </Link>

          <h1 className="text-6xl font-semibold text-gray-800 overflow-hidden">
            FAQ - Câu hỏi thường gặp
          </h1>
        </div>

        <div className="space-y-16">
          <div className="mt-10 bg-white p-10 rounded-xl shadow">
            <h1 className="text-2xl font-semibold text-gray-800 mb-5">
              Lorem ipsum dolor sit amet
            </h1>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              convallis nam conubia interdum metus sagittis pretium hendrerit
              accumsan morbi vel mi imperdiet. Velit mi parturient vulputate
              adipiscing varius proin tincidunt tellus litora vitae arcu rhoncus
              elit. Porttitor purus torquent integer iaculis magnis viverra mi
              morbi phasellus dapibus per venenatis dictumst.
            </p>
          </div>

          <div className="mt-10 bg-white rounded-xl shadow">
            <VnAccordion>
              <VnAccordionPanel title="What is Flowbite?">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to&nbsp;
                  <a
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    get started&nbsp;
                  </a>
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </VnAccordionPanel>
              <VnAccordionPanel title="Is there a Figma file available?">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Figma design system
                  </a>
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </VnAccordionPanel>
            </VnAccordion>
          </div>
        </div>
      </div>
    </div>
  );
}
