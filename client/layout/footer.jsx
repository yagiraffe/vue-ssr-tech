// jsx就是把html写在js代码里
// .jsx文件里不能写样式，所以样式要在新的文件里，然后引入
// import className from '../assets/styles/footer.styl',
// <div id={className.footer}>
import '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Jocky'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
