import Image from "next/image";

export default function Header() {
  return (
    <header className="seccion flex items-center justify-start py-6 align-middle ">
      <div style={{ width: "150px", height: "30px", position: "relative" }}>
        <Image src="/icon/logo.svg" alt="logo" layout="fill" />
      </div>
    </header>
  );
}
