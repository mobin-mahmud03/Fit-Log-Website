import Link from "next/link";

const notFoundPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0c0f] px-4 text-center text-white">
      <p className="text-6xl font-extrabold text-[#a8f000]">404</p>
      <h1 className="text-xl font-extrabold uppercase">Page Not Found</h1>
      <p className="text-sm text-gray-400">
        This page doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[#a8f000] px-6 py-2 text-sm font-semibold text-black"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default notFoundPage;