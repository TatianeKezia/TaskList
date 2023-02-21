import React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {useTaskList} from '../../context/TasksContext';

export const Home = () => {
  const [newTask, setNewTask] = React.useState('');
  const {addTask} = useTaskList();

  const handleAddNewTask = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask : 'Task empty',
    };
    addTask(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, dev!</Text>
        <TextInput
          onChangeText={setNewTask}
          placeholderTextColor="#555"
          placeholder="Nova Tarefa..."
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleAddNewTask}
          activeOpacity={0.7}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <Text style={styles.titleTasks}>Minhas Tarefas</Text>

        <TaskList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214',
  },
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    color: '#F1F1F1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTasks: {
    color: '#F1F1F1',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  input: {
    backgroundColor: '#29292E',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 12,
    marginTop: 30,
    borderRadius: 7,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#eba417',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#121214',
    fontWeight: 'bold',
  },
});
