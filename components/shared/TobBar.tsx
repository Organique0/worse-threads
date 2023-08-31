import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function TopBar() {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo.svg" alt="logo" width={25} height={25} />
                <p className="text-heading-3-bold text-light-1 max-xs:hidden">
                    Threads
                </p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="logout" width={25} height={25} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <div className="flex gap-6 items-center align-middle">
                    <OrganizationSwitcher appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        }
                    }} />
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}