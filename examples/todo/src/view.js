import React from 'react';

const todoStyle = {
  display: 'flex',
  marginLeft: 10,
  cursor: 'pointer'
};

const TodosView = ({ todos: { entries = [] }, onTodoClick }) => (
  <div>
    Todos:
    {entries.map(({ id, text, done }) => (
      <div key={id} style={todoStyle} onClick={() => onTodoClick(id)}>
        {`${done ? '✓' : '✕'} ${text}`}
      </div>
    ))}
  </div>
);

export default TodosView;
