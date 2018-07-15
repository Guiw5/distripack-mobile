import React from 'react';
import { ListItem } from 'react-native-elements';
import SearchList from './SearchList';
import { connect } from 'react-redux';
import { setClient, getClients } from '../actions/index';

class SelectClient extends React.Component {
  constructor(props){
    super(props);        
  }  
 
  componentDidMount() {    
    if(this.props.clients.length === 0)
      this.props.getClients();
  }

  filterFunction = (text) => {
    let results = this.props.clients;        
    if(text) {      
      results = results.filter(item =>         
        item.mail.toLowerCase().includes(text.toLowerCase()) ||
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }       
    return results;
  };

  onPress = (client) => {      
    this.props.setClient(client.mail);
    this.props.navigation.navigate('Products');
  }    

  renderItem = ({ item }) => (
    <ListItem              
      title={item.name}
      subtitle={item.mail} 
      subtitleStyle={{fontSize: 12}}            
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.onPress(item)}
    />
  )
  
  render() {  
    console.log('pero no tenemos data por acá?', this.props.clients)  
    return (
        this.props.clients.length > 0 && 
        <SearchList 
          itemKey='mail'
          headerPlaceholder='Escriba nombre, alias o mail del cliente'        
          renderItem={this.renderItem}
          filterFunction={this.filterFunction}
          data={this.props.clients}        
        />       
    );
  }
}

const mapStateToProps = state => { 
  return { clients: state.clients };
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: id => {
      dispatch(setClient(id))
    },
    getClients: () => {
      dispatch(getClients())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectClient);