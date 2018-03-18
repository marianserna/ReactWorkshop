import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import {
  ChatContainer, // Wraps the entire chat component's content (div)
  MessageList, // The wrapper (ul) which wraps the message items
  MessageItem, // The message (li) itself
  MessageName, // The name of the person displayed in the message
  MessageText, // The message the person wrote
  Form, // Form tag wrapping the name and message inputs
  UserInput, // An input tag asking for the user's name
  TextInput, // An input tag asking for the user's message
  SendButton, // The button to submit the form
  ChatTrigger, // Icon displayed which will open/close chat section (hidden off screen)
  TriggerImage // Image displayed inside ChatTrigger
} from '../elements/chat';

import chatImage from '../images/chat.png';
import database from '../firebase';

@inject('UiStore', 'WeatherStore')
@observer
export default class Chat extends React.Component {
  componentDidMount() {
    database
      .ref(`/cities/${this.props.city}`)
      .limitToLast(25)
      .on('value', snapshot => {
        const messages = Object.values(snapshot.val() || {});
        this.props.WeatherStore.setMessages(messages);
      });
  }

  handleSend = e => {
    e.preventDefault();

    const message = database.ref(`/cities/${this.props.city}`).push();
    message.set({
      user: this.userInput.value,
      text: this.textInput.value,
      time: new Date().getTime()
    });

    this.textInput.value = '';
    this.textInput.focus();
  };

  render() {
    return (
      <ChatContainer chat={this.props.UiStore.showChat}>
        <ChatTrigger
          onClick={e => {
            e.preventDefault();
            this.props.UiStore.toggleChat();
          }}
        >
          <TriggerImage src={chatImage} />
        </ChatTrigger>

        <MessageList>
          {this.props.WeatherStore.messages.map(message => (
            <MessageItem key={message.time}>
              <MessageName>{message.user}</MessageName>
              <MessageText>{message.text}</MessageText>
            </MessageItem>
          ))}
        </MessageList>

        <Form onSubmit={e => this.handleSend(e)}>
          <TextInput
            placeholder="Write Message"
            innerRef={input => (this.textInput = input)}
          />
          <UserInput
            placeholder="User Name"
            innerRef={input => (this.userInput = input)}
          />
          <SendButton>SEND</SendButton>
        </Form>
      </ChatContainer>
    );
  }
}
