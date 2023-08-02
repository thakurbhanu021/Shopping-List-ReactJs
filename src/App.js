import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const [items, setItems] = useState([
		{Value: 'Item 1', quantity: 1 , isCompleted: false},
		{Value: 'Item 2', quantity: 2 , isCompleted: false},
		{Value: 'Item 3', quantity: 3 , isCompleted: false},
	]);
	const [handleUserInput, setHadlerUserInput] = useState('');
	const [totalItemCount , setTotalItemCount] = useState(6);

	const onAddInputHandler = () => {
		if(!handleUserInput){
			alert('Please enter some value to add')
		}
		else {
			const newItem = {Value: handleUserInput, quantity: 1, isCompleted: false};
			const newItems = [...items, newItem];
			setItems(newItems);
			setHadlerUserInput('');
		}
	}

	const onIncreaseQuantity = (index)=> {
		const newItems = [...items];
		newItems[index].quantity++;
		setItems(newItems);
		totalCountHandler();
	} 

	const onDecreaseQuantity = (index)=> {
		const newItems = [...items];
		if(newItems[index].quantity <= 0){
			alert('Cannot decrease quantity lower than zero')
		}
		else {
			newItems[index].quantity--;
			setItems(newItems);
			totalCountHandler();
		}
	} 

	const toggleHandler = (index) => {
		const newItems = [...items];
		newItems[index].isCompleted = !newItems[index].isCompleted;

		setItems(newItems);
	}

	const totalCountHandler = () => {
		const totalCount = items.reduce((total , item)=>{
			return total + item.quantity;
		}, 0)
		setTotalItemCount(totalCount);
	}

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={handleUserInput} onChange={(event)=>{setHadlerUserInput(event.target.value)}} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={onAddInputHandler}/>
				</div>
				<div className='item-list'>
					{items.map((item , index)=> (
						<div className='item-container'>
						<div className='item-name' onClick={()=>toggleHandler(index)}>
							{item.isCompleted ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.Value}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.Value}</span>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={()=>{onDecreaseQuantity(index)}}/>
							</button>
							<span> {item.quantity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={()=>{onIncreaseQuantity(index)}} />
							</button>
						</div>
					</div>
					))}				
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;