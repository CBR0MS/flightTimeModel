import React from "react";
import DocumentMeta from "react-document-meta";
import { Spring } from "react-spring/renderprops";
import { config } from "react-spring";

import style from "./Style/style";
import LandingInputForm from "./UIComponents/Forms/LandingInputForm";
import ContentWrapper from "./UIComponents/Wrappers/ContentWrapper";

import { randomNum } from "./Helpers/Assorted";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: false,
      second: false,
      firstInputValue: "here",
      secondInputValue: "there",
      autocompleteValues: [{ value: "", label: "" }]
    };
    this.updateInputDisplayValues = this.updateInputDisplayValues.bind(this);
  }

  updateInputDisplayValues(data, dataLength) {
    const index = randomNum(dataLength - 2);
    const val1 = data[index].split("");
    const val2 = data[index + 1].split("");

    let i = 0;
    let j = 0;
    let start1 = "";
    let start2 = "";
    const bar = "|";

    this.intervalOne = setInterval(() => {
      if (i < val1.length) {
        // update the array with the next char and move 'cursor'
        start1 = start1.slice(0, -1);
        start1 += val1[i];
        start1 += bar;
      } else {
        // when done, remove the 'cursor'
        start1 = start1.slice(0, -1);
        this.setState({
          firstInputValue: start1
        });
        clearInterval(this.intervalOne);
        // start interval 2
        this.intervalTwo = setInterval(() => {
          if (j < val2.length) {
            start2 = start2.slice(0, -1);
            start2 += val2[j];
            start2 += bar;
          } else {
            // when done, remove the 'cursor'
            start2 = start2.slice(0, -1);
            this.setState({
              secondInputValue: start2
            });
            clearInterval(this.intervalTwo);
          }
          this.setState({
            secondInputValue: start2
          });
          j += 1;
        }, 100);
      }
      this.setState({
        firstInputValue: start1
      });
      i += 1;
    }, 100);
  }

  componentDidMount() {
    fetch("./data/cities.json")
      .then(res => res.json())
      .then(data => {
        let newData = [];
        for (const loc in data.cities) {
          const displayName = data.cities[loc];
          const valueName = data.cities[loc];
          newData.push({ label: displayName, value: valueName, key: loc });
        }

        const allData = data.cities;
        const dataLength = allData.length;

        this.setState({
          autocompleteValues: newData
        });

        this.updateInputDisplayValues(allData, dataLength);

        this.interval = setInterval(() => {
          this.updateInputDisplayValues(allData, dataLength);
        }, 3000);
      });
  }

  componentWillUnmount() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
    if (this.intervalOne !== undefined) {
      clearInterval(this.intervalOne);
    }
    if (this.intervalTwo !== undefined) {
      clearInterval(this.intervalTwo);
    }
  }

  render() {
    const meta = {
      title: "Flight Stats Prediction - FlyGenius",
      description:
        "Determine the best airline for a flight. See how likely it is for your flight to depart and arrive on time.",
      canonical: "https://flygeni.us/"
    };

    return (
      <DocumentMeta {...meta}>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={config.default}
        >
          {props => (
            <div style={props}>
              <ContentWrapper>
                <div style={style.landingContainerStyle}>
                  <LandingInputForm
                    focusFirst={this.state.first}
                    focusSecond={this.state.second}
                    firstInputValue={this.state.firstInputValue}
                    firstAutocompleteValues={this.state.autocompleteValues}
                    secondInputValue={this.state.secondInputValue}
                    secondAutocompleteValues={this.state.autocompleteValues}
                  />
                </div>
              </ContentWrapper>
            </div>
          )}
        </Spring>
      </DocumentMeta>
    );
  }
}

export default Landing;
