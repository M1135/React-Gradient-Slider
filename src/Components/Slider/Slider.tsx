import React, { useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import "./Slider.css";

const Slider = () => {
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

    const handleSliderOnInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCurrentValue(parseInt(event.target.value));
    };

    const slider = useRef<HTMLInputElement>(null);

    const [currentValue, setCurrentValue] = useState(
        sliderConfiguration.sliderValue.default
    );

    const [sliderOnHover, setSliderOnHover] = useState("false");

    useEffect(() => {
        const handleSliderOnMouseOver = () => {
            setSliderOnHover("true");
        };

        const handleSliderOnMouseLeave = () => {
            setSliderOnHover("false");
        };

        if (slider && slider.current) {
            if (isDesktop) {
                slider.current.addEventListener(
                    "mouseenter",
                    handleSliderOnMouseOver
                );
                slider.current.addEventListener(
                    "mouseleave",
                    handleSliderOnMouseLeave
                );
            } else {
                slider.current.addEventListener(
                    "touchstart",
                    handleSliderOnMouseOver
                );
                slider.current.addEventListener(
                    "touchend",
                    handleSliderOnMouseLeave
                );
            }

            return () => {
                if (slider && slider.current) {
                    if (isDesktop) {
                        slider.current?.removeEventListener(
                            "mouseenter",
                            handleSliderOnMouseOver
                        );
                        slider.current?.removeEventListener(
                            "mouseleave",
                            handleSliderOnMouseLeave
                        );
                    } else {
                        slider.current?.removeEventListener(
                            "touchend",
                            handleSliderOnMouseOver
                        );
                        slider.current?.removeEventListener(
                            "touchend",
                            handleSliderOnMouseLeave
                        );
                    }
                }
            };
        }
    }, []);

    return (
        <div
            className={"sliderContainer"}
            slider-on-hover={sliderOnHover}
            style={{ width: sliderConfiguration.sliderContainerUI.width }}
        >
            <div
                className={"currentValueIndicator"}
                style={{
                    width: `${
                        (currentValue / sliderConfiguration.sliderValue.max) *
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
                    className={"currentValueIndicatorTextContainer"}
                >{`${sliderConfiguration.indicatorUI.prefix}${currentValue}${sliderConfiguration.indicatorUI.suffix}`}</div>
            </div>
            <div className={"sliderInnerContainer"}>
                <input
                    type="range"
                    min={sliderConfiguration.sliderValue.min}
                    max={sliderConfiguration.sliderValue.max}
                    defaultValue={sliderConfiguration.sliderValue.default}
                    className={"slider"}
                    ref={slider}
                    onInput={handleSliderOnInput}
                    style={{
                        height: `${sliderConfiguration.sliderUI.height}px`,
                    }}
                />
                <div
                    className={"sliderProgressContainer"}
                    // sliderProgress height must match the width of the slider
                    style={{
                        height: `${sliderConfiguration.sliderUI.height}px`,
                    }}
                >
                    <div
                        className={"sliderProgress"}
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
                                        sliderConfiguration.sliderValue.min) /
                                        (sliderConfiguration.sliderValue.max -
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
                    className={"sliderBackground"}
                    // sliderBackground height must match the width of the slider
                    style={{
                        height: `${sliderConfiguration.sliderUI.height}px`,
                    }}
                ></div>
            </div>
            <div className={"minMaxIndicator"}>
                <div className={"minIndicator"}>
                    {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.min}${sliderConfiguration.indicatorUI.suffix}`}
                </div>
                <div className={"maxIndicator"}>
                    {`${sliderConfiguration.indicatorUI.prefix}${sliderConfiguration.sliderValue.max}${sliderConfiguration.indicatorUI.suffix}`}
                </div>
            </div>
        </div>
    );
};

export default Slider;
