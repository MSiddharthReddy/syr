import {
  Component,
  Render,
  View,
  Dimensions,
  Animated,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LinearGradient,
  PixelRatio,
  Platform,
  NativeModules
} from '../index';


class Rectangle extends Component {
  constructor() {
    super()
    this.state.backgroundColor = '#ffffff';
    this.state.message = 'hello world';
    this.xyAnimation = new Animated.ValueXY({x:0, y:0});
  }
  render() {
    return (
      <View style={{
        top: this.attributes.top,
        width: 100,
        height: 50,
        backgroundColor: this.state.backgroundColor,
        transform:[this.xyAnimation]
      }}>
     <Text style={{width:100, height:50, fontSize: 12, color:'#000000'}}>{this.state.message}</Text>
    </View>
    )
  }
  componentDidMount() {
    Animated.timing(this.xyAnimation, {
      toValue: {
        x:0,
        y:0
      },
      duration: 2000
    }).start()

    if(this.attributes.color == 'red') {
      this.setState({
          backgroundColor:'#ff0000',
          message: 'red square'
      });
    }
    if(this.attributes.color == 'blue') {
      this.setState({
        backgroundColor:'#0000ff',
        message: 'blue square'
      })
    }
    if(this.attributes.color == 'green') {
      this.setState({
        backgroundColor:'#00ff00',
        message: 'green square'
      })
    }
  }
}


class Square extends Component {
  constructor() {
    super();
    this.xyAnimation = new Animated.ValueXY({x:0, y:0});

  }
  render() {
    return (
      <View style={{
        width: 200,
        height: 200,
        backgroundColor: '#ff00ff',
        transform:[this.xyAnimation]
      }}>
        <Rectangle color="red" top="0"></Rectangle>
        <Rectangle color="blue" top="60"></Rectangle>
        <Rectangle color="green" top="120"></Rectangle>
        <View>
          <View props={this.props}>
            <View>
              <View props={this.props}></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  componentDidMount() {
    Animated.timing(this.xyAnimation, {
      toValue:{
        x:0,
        y:Dimensions.get('window').height - 200
      },
      duration:1000
    }).start()
  }
}

class SyrExample extends Component {
  render() {
    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000000'
      }}>
        <Square props={this.props}></Square>
      </View>
    );
  }
  componentDidMount() {
    this.setProps({
      foo: 'zooom'
    })
  }
}

Render(SyrExample);
