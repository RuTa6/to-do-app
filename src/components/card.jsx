import React from "react";

export default function Card({
  onDragLeave,
  onDragStart,
  onDragOver,
  onDrop,
  card,
  index,
  btnclick,
}) {
  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(to bottom left, ${card.color} 40%, #ffc39e 100%)`
      }}
      key={index}
      data-position={index}
      draggable="true"
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={`title ${card.done ? 'striked' : ''}`}>{card.title}</div>
      <div className="content">{card.content}</div>
      <div className="addtolist">
        <button className="button" key={index} onClick={() => {
            btnclick(index)
        }}>
          Mark as Done
        </button>
      </div>
    </div>
  );
}
