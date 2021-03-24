import TodoForm from 'features/Todo/components/TodoForm';
import React from 'react';

ListPage.propTypes = {};

function ListPage(props) {

    const handleTodoFormSubmit = (values) => {
        console.log('Forms submit:', values);
    }

    return (
        <div>
            <TodoForm onSubmit={handleTodoFormSubmit} />
        </div>
    );
}

export default ListPage;