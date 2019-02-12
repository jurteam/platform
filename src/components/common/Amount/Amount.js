import React, { Component } from "react"

export class Amount extends Component {

    render() {

        const { value } = this.props

        // handle symbol
        let { symbol } = this.props
        if (typeof symbol === 'undefined') symbol = "JUR"

        return <p className="jur--amount">{value} <span>{symbol}</span></p>
    }
}