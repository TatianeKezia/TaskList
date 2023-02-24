import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';

import {TasksProvider, useTaskList} from '../../src/context/TasksContext';
import {Home} from '../../src/pages/Home/Index';

describe('Home Page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);

    const inputNewTask = getByPlaceholderText('Nova Tarefa...');
    // console.log(inputNewTask);
    expect(inputNewTask).toBeDefined();
    expect(inputNewTask.props.placeholder).toBeTruthy();
  });

  it('verifica a inerção de um item na lista de tarefas', async () => {
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const data = {id: 'Task01', title: 'Task01'};

    await act(() => result.current.addTask(data));

    expect(result.current.tasks).toBeTruthy();
  });

  it('se o clique no botão insere um item na lista de tarefas', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const inputNewTask = getByPlaceholderText('Nova Tarefa...');
    const button = getByTestId('addButton');

    const data = {id: 'Task01', title: 'Task01'};

    act(() => {
      return fireEvent.changeText(inputNewTask, data.title);
    });

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(result.current.tasks).toBeTruthy();
  });
});
