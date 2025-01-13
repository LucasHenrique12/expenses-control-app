  import { Text, View,  StyleSheet, KeyboardAvoidingView, Platform,TextInput, TouchableOpacity, Keyboard } from 'react-native';
  import Expenses from '../../src/components/expenses';
  import React,{ useState } from 'react';
  import { Link } from 'expo-router';

  let nextId = 0;
  export default function Index()  {

    const [expense,setExpense] = useState('');
    const [expenseItems, setExpenseItems] = useState<string[]>([]);

    const handleAddExpense = () =>{
    Keyboard.dismiss();
    setExpenseItems([...expenseItems,expense]);
    setExpense('');
    }

    

    const paidExpense = (index: number)=> {
      let itemsCopy = [...expenseItems];
      itemsCopy.splice(index,1);
      setExpenseItems(itemsCopy);
    }
    return (
      <View style={styles.container}>
        
        <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Gastos de Hoje</Text>
        
        <View style={styles.items}>
          {
            expenseItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={()=> paidExpense(index)}>
                  <Expenses  text={item} />
                </TouchableOpacity>
              
              ) 
          })
          }
          
        </View>
        </View>
        
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style = {styles.writeTaskWrapper}>
          <TextInput style ={styles.input} placeholder="Adicione novos gastos" value = {expense} onChangeText={text => setExpense(text)} />

          <TouchableOpacity onPress={()=> handleAddExpense()}> 
            <View style = {styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
            </View>
           
          </TouchableOpacity> 
        </KeyboardAvoidingView>
          

          </View>
        

      
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#444',
      borderColor:'#fff',
      
    },
    addText:{},
    

    input:{
      paddingVertical:15,
      width:250,
      paddingHorizontal: 15,
      backgroundColor:'#fff',
      borderRadius:60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    tasksWrapper: {
      backgroundColor: '#444',
      paddingTop: 80,
      paddingHorizontal:20,
      
    },
    writeTaskWrapper:{
      position: 'absolute',
      bottom:60,
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    addWrapper:{
      width:60,
      height:60,
      backgroundColor:'#FFF',
      borderRadius:60,
      justifyContent:'center',
      alignItems:'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,

    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      
      
    },
    items: {
    marginTop: 30,
    flexGrow:1,
    
    },
  });
