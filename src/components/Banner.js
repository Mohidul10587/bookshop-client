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
        { id: 1, src: 'banner-img-1.png' },
        { id: 2, src: 'banner-img-1.png' },
        { id: 3, src: 'banner-img-1.png' },
    ];




    return (



        <Slider  className="  mx-1" {...settings}>
            {images.map((image) => (
                <div key={image.id}>
                    <div className="flex justify-between items-center">
                      
                        <div className="w-full relative">
                           
                                <img src={image.src} alt="" className="w-full h-[450px]" />
                                <button className="absolute bottom-12 left-16 font-bold  px-16 py-3 rounded-2xl bg-white text-violet-800">Shop Now</button>
                          
                        </div>
                    </div>
                </div>
            ))}
        </Slider>







    );
}

export default Banner;
