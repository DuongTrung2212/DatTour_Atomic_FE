import React, { useEffect, useMemo, useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classNames from "classnames/bind";
import styles from "./SlideImage.module.scss";

const cx = classNames.bind(styles);

var fadeImages = [
    {
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Chào mừng đến với Atomic",
    },
    {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: "Design by Simp Raiden Ei",
    },
    {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "I ammmm Atomicccccc",
    },
];
var arrCaption = [
    "Tư vấn chuyên nghiệp",
    "Trải nghiệm đa dang",
    "Thanh toán an toàn",
    "Hỗ trợ nhiệt tình",
];
function SlideImage(props) {
    const [index, setIndex] = useState(0);
    var slides = [];
    if (props.slides) {
        props.slides.forEach((slide) => {
            slides.push({
                url: `${process.env.REACT_APP_API_IMG_URL}${slide}`,
                caption:
                    arrCaption[Math.floor(Math.random() * arrCaption.length)],
            });
        });
    } else {
        slides = fadeImages;
    }

    return (
        <div className={cx("slide-container", props.className)}>
            <Fade
                easing={"linear"}
                pauseOnHover={false}
                duration={4000}
                transitionDuration={2000}
                autoplay={true}
            >
                {slides.map((fadeImage, index) => (
                    <div key={index}>
                        <img
                            className={cx("imgSlide", props.classNameImg)}
                            src={fadeImage.url}
                        />
                        <h2 className={cx("title")}>{fadeImage.caption}</h2>
                    </div>
                ))}
            </Fade>
        </div>
    );
}

export default SlideImage;
