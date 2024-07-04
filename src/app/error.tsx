"use client";
import Reload from "@/public/reload.svg";
import Magnifier from "@/public/magnifier.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Error() {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  const handleReload = () => {
    setReload(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image src={Magnifier} alt="Magnifier" width={100} height={100} />
        <h1 className="text-2xl font-bold mb-4">Valami hiba történt!</h1>
        <p className="font-thin">Kérjük, győződj meg róla, hogy az internetkapcsolattal minden rendben van-e.</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          onClick={handleReload}
        >
          <Image src={Reload} alt="Reload" width={20} height={20} />
          Újratöltés
        </button>
      </div>
    </div>
  );
}
