import React from 'react';
import { View, Text } from 'react-native';
import { Input, ButtonGroup } from 'react-native-elements';

export default class OrderItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      unitPrice: 0,
      totalPrice: 0,
      selectedIndex: 2
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  }

  render() {
    let { product }  = this.props.item;  
    const buttons = ['Hello', 'World', 'Buttons']
    const { selectedIndex } = this.state  
    return (
      <View>
        <Text>{product.alias? product.alias : product.descripcion}</Text>      
        <Input value={this.state.quantity} onChange={(text) => this.setState({quantity: parseInt(text)})} keyboardType="numeric" />
        <Text>${product.precio * this.state.quantity}</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 50}}
        />
      </View>
    );
  }
}