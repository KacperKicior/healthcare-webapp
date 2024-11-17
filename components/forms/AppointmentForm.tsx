"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form"
import {useState} from "react";
import {z} from "zod"

import {Form} from "@/components/ui/form"
import {getAppointmentSchema} from "@/lib/validation";

import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {Doctors} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import {createAppointment} from "@/lib/actions/appointment.actions";


const AppointmentForm = ({
    userId, patientId, type
                         }:{
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule"
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "cancelled";
                break;
            default:
                status = "pending";
                break;
        }
        try {
            if (type === "create" && patientId){
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                };
                const appointment = await createAppointment(appointmentData);

                if (appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
                }
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    let buttonLabel;
    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "create":
            buttonLabel = "Request Appointment";
            break;
        case 'schedule':
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className={"mb-12 space-y-4"}>
                    <h1 className={"header"}>New Appointment</h1>
                    <p className={"text-dark-700"}>
                        Request an appointment by filling the form below.
                    </p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor, i) => (
                                <SelectItem key={doctor.name + i} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt="doctor"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected Appointment Date"
                            showTimeSelect
                            dateFormat={"dd/MM/yyyy - h:mm aa"}
                        />

                        <div className={"flex flex-col gap-6 xl:flex-row"}>
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name={"reason"}
                                label={"Reason for appointment"}
                                placeholder={"Enter reason for appointment"}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name={"note"}
                                label={"Additional notes"}
                                placeholder={"Enter additional notes"}
                            />
                        </div>
                    </>
                    )
                }

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name={"cancellationReason"}
                        label={"Reason for cancellation"}
                        placeholder={"Enter reason for cancellation"}
                    />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`} >{buttonLabel}</SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm