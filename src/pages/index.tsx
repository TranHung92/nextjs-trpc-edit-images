import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="grid justify-items-center items-center h-screen">
      <Link href="/images">
        <Button variant="PRIMARY">Enter Site</Button>
      </Link>
    </div>
  );
}
