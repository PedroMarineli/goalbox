import { Box } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Box />
          <p className="text-center text-sm leading-loose md:text-left">
            Construído por{" "}
            <a
              href="https://github.com/PedroMarineli"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Pedro Marineli
            </a>
            . O código-fonte está disponível no{" "}
            <a
              href="https://github.com/PedroMarineli/goalbox"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
