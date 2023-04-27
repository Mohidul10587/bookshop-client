import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
    };

    const images = [
        { id: 1, src: 'img-2.jpg' },
        { id: 2, src: 'img3.jpg' },
        { id: 3, src: 'img4.jpg' },
    ];




    return (



        <Slider  className=" mt-3 mx-1" {...settings}>
            {images.map((image) => (
                <div key={image.id}>
                    <div className="flex justify-between items-center">
                      
                        <div className="w-full relative">
                           
                                <img src={image.src} alt="" className="w-full h-[450px]" />
                                <button className="absolute bottom-8 left-8 font-bold  px-11 py-2 rounded-2xl bg-pink-700 text-white">Shop Now</button>
                          
                        </div>
                    </div>
                </div>
            ))}
        </Slider>







    );
}

export default Banner;
