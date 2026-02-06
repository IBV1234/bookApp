"use client"
import React, { useState, useMemo, useEffect, use } from "react";
import { Book } from "../lib/types/data";
import { useRouter } from "next/navigation";
import styles from "./style/booksPage.module.css";

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooksState, setFilteredBooksState] = useState<{ type: string, books: Book[] }>({ type: "", books: [] });

    const router = useRouter();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Fetched books from API:', data);
                if (!data || data[0].length === 0) {
                    console.error('Failed to fetch books:', data.error);
                    return;
                }
                setBooks(data);
                setFilteredBooksState({ type: "", books: data });
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);






    const getValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFilteredBooksState({ ...filteredBooksState, type: value.trim() });

    }

    const filteredBooks = useMemo(() => {
        return filteredBooksState.books.filter(book => {
            if ((filteredBooksState.type.toLowerCase() === "tous les types" || filteredBooksState.type === "") && searchQuery === "") { // Si on veut tous les livres et qu'il n'y a pas de recherche
                return filteredBooksState.books;
            }
            else if ((filteredBooksState.type.toLowerCase() === "tous les types" || filteredBooksState.type === "") && searchQuery !== "") {// Si on veut tous les livres et qu'on fait une recherche

                return book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.detail.author?.toLowerCase().includes(searchQuery.toLowerCase())
            }

            else if (filteredBooksState.type !== "" && searchQuery === "") { // Sil y a un type sélectionné mais pas de recherche
                return book.type.toLowerCase() === filteredBooksState.type.toLowerCase()

            }
            else if (filteredBooksState.type.toLowerCase() === "bd" && searchQuery !== "") {// Si y a un type  BD de sélectionné  qui n'est pas tous les livres et qu'on recherche  un dessinator
                return book.detail.dessinator?.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    book.type.toLowerCase() === filteredBooksState.type.toLowerCase()


            } else if (filteredBooksState.type !== "" && filteredBooksState.type.toLowerCase() !== "tous les types" && searchQuery !== "") {// Si y a un type sélectionné et une recherche qui n'est pas tous les livres , qui n'est pas un bd et qu'on recherche un auteur ou un titre
                return (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) && book.type.toLowerCase() === filteredBooksState.type.toLowerCase()) ||
                    book.detail.author?.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    (filteredBooksState.type.toLowerCase() !== "bd" && book.type.toLowerCase() === filteredBooksState.type.toLowerCase())


            }

        }).sort((a, b) => b.prix - a.prix);

    }, [filteredBooksState, searchQuery]);


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>📚 Bibliothèque</h1>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Rechercher par titre, auteur, dessinateur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />


            </div>

            <div className={styles.searchSelect}>
                <select onChange={getValueSelect}>
                    <option defaultValue={"all"}>Tous les types</option>
                    <option value="livre">Livre</option>
                    <option value="bd">BD</option>
                    <option value="périodique">Périodique</option>

                </select>
            </div>

            {filteredBooks.length === 0 ? (
                <div className={styles.noResults}>
                    <p>Aucun livre trouvé pour: <strong>{searchQuery}</strong></p>
                </div>
            ) : (
                <div className={styles.booksGrid}>
                    {filteredBooks.map((book, index) => (
                        <div key={index} className={styles.bookCard}>
                            <div className={styles.bookHeader}>
                                <h2 className={styles.bookTitle}>{book.title}</h2>
                                <span className={`${styles.badge} ${styles[book.type]}`}>
                                    {book.type}
                                </span>
                            </div>

                            <div className={styles.bookDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Auteur:</span>
                                    <span>{book.detail.author}</span>
                                </div>

                                {book.detail.dessinator && (
                                    <div className={styles.detailRow}>
                                        <span className={styles.label}>Dessinateur:</span>
                                        <span>{book.detail.dessinator}</span>
                                    </div>
                                )}

                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Maison d'édition:</span>
                                    <span>{book.detail.maisonEdition}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Année:</span>
                                    <span>{book.detail.publishedYear}</span>
                                </div>

                                {book.detail.periodicite && (
                                    <div className={styles.detailRow}>
                                        <span className={styles.label}>Périodicité:</span>
                                        <span>{book.detail.periodicite}</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.bookFooter}>
                                <div className={styles.priceStock}>
                                    <div className={styles.price}>
                                        <span className={styles.label}>Prix:</span>
                                        <span className={styles.priceValue}>{book.prix}$</span>
                                    </div>
                                    <div className={`${styles.availability} ${book.dispo > 0 ? styles.available : styles.unavailable}`}>
                                        <span className={styles.label}>Stock:</span>
                                        <span>{book.dispo}</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center w-[200px] h-[60px] mx-auto mt-30">
                <button type="button" className={styles.button} onClick={() => router.push("/")}> Ajouter un livre </button>

            </div>
        </div>
    );
}

/**
 * @styles [book.type] Accès dynamique à une classe CSS basée sur la valeur de book.type
 */