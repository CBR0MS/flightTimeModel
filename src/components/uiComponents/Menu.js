import React from 'react'
import { Spring, Transition } from 'react-spring/renderprops'

import style from './style/style'

class Menu extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {

        const curState = this.state.open

        this.setState({
            open: !curState
        });
    }

    render() {

            return (
                <div>
                    <div onClick={this.handleChange}>
                        <HamburgerIcon open={!this.state.open}/>
                    </div>
                    <div>
                        <Transition
                            items={this.state.open}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}>
                            {show =>
                              show && (props => {
                                let styleNew = Object.assign({}, style.menuBackground)
                                styleNew.opacity = props.opacity
                                return (
                                <div style={ styleNew } onClick={this.handleChange}>
                                    <div style={style.menuContents}>
                                        {this.props.children}
                                    </div>
                                </div>
                                )
                            }
                            )
                          }
                        </Transition>

                    </div>
                </div>
            )
    }
}

export default Menu

// the menus icon 
const HamburgerIcon = props => {

    if (props.open) {
        return (
            <div style={style.hamburgerStyle}>
                <Spring from={{ width: '30px' }} to={{ width: '40px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
                <Spring from={{ width: '40px' }} to={{ width: '30px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
                <Spring from={{ width: '40px' }} to={{ width: '30px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
            </div>
        )
    } else {
        return (
        <div style={style.hamburgerStyle}>
                <Spring from={{ width: '40px' }} to={{ width: '30px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
                <Spring from={{ width: '30px' }} to={{ width: '40px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
                <Spring from={{ width: '30px' }} to={{ width: '40px'}}>
                    {props => <div className='icon-bar' style={props}></div>}
                </Spring>
            </div>
        )

    }
}







