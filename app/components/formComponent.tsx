"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./formComponent.module.css";
import { User, userShema } from "../lib/types/data";
import { fetcher } from "../lib/fetchs";
export default function FormComponent() {
    const [user, setUser] = useState<User | null>(null);


    type UserForm = z.infer<typeof userShema>;
    const { register, handleSubmit, reset, formState } = useForm<UserForm>({
        resolver: zodResolver(userShema),// Le résolveur est responsable de la validation des données soumises et de la gestion des erreurs.
    });

    const onSubmit = async (data: UserForm) => {
        console.log("Form Data Submitted: ", data);
        if (formState.errors && Object.keys(formState.errors).length > 0) {
            console.log("Erreur de validation: ", formState.errors);
            reset(undefined, {
                keepErrors: true,
            });
            return;
        }
        const response = await fetcher('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response) {
            reset(undefined, {
                keepErrors: true,
            });
            return;
        }

    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:flex sm:flex-col border border-gray-700 bg-gray-900 text-white rounded-2xl gap-4 w-130 sm:h-auto mx-auto lg:h-[550px] lg:flex lg:flex-col">
            <input {...register("name")} placeholder="Name" className={styles.input} />
            <input {...register("username")} placeholder="Username" className={styles.input} />
            <input {...register("booksBought")} placeholder="Books Bought" className={styles.input} />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
    )
}