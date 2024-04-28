import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
      router.replace("/log-in");
    } catch (error) {
      console.error("failed Logout:", error);
    }
  };

  return (
    <button
      className="fixed top-5 right-5 px-4 py-2 text-base md:text-xl font-bold text-butter-red bg-butter-yellow hover:bg-butter-red hover:text-butter-yellow rounded-3xl shadow-lg transition-colors cursor-pointer"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
