import React from 'react'
import  Autocomplete  from 'react-autocomplete'

import styles from './style/style'

class InputAutocompleteField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loc: props.val,
            userEnteredInfo: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const text = event.target.value;
        this.props.onChange(this.props.id, text)
        this.setState({
            loc: event.target.value,
            userEnteredInfo: true
        });
    }

    render() {

        let val = ''
        if (this.state.userEnteredInfo) {
            val = this.state.loc
        } else { val = this.props.val}

        return (
            <Autocomplete
                items={this.props.autocompleteValues}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                  <div
                    key={item.id}
                    style={{ paddingLeft: '5px', backgroundColor: highlighted ? styles.veryLightBlue : 'transparent'}}
                  >
                    {item.label}
                  </div>
                }
                menuStyle={styles.autocompleteStyle}
                value={val}
                onChange={this.handleChange}
                onSelect={value => {
                    this.props.onChange(this.props.id, value)
                    this.setState({
                        loc: value,
                        userEnteredInfo: true
                    })} }
                wrapperStyle={this.props.inStyle}
            />
            
        )
    }
}

export default InputAutocompleteField

