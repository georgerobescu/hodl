import React, {Component} from 'react';
import '../layout/components/message.sass';

class Message extends Component {
  // componentDidUpdate(prevProps) {
  //   if(this.props.message !== prevProps.message) {
  //     this.render();
  //   }
  // }

  render() {
    if(this.props.message != null) {
      return(
        <div className="message">
          <p className="message__text">
            {this.props.message}
          </p>
          {/* Loader here */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Message;