import React, { useState } from "react";
import Card from "./components/card";

import "./App.css";

const App = () => {
  const [cards, setCards] = useState([
    { title: "test", content: "cardContent", done: false, color: 'green' },
    { title: "test2", content: "cardContent2", done: false, color: 'blue' },
  ]);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");

  const addCard = (event) => {
    event.preventDefault();
    setCards([
      ...cards,
      {
        title: cardTitle,
        content: cardContent,
				done: false,
				color: 'red'
      },
    ]);
    setCardTitle("");
    setCardContent("");
  };
  const btnclick = (i) => {
    console.log("Markas done clicked");
    let tempCards = cards.map(i => i);

    tempCards[i].done = true;

    // console.log(tempCards)
    setCards(tempCards);
  };

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: cards,
    });
  };
  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };
  const onDrop = (event) => {
    setCards(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  return (
    <div className="body">
      <div className="header">
        <p className="headerTitle">
          "An <b> hour of planning </b> can <b>save </b> you{" "}
          <b>hours of doing</b>"<br></br>
          Let's plan your works...
        </p>
        <div className="cards">
          <div className="title">
            <br></br>
            <input
              name="title"
              type="text"
              placeholder="Add a Title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <br></br>
            <br></br>
          </div>
          <div className="content">
            <textarea
              name="content"
              placeholder="Describe your to do work here"
              value={cardContent}
              onChange={(ev) => setCardContent(ev.target.value)}
            ></textarea>
            <br></br>
          </div>
          <div className="addtolist">
            <button className="button" onClick={addCard}>
              Add to List
            </button>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container">
        {cards.map((card, index) => {
					console.log("Rerendering cards")
					return (
						<Card
							onDragLeave={onDragLeave}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDrop={onDrop}
							card={card}
							index={index}
							btnclick={btnclick}
						/>
					)
				})}
      </div>
    </div>
  );
};

export default App;
