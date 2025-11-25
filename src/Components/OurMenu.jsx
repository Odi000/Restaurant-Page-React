import { useContext, useMemo, useRef, useCallback, useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Meals } from "./Homepage";
import useMenu from "./useMenu";
import styles from "./css_modules/OurMenu.module.css"

function OurMenu() {
    const { meals, errorMeals, loadingMeals, ourMenuRef } = useContext(Meals);
    const categories = useMemo(() => getCategories(), [meals]);
    const { data: categorieDetails, error: errorCategories, loading: loadingCategories } = useMenu('/categories.json');
    const allFilters = useMemo(() => getFilters(), [meals]);
    const [selectedCategory, setSelectedCategory] = useState('Starters');
    const [activeFilters, setActiveFilters] = useState([]);

    function getCategories(categories = []) {
        meals.forEach(meal => {
            if (categories.includes(meal.category)) return
            categories.push(meal.category);
        })
        return categories;
    }

    function getFilters(filters = []) {
        for (let i = 0; i < meals.length; i++) {
            const classificationArr = meals[i].classification;
            for (let j = 0; j < classificationArr.length; j++) {
                if (filters.includes(classificationArr[j])) continue;
                filters.push(classificationArr[j]);
            }
        }
        return filters;
    }

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    const handleFilterChange = useCallback((e) => {
        if (!e.target.checked) {
            setActiveFilters(activeFilters => activeFilters.filter(filter => filter != e.target.name))
        } else {
            setActiveFilters(activeFilters => [...activeFilters, e.target.name])
        };
    }, []);

    return (
        <section className={styles.menuContainer} ref={ourMenuRef}>
            <h1>Our Menu</h1>
            <Dropdown handleCategoryChange={handleCategoryChange} categories={categories}></Dropdown>
            <div className={styles.menu}>
                <CategoriesWindow
                    categorieDetails={categorieDetails}
                    loadingCategories={loadingCategories}
                    selectedCategory={selectedCategory}
                ></CategoriesWindow>
                <div className={styles.filtersAndListMenu}>
                    <Filters filters={allFilters} handleFilterChange={handleFilterChange}></Filters>
                    <MenuList selectedCategory={selectedCategory} activeFilters={activeFilters}></MenuList>
                </div>
            </div>
            <Background></Background>
        </section>
    )
}

const Dropdown = ({ handleCategoryChange, categories }) => {
    return (
        <select id="kot" onChange={handleCategoryChange} name="categoryList">
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
    )
}

const Filters = memo(({ filters, handleFilterChange }) => {
    return (
        <div className="filters">
            {filters.map(filter => {
                return (
                    <div className="filter" key={filter}>
                        <input type="checkbox" name={filter} id={filter} onChange={handleFilterChange} />
                        <label htmlFor={filter}>{filter}</label>
                    </div>
                )
            })}
        </div>
    )
})

const MenuList = memo(({ selectedCategory, activeFilters }) => {
    const { meals, error, loading } = useContext(Meals);
    const mealsToShow = useMemo(() => meals.filter(meal => meal.category === selectedCategory), [selectedCategory, meals]);
    const mealsPassFilter = useMemo(() => {
        return mealsToShow.filter(meal => {
            let pass = true;
            for (const filter of activeFilters) {
                if (!meal.classification.includes(filter)) {
                    pass = false;
                    return pass;
                }
            }
            return pass
        })
    }, [selectedCategory, activeFilters, meals]);

    return (
        <div className="menuList">
            {mealsToShow.map(meal => {
                const filtersActive = Boolean(activeFilters.length);
                const passesFilter = mealsPassFilter.includes(meal);
                return (
                    <div key={meal.id} className={!filtersActive ? "meal" : passesFilter ? "meal pass" : "meal fail"}>
                        <h2 className="name">{meal.name}</h2>
                        <p className="description">{meal.description}</p>
                        <div className="line"></div>
                    </div>
                )
            })}
        </div>
    )
})

const CategoriesWindow = memo(({ categorieDetails, loadingCategories, selectedCategory }) => {
    if (loadingCategories) return;
    const [category] = categorieDetails.filter(category => category.name === selectedCategory);
    return (
        <div className="windowContainer">
            <h1 className="category">{category.name}</h1>
            <p className="description">{category.description}</p>
            <img width={200} src={category.image} />
        </div>
    )
})

const Background = memo(() => {
    const backgroundRef = useRef(null);

    useEffect(() => {
        function manageScroll() {
            const scrolledFromTop = document.documentElement.scrollTop;
            const totalScrollable = document.documentElement.scrollHeight;
            const p = scrolledFromTop / totalScrollable;
            const range = 400;
            const initialTop = 140;
            backgroundRef.current.style.top = `${(initialTop - range * p).toFixed(0)}px`;
            // console.log((p * 100).toFixed(0) + "%" + " || " + (range * p).toFixed(0) + "px")
        }

        window.addEventListener("scroll", manageScroll)

        return () => window.removeEventListener("scroll", manageScroll);
    }, [])

    return (
        <div id="kar" ref={backgroundRef} className={styles.background}>
            <img src="/images/background.jpg" />
        </div>
    )
})

export default OurMenu;