import React from 'react';
import {render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';

import {TasksProvider, useTaskList} from '../../src/context/TasksContext';
import {TaskList} from '../../src/components/TaskList';

describe('TaskList Component', () => {
  it('verifica se um item na lista de tarefas', async () => {
    render(<TaskList />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const data = {id: 'Task01', title: 'Task01'};

    await act(() => result.current.addTask(data));
    expect(result.current.tasks[0].title).toEqual('Task01');

    await act(() => {
      return result.current.removeTask('Task01');
    });

    expect(result.current.tasks.length).toEqual(0);
  });
});
