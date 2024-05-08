import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { name, category, recipe, price, _id } = useLoaderData()

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data?.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data?.data?.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            if (menuRes.data.modifiedCount > 0) {
                // show popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name}  is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh info"></SectionTitle>
            <div className="lg:w-3/4 lg:mx-auto shadow-2xl p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            defaultValue={name}
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Recipe Name"
                            className="input input-bordered w-full" />
                    </div>

                    <div className="lg:flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category")} className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price  */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                defaultValue={price}
                                {...register('price', { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea defaultValue={recipe} {...register('recipe', { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>

                    <button className="btn btn-outline btn-secondary mt-4">Update Menu Data</button>
                    {/* <input className="btn btn-outline btn-secondary mt-4" type="submit" value="Update Menu Data" /> */}
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;