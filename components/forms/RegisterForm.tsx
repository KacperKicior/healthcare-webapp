"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Form, FormControl} from "@/components/ui/form"
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {SelectItem} from "@/components/ui/select";
import {Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from "@/constants";
import {registerPatient} from "@/lib/actions/patient.actions";
import {PatientFormValidation} from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import FileUploader from "@/components/FileUploader";
import SubmitButton from "@/components/SubmitButton";



const RegisterForm = ({user}: {user: User}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    })

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);

        let formData;

        if (values.identificationDocument && values.identificationDocument?.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]],
                { type: values.identificationDocument[0].type,
                });

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }

        try {
            const patient = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhysician: values.primaryPhysician,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies,
                currentMedication: values.currentMedication,
                familyMedicalHistory: values.familyMedicalHistory,
                pastMedicalHistory: values.pastMedicalHistory,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
            };

            // @ts-ignore
            const newPatient = await registerPatient(patient);

            if (newPatient) {
                router.push(`/patients/${user.$id}/new-appointment`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className={"mb-12 space-y-6"}>
                    <h1 className={"header"}>Hi {user.name}</h1>
                    <p className={"text-dark-700"}>
                        Provide your personal details for the best outcome.
                    </p>
                </section>

                <section className={"mb-12 space-y-6"}>
                    <div className={"mb-9 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Personal Information
                        </h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User"
                />

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="johndoe@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="Email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="859 456 123"
                    />
                </div>

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className={"flex h-11 gap-6 xl:justify-between"} onValueChange={field.onChange} defaultValue={field.value}>
                                    {GenderOptions.map((option)=>(
                                        <div key={option} className={"radio-group"}>
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className={"cursor-pointer"}>
                                                {option}
                                            </Label>
                                        </div>
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="al. Jerozolimskie 123"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Engineer"
                    />
                </div>

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency Contact Name"
                        placeholder="Guardian's Name"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency Contact Number"
                        placeholder="859 456 123"
                    />
                </div>

                <section className={"mb-12 space-y-6"}>
                    <div className={"mb-9 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Medical Information
                        </h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary care physician"
                    placeholder="Select a physician"
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

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="PZU"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="XYZ123456789"
                    />
                </div>

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="alleriges"
                        label="Allergies"
                        placeholder="Leave empty if none"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication"
                        placeholder="Leave empty if none"
                    />
                </div>

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        placeholder="Surgieries, diseases, etc."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past Medical History"
                        placeholder="Surgieries, diseases, etc."
                    />
                </div>

                <section className={"mb-12 space-y-6"}>
                    <div className={"mb-9 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Identification and Verification
                        </h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select an ID type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="XYZ123456789"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned copy of ID"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                />

                <section className={"mb-12 space-y-6"}>
                    <div className={"mb-9 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Consent and Privacy
                        </h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name={"treatmentConsent"}
                    label={"I consent to treatment"}
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name={"disclosureConsent"}
                    label={"I consent to disclosure of information"}
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name={"privacyConsent"}
                    label={"I consent to privacy policy"}
                />
                
                <SubmitButton isLoading={isLoading}>Next</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm