'use client'

import React from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Control} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {FormFieldType} from "@/components/forms/PatientForm";
import Image from "next/image";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from "libphonenumber-js";

export enum FormFieldType {
    INPUT = "input",
    CHECKBOX = "checkbox",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field,props}:{field:any; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder} = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className={"flex rounded-md border border-b-dark-500 bg-dark-400"}>
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} width={24} height={24} className={'ml-2'}/>
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className={"shad-input border-0"}
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="PL"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className={"input-phone"}
                    />
                </FormControl>
            )
        default:
            break;
    }
}
const CustomFormField = (props:CustomProps) => {
    const {control, fieldType, name, label} = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={"flex-1"}>
                    {fieldType !== FormFieldType.CHECKBOX && label &&(
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props}/>

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};
export default CustomFormField;