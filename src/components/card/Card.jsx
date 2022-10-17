import React, { useState } from "react";
import './styles.css'
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : " RGB(255, 255, 255)",

    // styles we need to apply on draggables
    ...draggableStyle
});

const initialItems = [
    { id: "1", content: "Conteúdo 1" },
    { id: "2", content: "Conteúdo 2" },
    { id: "3", content: "Conteúdo 3" },
]
const inicialColumns = [
    {
        name: "To do",
        id: '123',
        items: initialItems
    },
    {
        name: "Doing",
        id: '456',
        items: [{ id: "4", content: "Conteúdo 4" }]
    },
    {
        name: "Done",
        id: '789',
        items: []
    }
]
function Card() {
    const [columns, setColumns] = useState(inicialColumns);

    const onDragEnd = (results) => {

        var sourceColumnsItems = {};

        for (var i in columns) {
            if (columns[i].id == results.source.droppableId) {
                sourceColumnsItems = columns[i].items;
            }
        }

        //objeto selecionado
        var filteredObject = sourceColumnsItems.filter(item => item.id == results.draggableId);

        //exclui o item selecionado
        var filtered = sourceColumnsItems.filter(item => item.id != results.draggableId);

        //copia o state
        var copyColumns = JSON.parse(JSON.stringify(columns));

        //adiciona lista sem o objeto selecionado
        for (var i in columns) {
            if (columns[i].id == results.source.droppableId) {
                copyColumns[i].items = filtered;
            }
        }

        //posição destino do objeto
        const position = results.destination.index;

        //adiciona objeto em nova lista ou na mesma
        for (var j in columns) {
            if (columns[j].id === results.destination.droppableId) {
                copyColumns[j].items.splice(position, 0, filteredObject[0]);
                setColumns(copyColumns);
            }
        }
    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
                {columns.map(column => (
                    <div className="card" key={column.id}>
                        <div className="header"> <h1 >{column.name}</h1></div>
                        <Droppable droppableId={column.id} >
                            {(provided,snapshot) => (
                                <div className="drop" 
                                {...provided.droppableProps}
                                ref={provided.innerRef} 
                                >
                                    {column.items.map((item, index) => (
                                        <Draggable draggableId={item.id} index={index} key={item.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}

                                                    ref={provided.innerRef}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    className="content">
                                                    <span className="span1">{item.content}</span>
                                                    <div className="info">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>

                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>


    )

};
export default Card;