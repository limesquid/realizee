import React from 'react';

const todoStyle = {
  display: 'flex',
  marginLeft: 10
};

const TodosView = ({ todos = [], onTodoClick }) => (
  <div>
    Todos:
    {todos.map(({ id, text, done }) => (
      <div key={id} style={todoStyle} onClick={() => onTodoClick(id)}>
        {`${done ? '✓' : '✕'} ${text}`}
      </div>
    ))}
  </div>
);

export default TodosView;
