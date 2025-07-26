import { useContext, useMemo, useCallback, useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { Meals } from "./Homepage";

function OurMenu() {
    const { meals, error, loading } = useContext(Meals);
    const categories = useMemo(() => getCategories(), [meals]);
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
            setActiveFilters(activeFilters.filter(filter => filter != e.target.name))
        } else {
            setActiveFilters(activeFilters => [...activeFilters, e.target.name])
        };
    }, []);

    return (
        <section className="menuContainer">
            <h1>Our Menu</h1>
            <Dropdown handleCategoryChange={handleCategoryChange} categories={categories}></Dropdown>
            <div className="menu">
                <Filters filters={allFilters} handleFilterChange={handleFilterChange}></Filters>
                <MenuList selectedCategory={selectedCategory} activeFilters={activeFilters}></MenuList>
            </div>
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

    return (
        <div className="menuList">
            {mealsToShow.map(meal => {
                return (
                    <div className="meal">
                        <h2 className="name">{meal.name}</h2>
                        <p className="description">{meal.description}</p>
                        <div className="line"></div>
                    </div>
                )
            })}
        </div>
    )
})

function SideDisplay() {
    return (
        <></>
    )
}

export default OurMenu;