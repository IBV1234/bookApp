"use client"
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./style/formComponent.module.css";
import { userShema } from "../lib/types/data";
import {useRouter} from "next/navigation";


export default function FormComponent() {
    const [loading, setLoading] = useState(false);
    const [showInputToAddBook, setShowInputToAddBook] = useState(false);
    const router = useRouter();

    type UserForm = z.infer<typeof userShema>;
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<UserForm>({
        resolver: zodResolver(userShema),// Le résolveur est responsable de la validation des données soumises et de la gestion des erreurs.
        mode: "onSubmit",
    });

    /**
     * @useFieldArray  pour gérer dynamiquement un tableau de champs appelé "booksWritten".
     * @control Passe le contrôle du formulaire pour que React Hook Form gère ce tableau
     * @fields : @booksWrittenFields : Un tableau contenant tous les champs actuels. Chaque élément a un id unique
     */

    const { fields: booksWrittenFields, append, remove } = useFieldArray({
        name: "booksWritten",
        control: control,
    });
    console.log("Books Written Fields: ", booksWrittenFields.length);


    const onSubmit = async (user: UserForm) => {
        console.log("Form Data Submitted: ", user);
        if (errors && Object.keys(errors).length > 0) {
            console.log("Erreur de validation: ", errors);
            return;
        }

        setLoading(true);
        let response = null;
        try {
            response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
        } catch (e) {
            console.error("Submission error: ", e);
        }

        setLoading(false);
        if (!response?.ok) {
            reset(undefined, {
                keepErrors: true,
            });
            return;
        }
        router.push('/home');

    }


    useEffect(() => {
        console.log("showInputToAddBook ", showInputToAddBook);
    }, [showInputToAddBook]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl gap-5 w-full max-w-md sm:h-auto mx-auto p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Formulaire d'ajout de client et de livre</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Nom</label>
                <input {...register("name")} placeholder="Entrez votre nom" className={styles.input} />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Nom d&apos;utilisateur</label>
                <input {...register("username")} placeholder="Entrez votre nom d'utilisateur" className={styles.input} />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>

            <button className={styles.button} type="button" onClick={() => {
                setShowInputToAddBook(!showInputToAddBook);

                if (booksWrittenFields.length > 0) return;
                append({ title: "", detail: { author: "", publishedYear: 2000, maisonEdition: "" }, dispo: 0, prix: 0, type: "livre" });
            }}>
                {showInputToAddBook ? "Fermer" : "Ajouter un livre"}
            </button>
            {showInputToAddBook && (
                <div className="flex flex-col gap-3">
                    
                    {booksWrittenFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col items-center gap-2">

                            <input
                                {...register(`booksWritten.${index}.title` as const)}
                                placeholder="Titre du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.title && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].title.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.detail.author` as const)}
                                placeholder="Auteur du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.detail?.author && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].detail.author.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.detail.maisonEdition` as const)}
                                placeholder="Maison d'édition du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.detail?.maisonEdition && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].detail.maisonEdition.message}</span>

                            )}
                            <input
                                {...register(`booksWritten.${index}.detail.dessinator` as const)}
                                placeholder="Dessinateur du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.detail?.dessinator && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].detail.dessinator.message}</span>

                            )}

                             <input
                                {...register(`booksWritten.${index}.detail.publishedYear` as const, { valueAsNumber: true })}
                                placeholder="Année de publication du livre écrit"
                                className={styles.input}
                                type="number"
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.detail?.publishedYear && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].detail.publishedYear.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.detail.periodicite` as const)}
                                placeholder="Périodicité du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.detail?.periodicite && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].detail.periodicite.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.dispo` as const, { valueAsNumber: true })}
                                placeholder="Disponibilité du livre écrit"
                                className={styles.input}
                                type="number"
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.dispo && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].dispo.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.prix` as const, { valueAsNumber: true })}
                                placeholder="Prix du livre écrit"
                                className={styles.input}
                                type="number"
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.prix && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].prix.message}</span>

                            )}

                            <input
                                {...register(`booksWritten.${index}.type` as const)}
                                placeholder="Type du livre écrit"
                                className={styles.input}
                            />
                            {errors.booksWritten && errors.booksWritten[index]?.type && (
                                <span className="text-red-500 text-sm">{errors.booksWritten[index].type.message}</span>

                            )}

                        </div>
                    ))}

                </div>
            )}

            <button type="submit" className={styles.button}>{loading ? "En cours..." : "Soummettre"}</button>
        </form>
    )
} {/* <select {...register("booksWritten")} className={styles.input}>
                <option value="">Sélectionnez un livre</option>
                <option value="livre1">Livre 1</option>
                <option value="livre2">Livre 2</option>
                <option value="livre3">Livre 3</option>
              </select> */}

