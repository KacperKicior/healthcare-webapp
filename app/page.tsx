"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";
import { useSearchParams } from "next/navigation";

function Content() {
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get("admin") === "true";

    return (
        <div className={"flex h-screen max-h-screen"}>
            {isAdmin && <PasskeyModal />}
            <section className={"remove-scrollbar container my-auto"}>
                <div className={"sub-container max-w-[496px]"}>
                    <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="Patient" className="mb-12 h-10 w-fit" />

                    <PatientForm />

                    <div className={"text-14-regular mt-20 flex justify-between"}>
                        <p className={"justify-items-end text-dark-600 xl:text-left"}>
                            © 2024 Heathcare. All rights reserved.
                        </p>
                        <Link href="/?admin=true" className={"text-red-500"}>
                            Admin
                        </Link>
                    </div>
                </div>
            </section>
            <Image src="/assets/images/onboarding-img.jpg" alt="Onboarding" height={1000} width={1000} className="side-img max-w-[50%]" />
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content />
        </Suspense>
    );
}
