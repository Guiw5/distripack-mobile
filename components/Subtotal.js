<ListItem key={element.id}          
    title={element.descripcion}
    subtitle={
        <View>
        <View style={styles.subtitleView}>                                
            <Text>Precio Unitario: ${element.precio}</Text>                                
        </View>
        <View>                  
            <Text> ${element.precio} * {element.cantidad}</Text>                                                
        </View>
        </View>
    }            
/>