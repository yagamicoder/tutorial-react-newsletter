import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import NewsletterForm from './NewsletterForm';
import Loading from './shared/Loading';
import axios from 'axios';
import notify from './helpers/notify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    }
  }

  handleLoadingState = flag => {
    this.setState({ loading: flag });
  }

  handleSendEmail = email => {
    this.handleLoadingState(true);
    axios.post('/subscribe', {
      email: email
    }).then(data => {
      notify('success', 'Subscribed!', data.message);
      this.setState({ email: '' });
      this.handleLoadingState(false);
    }).catch(error => {
      notify('error', 'Unable to subscribe!', error.message);
      this.handleLoadingState(false);
    });
  }

  handleOnChangeEmail = email => {
    this.setState({
      email: email
    })
  }

  render() {
    return (
      <div className="App">
        <header className="newsletter-header">
          <Row>
            <i className="material-icons">email</i>
            <h1>Simple React Newsletter Tutorial</h1>
          </Row>
        </header>
        <section className="newsletter-content">
          <Row>
            <Col span={24}>
              <p className="lead-txt">Subscribe to my awesome newsletter or <span className="txt-highlight">suffer</span>! Mwhahaha! Just kidding lolz :)</p>
              {this.state.loading
                ? <Loading message="Working on it..." />
                : <NewsletterForm handleSendEmail={this.handleSendEmail} handleOnChangeEmail={this.handleOnChangeEmail} email={this.state.email} />
              }
            </Col>
          </Row>
        </section>
        <footer className="newsletter-footer">
          React Newsletter
        </footer>
      </div>
    );
  }
}

export default App;