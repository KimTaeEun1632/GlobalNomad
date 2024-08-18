import { useState, useEffect, useRef } from "react";
import { useUsersCheckMyInformation } from "@/service/users/useUsersService";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import LoginHeaderDropdownSkeleton from "./LoginHeaderDropdownSkeleton";
import { signOut, useSession } from "next-auth/react";

const LoginHeaderDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const session = useSession();
  const profileImageUrl = session.data?.user?.image || "";
  const {
    data: response,
    isLoading,
    isError,
  } = useUsersCheckMyInformation(profileImageUrl);

  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return <LoginHeaderDropdownSkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!response) {
    return <div>Not Found data...</div>;
  }

  const handleSignOut = () => {
    signOut();
  };

  const data = response.data;

  return (
    <div>
      <li
        ref={dropdownRef}
        className="dropdown group relative flex cursor-pointer px-4 tracking-wide"
        onClick={toggleDropdown}
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDropdownOpen(false);
          }
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gnDarkGreen text-center text-sm font-semibold text-gnGray200">
            {session.data?.user?.image ? (
              <img
                className="h-full w-full rounded-full"
                src={session.data.user.image}
                alt="Profile Picture"
              />
            ) : (
              <div>asdf</div>
            )}
          </div>
          <div>{session.data?.user?.name}</div>
        </div>
        <div
          className={`dropdown-menu absolute right-0.5 top-12 ${isDropdownOpen ? "block" : "hidden"} mt-2 h-auto rounded-lg border border-gray-200 bg-white shadow-lg`}
        >
          <ul className="top-0 w-48 rounded-md border-solid bg-white px-6 py-8">
            <div className="block rounded-md px-4 py-2 hover:bg-gnGray200">
              <Link
                href="/my-page"
                className="block cursor-pointer text-base font-bold"
              >
                마이페이지
              </Link>
            </div>
            <div className="block rounded-md px-4 py-2 hover:bg-gnGray200">
              <Link
                href="/"
                onClick={handleSignOut}
                className="block cursor-pointer text-base font-bold"
              >
                로그아웃
              </Link>
            </div>
          </ul>
        </div>
      </li>
    </div>
  );
};

export default LoginHeaderDropdown;
