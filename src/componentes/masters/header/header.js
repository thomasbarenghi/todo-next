import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-start align-middle items-center seccion py-6 ">
      <div style={{ width: "150px", height: "30px", position: "relative" }}>
        <Image src="/icon/logo.svg" alt="logo" layout="fill" />
      </div>
    </header>
  );
}
