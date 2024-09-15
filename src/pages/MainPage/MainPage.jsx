import React, { useEffect, useState } from 'react';
import styles from './MainPage.modules.css';
import Book from "../../components/MainPageComponents/Book/Book";
import { useDispatch, useSelector } from "react-redux";
import { getBooksList } from "../../store/MainPageSlice";
import noItems from '../../noitem.svg'

const MainPage = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortCriterion, setSortCriterion] = useState('price');
    const [toggle, setToggle] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const books = useSelector(state => state.mainReducer.books);
    const dispatch = useDispatch();

    const getBooks = () => {
        dispatch(getBooksList());
    };

    useEffect(() => {
        getBooks();
    }, []);

    const sortBooks = (books) => {
        return [...books].sort((a, b) => {
            if (sortCriterion === 'price') {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (sortCriterion === 'author') {
                return sortOrder === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
            } else if (sortCriterion === 'date') {
                return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            }
            return 0;
        });
    };

    const handleSort = (criterion) => {
        if (sortCriterion === criterion) {
            setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortCriterion(criterion);
            setSortOrder('asc');
        }
    };

    const validatedBooks = books.filter((book) => {
        const hasAllFields = book.title && book.author && book.date && book.price && book.image && book.tags;
        if (!hasAllFields) {
            console.log('Error: Data is not available', book);
        }
        return hasAllFields;
    });

    const allTags = validatedBooks.flatMap(item => item.tags);
    const clickedTags = Array.from(new Set(allTags));

    const filteredBooks = selectedTags.length > 0
        ? validatedBooks.filter(book => selectedTags.every(tag => book.tags.includes(tag)))
        : validatedBooks;

    const totalPrice = filteredBooks.reduce((total, book) => total + book.price, 0).toFixed(2);
    const sortedBooks = sortBooks(filteredBooks);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const tagsButton = document.querySelector('.tags-button');
            if (toggle && dropdownMenu && !dropdownMenu.contains(event.target) && !tagsButton.contains(event.target)) {
                setToggle(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [toggle]);

    return (
        <div className='main-page'>
            <div className="container">
                <div className="main-page__title">
                    <h1>Literary Hook</h1>
                </div>
                <div className="main-page-header">
                    <nav className="main-page-nav">
                        <div className="main-page-nav__left">
                            <ul>
                                <li>
                                    <button onClick={() => handleSort('price')}>
                                        Price
                                        <span
                                            className={`arrow ${sortCriterion === 'price' && sortOrder === 'desc' ? 'asc' : ''}`}>↓</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSort('author')}>
                                        Author
                                        <span
                                            className={`arrow ${sortCriterion === 'author' && sortOrder === 'desc' ? 'asc' : ''}`}>↓</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSort('date')}>
                                        Date
                                        <span
                                            className={`arrow ${sortCriterion === 'date' && sortOrder === 'desc' ? 'asc' : ''}`}>↓</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="main-page-nav__right">
                            <ul>
                                <li>
                                    <button
                                        className="tags-button"
                                        onClick={() => {
                                            setToggle(!toggle);
                                            handleSort('tags');
                                        }}
                                    >
                                        Tags
                                        <span
                                            className={`arrow ${sortCriterion === 'tags' && sortOrder === 'asc' ? 'asc' : ''}`}>↓</span>
                                    </button>
                                    {toggle && (
                                        <div className="dropdown-menu">
                                            {clickedTags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => {
                                                        setSelectedTags(prev => {
                                                            const updatedTags = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag];
                                                            return updatedTags;
                                                        });
                                                    }}
                                                    className={`dropdown-menu__button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                </li>
                                <li>
                                    <button onClick={() => {
                                        setSortOrder('asc');
                                        setSortCriterion('price');
                                        setSelectedTags([]);
                                    }}>
                                        Reset
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </nav>
                </div>
                {sortedBooks.length? sortedBooks.map((book) => (
                    <Book
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        date={book.date}
                        price={book.price}
                        tags={book.tags}
                        image={book.image}
                    />
                )):
                    <div className='empty-items'>
                        <img src={noItems} alt="icon"/>
                        <p>No Books Found</p>
                    </div>
                }
                <div className="total">
                    Total: {totalPrice}$
                </div>
            </div>
        </div>
    );
};

export default MainPage;
