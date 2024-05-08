import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featued-item bg-fixed text-white pt-8 my-20 ">
            <SectionTitle subHeading="check it out" heading="Featured Item"></SectionTitle>
            {/* <img src={featured} alt="" /> */}
            <div className="md:flex items-center justify-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-50">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase my-2">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, tempore quae ex cumque qui atque quaerat totam voluptate ad nesciunt. Consequatur voluptatum soluta illum maiores ut, officia, voluptatem sint distinctio veniam voluptatibus voluptas aliquid nam ipsam expedita possimus repellat quasi eveniet aliquam, perspiciatis molestias commodi! Dolor totam ea reprehenderit! Qui.</p>
                    <button className="btn btn-outline mt-5 border-0 border-b-4 text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;