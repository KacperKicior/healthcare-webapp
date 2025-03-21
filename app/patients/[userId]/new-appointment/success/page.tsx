import React from "react";
import Link from "next/link";
import Image from "next/image";
import {getAppointment} from "@/lib/actions/appointment.actions";
import {Doctors} from "@/constants";
import {formatDateTime} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const Success = async ({params: {userId},searchParams}:SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc)=> doc.name === appointment.primaryPhysician);

    return (
        <div className={"flex h-screen max-h-screen px-[5%]"}>
            <div className={"success-img"}>
                <Link href={"/"}>
                    <Image src={"/assets/icons/logo-full.svg"} alt={"logo"} className={"h-10 w-fit"} height={1000} width={1000}/>
                </Link>

                <section className={"flex flex-col items-center"}>
                    <Image src={"/assets/gifs/success.gif"} height={300} width={280} alt={"Success"} />

                    <h2 className={"header mb-6 max-w-[600px] text-center"}>
                        Your <span className={"text-red-500"}>appointment request</span> has been successfully submitted.
                    </h2>
                    <p>We will send confirmation in a second.</p>
                </section>

                <section className={"request-details"}>
                    <p>Appointmend details:</p>
                    <div className={"flex items-center gap-3"}>
                        <Image src={doctor?.image!} alt={"doctor"} height={100} width={100} className={"size-6"}/>
                        <p className={"whitespace-nowrap"}>Dr. {doctor?.name}</p>
                    </div>
                    <div className={"flex gap-2"}>
                        <Image src={"/assets/icons/calendar.svg"} alt={"calendar"} height={24} width={24}/>
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                
                <Button variant={"outline"} className={"bg-red-500"} asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
                </Button>

                <p className={"copyright"}>
                    © 2024 Heathcare. All rights reserved.
                </p>
            </div>
        </div>
    )
}
export default Success;