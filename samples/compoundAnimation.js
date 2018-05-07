import { Component, Render, View, Dimensions, Animated, PixelRatio } from '../index';

const styles = {
  stage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  slideAnimation: {
    width: PixelRatio.getPixelSizeForLayoutSize(100),
    height: PixelRatio.getPixelSizeForLayoutSize(100),
    backgroundColor: '#aa00ff',
    top: 0,
    left: 0,
  },
};
class MyComponent extends Component {
  constructor() {
    super();
    this.slideAnimation = new Animated.ValueXY({ x: 0, y: 0 });
    this.rotationAnimation = new Animated.Value(0);

    styles.slideAnimation.transform = [
      this.slideAnimation,
      { rotatez: this.rotationAnimation },
    ];
  }
  render() {
    return (
      <View style={styles.stage}>
        <Animated.View style={styles.slideAnimation} />
      </View>
    );
  }
  slide() {
    this.slideAnimation.y = 0;
    this.slideAnimation.x = 0;
    Animated.timing(this.slideAnimation, {
      toValue: { x: 0, y: Dimensions.get('window').height - PixelRatio.getPixelSizeForLayoutSize(100) },
      duration: 1000,
    }).start(() => {
      // todo maintain this through state
      this.slideAnimation.y = Dimensions.get('window').height - PixelRatio.getPixelSizeForLayoutSize(100);
      Animated.timing(this.slideAnimation, {
        toValue: {
          x: Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(100),
          y: Dimensions.get('window').height - PixelRatio.getPixelSizeForLayoutSize(100),
        },
        duration: 1000,
      }).start(() => {
        this.slideAnimation.y = Dimensions.get('window').height - PixelRatio.getPixelSizeForLayoutSize(100);
        this.slideAnimation.x = Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(100);
        Animated.timing(this.slideAnimation, {
          toValue: { x: Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(100), y: 0 },
          duration: 1000,
        }).start(() => {
          this.slideAnimation.y = 0;
          this.slideAnimation.x = Dimensions.get('window').width - PixelRatio.getPixelSizeForLayoutSize(100);
          Animated.timing(this.slideAnimation, {
            toValue: { x: 0, y: 0 },
            duration: 1000,
          }).start(() => {
            this.slide();
          });
        });
      });
    });
  }
  rotate() {
    // start Z axis spinning animation
    Animated.timing(this.rotationAnimation, {
      toValue: 360,
      duration: 5000,
    }).start(() => {
      this.rotate();
    });
  }
  componentDidMount() {

    this.slide();
    // this.rotate();

  }
}

Render(MyComponent);
