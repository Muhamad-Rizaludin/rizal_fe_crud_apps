import React from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export const data = [
    {
        cover: "https://images6.alphacoders.com/679/thumb-1920-679459.jpg",
        title: "Interstaller",
    },
    {
        cover: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
        title: "Inception",
    },
    {
        cover: "https://images6.alphacoders.com/875/thumb-1920-875570.jpg",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://images6.alphacoders.com/114/thumb-1920-1141749.jpg",
        title: "Icon man 3",
    },
    {
        cover: "https://images3.alphacoders.com/948/thumb-1920-948864.jpg",
        title: "Venom",
    },
    {
        cover: "https://images2.alphacoders.com/631/thumb-1920-631095.jpg",
        title: "Steins Gate",
    },
    {
        cover: "https://images4.alphacoders.com/665/thumb-1920-665242.png",
        title: "One Punch Man",
    },
    {
        cover: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
        title: "A Silent Voice",
    },
    {
        cover: "https://images8.alphacoders.com/100/thumb-1920-1005531.jpg",
        title: "Demon Slayer",
    },
    {
        cover: "https://images2.alphacoders.com/582/thumb-1920-582804.png",
        title: "Attack On Titan",
    },
];


export default function ResponsiveCarousel(props) {
    const ref = React.useRef();
    return (
        <div style={{ width: "100%", position: "relative" }}>
            <ResponsiveContainer
                carouselRef={ref}
                render={(parentWidth, carouselRef) => {
                    let currentVisibleSlide = 3;
                    if (parentWidth <= 1440) currentVisibleSlide = 3;
                    if (parentWidth <= 1080) currentVisibleSlide = 1;
                    return (
                        <StackedCarousel
                            ref={carouselRef}
                            slideComponent={Card}
                            slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
                            carouselWidth={parentWidth}
                            data={data}
                            currentVisibleSlide={currentVisibleSlide}
                            maxVisibleSlide={5}
                            useGrabCursor
                        />
                    );
                }}
            />
            <>
                <Fab
                    style={{ position: "absolute", top: "40%", left: 10, zIndex: 10 }}
                    size="small"
                    color="primary"
                    onClick={() => {
                        ref.current?.goBack();
                    }}
                >
                    <ArrowBackIcon />
                </Fab>
                <Fab
                    style={{ position: "absolute", top: "40%", right: 10, zIndex: 10 }}
                    size="small"
                    color="primary"
                    onClick={() => {
                        ref.current?.goNext(6);
                    }}
                >
                    <ArrowForwardIcon />
                </Fab>
            </>
        </div>
    );
}

export const Card = React.memo(function (props) {
    const { data, dataIndex } = props;
    const { cover } = data[dataIndex];
    return (
        <div
            style={{
                width: "100%",
                height: 300,
                userSelect: "none",
            }}
            className="my-slide-component"
        >
            <img
                style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 0,
                }}
                draggable={false}
                src={cover}
            />
        </div>
    );
});