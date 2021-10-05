import Link from "next/link";

import { TITLE } from "../lib/constants";
import Container from "./container";

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <Link href="/">
              <a className="hover:underline">{TITLE}</a>
            </Link>
          </h3>
          <div className="flex flex-col justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={`https://github.com/n-kurasawa/blog`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
            Copyright © n-kurasawa All Rights Reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
