import React, { useState } from "react";
import "./App.css";

function App() {
    const handleSliderOnInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValue(parseInt(event.target.value));
    };

    const sliderConfiguration = {
        sliderUI: {
            sliderHeight: 12, //px
            progressBarGradient:
                "linear-gradient(to right, LightCyan, var(--thumb-primary-color))",
        },
        sliderValue: {
            max: 1000,
            min: 1,
            default: 20,
        },
        indicatorUI: {
            prefix: "",
            suffix: "",
        },
    };

    const [value, setValue] = useState(sliderConfiguration.sliderValue.default);

    return (
        <div className="App">
            <div className="sliderContainer">
                <div
                    className="currentValueIndicator"
                    style={{
                        width: `${
                            (value / sliderConfiguration.sliderValue.max) * 100
                        }%`,
                        // align the indicator to match with the start and end positions of the slider
                        // eg: current value is 1% of max value then move the indicator to the left by
                        // sliderHeight (12px) - current value positions % of sliderHeight
                        // which means at 100% of the value, the indicator will move to the left by 0px
                        // and at 1% of the value, the indicator will move to left by 12px
                        transform: `translateX(${
                            sliderConfiguration.sliderUI.sliderHeight -
                            sliderConfiguration.sliderUI.sliderHeight *
                                ((value - sliderConfiguration.sliderValue.min) /
                                    (sliderConfiguration.sliderValue.max -
                                        sliderConfiguration.sliderValue.min))
                        }px)`,
                    }}
                >
                    <div>{`${sliderConfiguration.indicatorUI.prefix}${value}${sliderConfiguration.indicatorUI.suffix}`}</div>
                </div>
                <div className="sliderInnerContainer">
                    <input
                        type="range"
                        min={sliderConfiguration.sliderValue.min}
                        max={sliderConfiguration.sliderValue.max}
                        defaultValue={sliderConfiguration.sliderValue.default}
                        className="slider"
                        onInput={handleSliderOnInput}
                        style={{
                            height: `${sliderConfiguration.sliderUI.sliderHeight}px`,
                        }}
                    />
                    <div
                        className="sliderProgressContainer"
                        // sliderProgress height must match the width of the slider
                        style={{
                            height: `${sliderConfiguration.sliderUI.sliderHeight}px`,
                        }}
                    >
                        <div
                            className="sliderProgress"
                            style={{
                                // explained in the value indicator section
                                width: `calc(${
                                    (value /
                                        sliderConfiguration.sliderValue.max) *
                                    100
                                }% + ${
                                    sliderConfiguration.sliderUI.sliderHeight -
                                    sliderConfiguration.sliderUI.sliderHeight *
                                        ((value -
                                            sliderConfiguration.sliderValue
                                                .min) /
                                            (sliderConfiguration.sliderValue
                                                .max -
                                                sliderConfiguration.sliderValue
                                                    .min))
                                }px)`,
                                backgroundImage:
                                    sliderConfiguration.sliderUI
                                        .progressBarGradient,
                            }}
                        ></div>
                    </div>
                    <div
                        className="sliderBackground"
                        // sliderBackground height must match the width of the slider
                        style={{
                            height: `${sliderConfiguration.sliderUI.sliderHeight}px`,
                        }}
                    ></div>
                </div>
                <div className="minMaxIndicator">
                    <div
                        className="minIndicator"
                        style={{
                            transform:
                                sliderConfiguration.indicatorUI.prefix.length <
                                1
                                    ? `translateX(${
                                          sliderConfiguration.sliderUI
                                              .sliderHeight / 2
                                      }px)`
                                    : "unset",
                        }}
                    >
                        {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.min}${sliderConfiguration.indicatorUI.suffix}`}
                    </div>
                    <div className="maxIndicator">
                        {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.max}${sliderConfiguration.indicatorUI.suffix}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
