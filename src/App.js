import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import NewsletterForm from './NewsletterForm';
import Loading from './shared/Loading';
import axios from 'axios';
import notify from './helpers/notify';
import apiUrl from './helpers/apiUrl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    }
  }

  handleLoadingState = loading => {
    this.setState({ loading: loading });
  }

  handleSendEmail = email => {
    this.handleLoadingState(true);
    axios.post(`${apiUrl}/subscribe`, {
      email: email
    }).then(res => {
      notify('success', 'Subscribed!', res.data.success);
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
