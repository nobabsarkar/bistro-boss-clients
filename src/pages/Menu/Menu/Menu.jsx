import { Helmet } from "react-helmet-async";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import Cover from "../../Shared/Cover/Cover";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <section>
            <Helmet>
                <title>Bistro Boss || Our Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"}></Cover>

            {/* main cover */}
            <SectionTitle subHeading="Don't Miss" heading="today's offer"></SectionTitle>

            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}
            <MenuCategory items={dessert} title="dessert" img={dessertImg}></MenuCategory>

            {/* pizza menu items */}
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>

            {/* soup menu items */}
            <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>

            {/* salad menu items */}
            <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
        </section>
    );
};

export default Menu;