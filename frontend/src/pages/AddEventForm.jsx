import { useState } from "react";
import ImageUploader from "../components/ImageUploader";

export default function AddEventForm() {
  const [loading, setLoading] = useState(false);
  const [uploadPromises, setUploadPromises] = useState([]);
  const [recurring, setRecurring] = useState(false);

  const cloudinary_preset = "sohaib-store";
  const cloudinary_name = "dhybff9ez";

  //@ts-ignore //!Fix type error
  async function uploadImages(event) {
    if (!cloudinary_preset) {
      throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
    }
    if (!cloudinary_name) {
      throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    }

    const uploadPreset = cloudinary_preset;
    const cloudName = cloudinary_name;
    const files = event.target.files;
    const _uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);

      _uploadPromises.push(
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          body: formData,
          method: "POST",
        })
      );
    }
    setUploadPromises(_uploadPromises);
  }

  async function addProduct(e) {
    e.preventDefault();
    setLoading(true);

    const { title, category, location, tags, description } =
      e.target.elements;

    // Upload images in parallel
    const responses = await Promise.all(uploadPromises);
    const dataPromises = responses.map((response) => response.json());
    const data = await Promise.all(dataPromises);
    const images = data.map((i) => i.secure_url);

    // Save to db
    const event = {
      title: title.value,
      tags: tags.value.split(" "),
      category: category.value,
      description: description.value,
      status: "active",
      location: location.value,
      recurring,
      images,
    };
+
    // const response = await eventAPI.postEvent(event);

    setLoading(false);
  }

  return (
    <form onSubmit={addProduct}>
      <h3 className="mb-4 md:mb-8 text-3xl font-bold tracking-wide pt-20">
        Add Product
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter event name..."
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          >
            <option defaultValue={""}>Select category</option>
            <option value="tech">Tech</option>
            <option value="gaming">Gaming</option>
            <option value="blockchain">Blockchakin</option>
            <option value="fashion">Fashion</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="politics">Politics</option>
            <option value="law">Law</option>
            <option value="pets">Pets</option>
            <option value="science">Science</option>
            <option value="feminism">Feminism</option>
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            name="location"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Event location..."
            required={true}
          />
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input id="recurring" type="checkbox" value={false} className="sr-only peer" onChange={() => setRecurring(() => !recurring)} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Recurring
          </span>
        </label>

        {/* <div className="w-full">
          <label
            htmlFor="recurring"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Recurring
          </label>
          <input
            type="checkbox"
            name="recurring"
            id="recurring"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div> */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={8}
            className="block mb-8 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Your description goes here..."
          ></textarea>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>
          <input
            name="tags"
            id="tags"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required={true}
          />
        </div>
      </div>
      <ImageUploader uploadImages={uploadImages} />
      <button
        disabled={loading}
        type="submit"
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-500 disabled:bg-gray-800 transition-all"
      >
        {loading ? "loading..." : "Submit"}
      </button>
    </form>
  );
}
