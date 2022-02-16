import React, { useState } from "react";
import "./App.css";
import appStylesModule from "./App.module.style";

function App() {
    const appStyles = appStylesModule();

    const handleSliderOnInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCurrentValue(parseInt(event.target.value));
    };

    const handleSliderOnHover = () => {
        setSliderOnHover("true");
    };

    const handleSliderOnMouseLeave = () => {
        setSliderOnHover("false");
    };

    const sliderConfiguration = {
        sliderContainerUI: {
            width: 300, //px
        },
        sliderUI: {
            height: 12, //px
            progressBarGradient:
                "linear-gradient(to right, LightCyan, var(--thumb-primary-color))",
        },
        sliderValue: {
            max: 1000,
            min: 1,
            default: 20,
        },
        indicatorUI: {
            prefix: "$",
            suffix: "",
        },
    };

    const [currentValue, setCurrentValue] = useState(
        sliderConfiguration.sliderValue.default
    );

    const [sliderOnHover, setSliderOnHover] = useState("false");

    return (
        <div className="App">
            <div
                className={appStyles.sliderContainer}
                slider-on-hover={sliderOnHover}
                style={{ width: sliderConfiguration.sliderContainerUI.width }}
            >
                <div
                    className={appStyles.currentValueIndicator}
                    style={{
                        width: `${
                            (currentValue /
                                sliderConfiguration.sliderValue.max) *
                            100
                        }%`,
                        // align the indicator to match with the start and end positions of the slider
                        // eg: current value is 1% of max value then move the indicator to the left by
                        // sliderHeight (12px) - current value positions % of sliderHeight
                        // which means at 100% of the value, the indicator will move to the left by 0px
                        // and at 1% of the value, the indicator will move to left by 12px
                        transform: `translateX(${
                            sliderConfiguration.sliderUI.height -
                            sliderConfiguration.sliderUI.height *
                                ((currentValue -
                                    sliderConfiguration.sliderValue.min) /
                                    (sliderConfiguration.sliderValue.max -
                                        sliderConfiguration.sliderValue.min))
                        }px)`,
                    }}
                >
                    <div
                        className={appStyles.currentValueIndicatorTextContainer}
                    >{`${sliderConfiguration.indicatorUI.prefix}${currentValue}${sliderConfiguration.indicatorUI.suffix}`}</div>
                </div>
                <div
                    className={appStyles.sliderInnerContainer}
                    onMouseOver={handleSliderOnHover}
                    onMouseLeave={handleSliderOnMouseLeave}
                >
                    <input
                        type="range"
                        min={sliderConfiguration.sliderValue.min}
                        max={sliderConfiguration.sliderValue.max}
                        defaultValue={sliderConfiguration.sliderValue.default}
                        className={appStyles.slider}
                        onInput={handleSliderOnInput}
                        style={{
                            height: `${sliderConfiguration.sliderUI.height}px`,
                        }}
                    />
                    <div
                        className={appStyles.sliderProgressContainer}
                        // sliderProgress height must match the width of the slider
                        style={{
                            height: `${sliderConfiguration.sliderUI.height}px`,
                        }}
                    >
                        <div
                            className={appStyles.sliderProgress}
                            style={{
                                // explained in the value indicator section
                                width: `calc(${
                                    (currentValue /
                                        sliderConfiguration.sliderValue.max) *
                                    100
                                }% + ${
                                    sliderConfiguration.sliderUI.height -
                                    sliderConfiguration.sliderUI.height *
                                        ((currentValue -
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
                        className={appStyles.sliderBackground}
                        // sliderBackground height must match the width of the slider
                        style={{
                            height: `${sliderConfiguration.sliderUI.height}px`,
                        }}
                    ></div>
                </div>
                <div className={appStyles.minMaxIndicator}>
                    <div className={appStyles.minIndicator}>
                        {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.min}${sliderConfiguration.indicatorUI.suffix}`}
                    </div>
                    <div className={appStyles.maxIndicator}>
                        {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.max}${sliderConfiguration.indicatorUI.suffix}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
