import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
  <>
    <Image src="/assets/facesavio.png" width={200} height={200} alt="facesavio-logo" />
    <SignIn />
  </>
);
}