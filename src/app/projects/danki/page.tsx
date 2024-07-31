import { Inter } from "next/font/google";
import Deck from "./_components/Deck";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  // TODO: get project readme from github
  title: "Danki",
  description: "A DIY Anki clone with Anki compatibility and spaced repetition algorithm",
};

export default function Page() {
  return (
    <div>
      <Deck />
    </div>
  );
}
