import React, {Component, PropTypes} from 'react';

export default class FixColumn extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            // TODO
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div>
                <FixColumn>
                    <LeftWarp>
                        <Header>

                        </Header>
                        <Body>

                        </Body>
                        <Footer>

                        </Footer>
                    </LeftWarp>
                    <RightWarp>
                        <Header>

                        </Header>
                        <Body>

                        </Body>
                        <Footer>

                        </Footer>
                    </RightWarp>
                </FixColumn>
            </div>
        );
    }
}