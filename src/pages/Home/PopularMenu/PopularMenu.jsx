import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')


    return (
        <div className="mb-12">
            <SectionTitle heading="From our Menu" subHeading="Popular Items"></SectionTitle>
            <div className="grid  md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="flex justify-center w-full mt-8">
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;