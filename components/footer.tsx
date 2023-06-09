import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center sticky bottom-0 text-purple-950 hover:text-purple-700 hover:underline hover:underline-offset-2">
      <Link href="https://tszlau.com" className="link ">
        © {new Date().getFullYear()} ts_z
      </Link>
    </footer>
  );
};

export default Footer;
