import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BlockTitle from '../BlockTitle';
import { AvatarInfo } from '../AvatarInfo/AvatarInfo';
import Form from '../Form';
import AlertIcon from '../Icons/AlertIcon';

import './WhoPays.scss';

export class WhoPays extends Component {
  state = {
    openIndex: 0,
    error: false,
    counterparties: [this.props.contract.from, this.props.contract.to],
    payer: null
  }

  handleContractValue = (counterPartyIndex, value) => {
    let payer = {...this.state.payer};
    payer = {
      counterParty: this.state.counterparties[counterPartyIndex],
      value: Number(value)
    }
    this.setState({payer});
    this.props.handleSelectPayer(payer)
  }

  componentDidMount() {
    this.handleContractValue(this.state.openIndex, 0);
  }

  changePayer = index => {
    this.setState({openIndex: index});
    this.handleContractValue(index, 0);
  }

  render() {
    return (
      <div className="jur-who-pays">
        <BlockTitle title="Who Pays ?"/>
        <div className="jur-who-pays__counterparties">
          {this.state.counterparties.map((counterparty, index) => (
            <div
              className={`jur-who-pays__counterparty ${this.state.openIndex === index ? 'jur-who-pays__counterparty--open':''}`}
              key={index.toString()}
            >
              <AvatarInfo
              size="small"
                userName={counterparty.name}
                userWallet={counterparty.wallet.address}
                shouldRenderName={counterparty.shouldRenderName}
                variant="ellipsis"
                type="circle"
                onClick={() => this.changePayer(index)}
              />
              {this.state.openIndex === index &&
                <>
                  <Form.NumericInput
                    label="Jur Token"
                    onChange={this.handleContractValue.bind(this, index)}
                    step="0.01"
                  />
                  {this.state.error &&
                    <span>You do not have enough Jur balance</span>
                  }
                </>
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}
