import Link from "next/link";

const UploadButton = () => {
  return (
    <div className="fixed bottom-5 right-5 p-4 text-white bg-butter-yellow hover:bg-butter-mint rounded-full shadow-lg transition-colors cursor-pointer aspect-square w-14">
      <Link href="/tweet/upload">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default UploadButton;
