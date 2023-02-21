import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ITask, useTaskList} from '../../context/TasksContext';

export const TaskList = () => {
  const {tasks, removeTask} = useTaskList();

  const handleRemoveTask = (id: string) => {
    Alert.alert('Excluir Tarefa', 'Deseja excluir a tarefa?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Excluir',
        onPress: () => removeTask(id),
      },
    ]);
  };

  return (
    <FlatList
      data={tasks as unknown as ITask[]}
      keyExtractor={item => item.id}
      renderItem={({item}: ListRenderItemInfo<ITask>) => {
        return (
          <TouchableOpacity
            onPress={() => handleRemoveTask(item.id)}
            style={styles.buttonTask}
          >
            <Text style={styles.titleTask}>{item.title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  buttonTask: {
    backgroundColor: '#29292E',
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  titleTask: {
    color: '#F1F1F1',
    fonteSize: 20,
    fontWeight: 'bold',
  },
});
