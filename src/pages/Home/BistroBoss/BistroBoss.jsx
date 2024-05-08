import bistroBoss from '../../../assets/home/chef-service.jpg'


const BistroBoss = () => {
    return (
        <div className='relative mb-16 hidden md:block'>
            <img src={bistroBoss} alt="" />
            <div className=' bg-white absolute lg:top-20 md:top-10 left-40 w-2/3 md:p-5 text-center hidden md:block'>
                <h1 className='lg:text-4xl md:text-2xl mb-2 '>Bistro Boss</h1>
                <p className='my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
            </div>
        </div>
    );
};

export default BistroBoss;