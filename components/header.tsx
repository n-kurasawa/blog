import Link from "next/link";
import { TITLE } from "../lib/constants";

const Header: React.FC = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">
        <a className="hover:underline">{TITLE}</a>
      </Link>
    </h2>
  );
};

export default Header;
