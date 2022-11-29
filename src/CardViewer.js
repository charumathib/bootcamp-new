import React from 'react';
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardNum: 0, back: false };
  }

  changeSide = () => {
    this.setState({ cardNum: this.state.cardNum, back: !this.state.back });
  };

  nextCard = () => {
    this.setState({ cardNum: this.state.cardNum + 1, back: this.state.back })
  }

  prevCard = () => {
    this.setState({ cardNum: this.state.cardNum - 1, back: this.state.back })
  }

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>;
    }
    return (
      <div>
        <h2>{this.props.name}</h2>
        <hr />
        <div> {"Card " + (this.state.cardNum + 1) + "/" + this.props.cards.length}</div>
        <br />
        <div style={{border: '2px solid purple', textAlign: 'center', padding: '10px', marginRight: "200px"}}>
            <div onClick={this.changeSide}>
            {this.state.back
                ? this.props.cards[this.state.cardNum].back
                : this.props.cards[this.state.cardNum].front}
                <br />
                <br />
            </div>
            <button onClick={this.prevCard} disabled={this.state.cardNum === 0} style={{margin: '10px'}}> Previous </button>
            <button onClick={this.nextCard} disabled={this.state.cardNum === this.props.cards.length - 1} style={{margin: '10px'}}> Next </button>
        </div>
        <hr />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return { cards: cards, name: name };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps),
)(CardViewer);