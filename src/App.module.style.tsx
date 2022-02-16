import { createUseStyles } from "react-jss";

const appStylesModule = createUseStyles({
    sliderContainer: {
        minHeight: "100px",
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr",
        placeItems: "center normal",
    },
    sliderInnerContainer: {
        width: "100%",
        display: "grid",
        placeItems: "center",
        gridColumnStart: 1,
        gridRowStart: 2,
    },
    sliderBackgroundAndProgressContainer: {
        width: "100%",
        gridColumnStart: 1,
        gridRowStart: 1,
        borderRadius: "var(--border-radius)",
    },
    sliderProgressContainer: {
        composes: ["$sliderBackgroundAndProgressContainer"],
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 0,
    },
    sliderProgress: {
        height: "100%",
        borderRadius: "var(--border-radius)",
    },
    sliderBackground: {
        composes: ["$sliderBackgroundAndProgressContainer"],
        backgroundColor: "var(--background-primary)",
        zIndex: -1,
    },
    slider: {
        WebkitAppearance: "none",
        appearance: "none",
        gridColumnStart: 1,
        gridRowStart: 1,
        width: "100%",
        background: "transparent",
        outline: "none",
        borderRadius: "var(--border-radius)",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2) inset",
        zIndex: 1,
        "&::-webkit-slider-thumb": {
            WebkitAppearance: "none",
            appearance: "none",
            width: "var(--thumb-size)",
            height: "var(--thumb-size)",
            transform: "scale(var(--thumb-scale))",
            background: "var(----thumb-primary-color)",
            cursor: "grab",
            borderRadius: "var(--border-radius)",
            boxShadow: "var(--thumb-box-shadow)",
            border: "0px",
        },
        "&::-moz-range-thumb": {
            width: "var(--thumb-size)",
            height: "var(--thumb-size)",
            transform: "scale(var(--thumb-scale))",
            background: "var(----thumb-primary-color)",
            cursor: "grab",
            borderRadius: "var(--border-radius)",
            boxShadow: "var(--thumb-box-shadow)",
            border: "0px",
        },
    },
    minMaxIndicator: {
        display: "grid",
        gridColumnStart: 1,
        gridRowStart: 3,
        gridTemplateColumns: "1fr 1fr",
    },
    minMaxInnerIndicator: {
        display: "flex",
        alignItems: "center",
        color: "var(--text-primary)",
        fontWeight: 500,
    },
    minIndicator: {
        composes: ["$minMaxInnerIndicator"],
        gridColumnStart: 1,
        justifyContent: "flex-start",
    },
    maxIndicator: {
        composes: ["$minMaxInnerIndicator"],
        gridColumnStart: 2,
        justifyContent: "flex-end",
    },
    currentValueIndicator: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gridColumnStart: 1,
        gridRowStart: 1,
        fontWeight: 600,
    },
    currentValueIndicatorTextContainer: {
        padding: "5px",
        borderRadius: "var(--border-radius)",
        backgroundColor: "var(--indicator-text-container-background)",
        color: "var(--indicator-text-container-text-color)",
        transform:
            "translateY(var(--indicator-text-container-translate-Y)) scale(var(--indicator-text-container-scale))",
    },
    "@media (prefers-reduced-motion: no-preference)": {
        slider: {
            "&::-webkit-slider-thumb": {
                transition: "transform 0.2s ease",
            },
            "&::-moz-range-thumb": {
                transition: "transform 0.2s ease",
            },
        },

        currentValueIndicatorTextContainer: {
            transition: "transform 0.2s ease",
        },
    },
});

export default appStylesModule;
