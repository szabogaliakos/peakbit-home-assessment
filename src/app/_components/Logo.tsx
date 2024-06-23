import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="w-[40px] overflow-hidden xs:w-auto">
      <Image src={logo} width={200} height={80} alt="PeakBit Technologies Logo" />
    </Link>
  );
}

export default Logo;
