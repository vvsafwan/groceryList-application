import { useState } from "react";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {

	const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: "Item 1",
        },
        {
            id: 2,
            checked: false,
            item: "Item 2",
        },
        {
            id: 3,
            checked: false,
            item: "Item 3",
        },
    ]);

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');

    const addItem = (item) => {
        const id = items[items.length-1].id + 1;
        const myNewItem = {id, checked: false, item};
        const listItems = [...items, myNewItem]
        setItems(listItems)
    } 

	const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newItem) return;
        addItem(newItem)
        setNewItem('')
    }

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem 
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            <Content  
				items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
				handleCheck={handleCheck}
				handleDelete={handleDelete}
			/>
            <Footer length={items.length} />
        </div>
    );
}

export default App;
